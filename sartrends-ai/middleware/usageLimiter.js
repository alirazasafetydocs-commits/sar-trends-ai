/**
 * Usage Limiter Middleware
 * Implements subscription-based AI usage control
 * 
 * Plan Limits:
 * - Free: 3 generations per day
 * - Pro: 100 generations per day
 * - Business: Unlimited
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ToolUsage = require('../models/ToolUsage');

const JWT_SECRET = process.env.JWT_SECRET || 'sartrends-secret-key-2024';

// Plan limits configuration
const PLAN_LIMITS = {
  free: {
    dailyLimit: 3,
    unlimited: false
  },
  pro: {
    dailyLimit: 100,
    unlimited: false
  },
  business: {
    dailyLimit: -1, // -1 means unlimited
    unlimited: true
  }
};

// Get today's date range
function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

// Get user's plan limit
function getPlanLimit(plan) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
}

// Check if user has exceeded their daily limit
async function checkDailyUsage(userId, toolName = null) {
  const { start, end } = getTodayRange();
  
  // Build query
  const query = {
    user: userId,
    date: { $gte: start, $lte: end }
  };
  
  // If specific tool, add to query
  if (toolName) {
    query.toolName = toolName;
  }
  
  // Get usage count
  const usage = await ToolUsage.aggregate([
    { $match: query },
    { $group: { _id: null, totalCount: { $sum: '$usageCount' } } }
  ]);
  
  return usage[0]?.totalCount || 0;
}

// Record usage
async function recordUsage(userId, toolName) {
  const { start, end } = getTodayRange();
  
  // Try to find existing usage record for today
  let usageRecord = await ToolUsage.findOne({
    user: userId,
    toolName,
    date: { $gte: start, $lte: end }
  });
  
  if (usageRecord) {
    // Increment existing record
    usageRecord.usageCount += 1;
    await usageRecord.save();
  } else {
    // Create new record
    usageRecord = new ToolUsage({
      user: userId,
      toolName,
      usageCount: 1,
      date: start
    });
    await usageRecord.save();
  }
  
  return usageRecord;
}

// Get usage statistics for a user
async function getUsageStats(userId) {
  const { start, end } = getTodayRange();
  
  // Today's usage
  const todayUsage = await ToolUsage.aggregate([
    { $match: { user: userId, date: { $gte: start, $lte: end } } },
    { $group: { _id: null, totalCount: { $sum: '$usageCount' } } }
  ]);
  
  // This week's usage
  const weekStart = new Date(start);
  weekStart.setDate(weekStart.getDate() - 7);
  const weekUsage = await ToolUsage.aggregate([
    { $match: { user: userId, date: { $gte: weekStart, $lte: end } } },
    { $group: { _id: null, totalCount: { $sum: '$usageCount' } } }
  ]);
  
  // Total usage
  const totalUsage = await ToolUsage.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, totalCount: { $sum: '$usageCount' } } }
  ]);
  
  return {
    today: todayUsage[0]?.totalCount || 0,
    thisWeek: weekUsage[0]?.totalCount || 0,
    total: totalUsage[0]?.totalCount || 0
  };
}

// Auth middleware - verifies JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Usage limiter middleware - must be used after authenticate
const limitUsage = (toolName) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const planLimit = getPlanLimit(user.plan);
      
      // Check if business plan (unlimited)
      if (planLimit.unlimited) {
        return next();
      }
      
      // Get current usage
      const currentUsage = await checkDailyUsage(user._id, toolName);
      const remaining = planLimit.dailyLimit - currentUsage;
      
      // Check if limit exceeded
      if (currentUsage >= planLimit.dailyLimit) {
        return res.status(403).json({
          message: 'Daily usage limit exceeded',
          upgradeRequired: true,
          plan: user.plan,
          limit: planLimit.dailyLimit,
          used: currentUsage,
          remaining: 0,
          resetAt: getNextResetTime()
        });
      }
      
      // Add usage info to request for later recording
      req.usageInfo = {
        toolName,
        currentUsage,
        remaining: remaining - 1,
        limit: planLimit.dailyLimit
      };
      
      next();
    } catch (error) {
      console.error('Usage limiter error:', error);
      // Allow request to proceed if there's an error checking usage
      next();
    }
  };
};

// Record usage after successful generation
const recordUserUsage = async (userId, toolName) => {
  try {
    await recordUsage(userId, toolName);
    
    // Also update user's total generations
    await User.findByIdAndUpdate(userId, {
      $inc: { totalGenerations: 1 }
    });
  } catch (error) {
    console.error('Error recording usage:', error);
  }
};

// Get next reset time (midnight)
function getNextResetTime() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

// Get usage status without limiting
const getUsageStatus = async (userId) => {
  const user = await User.findById(userId);
  const planLimit = getPlanLimit(user.plan);
  const currentUsage = await checkDailyUsage(userId);
  
  return {
    plan: user.plan,
    limit: planLimit.dailyLimit,
    used: currentUsage,
    remaining: planLimit.unlimited ? -1 : Math.max(0, planLimit.dailyLimit - currentUsage),
    unlimited: planLimit.unlimited,
    resetAt: getNextResetTime()
  };
};

module.exports = {
  authenticate,
  limitUsage,
  recordUserUsage,
  getUsageStats,
  getUsageStatus,
  checkDailyUsage,
  recordUsage,
  getPlanLimit,
  PLAN_LIMITS
};

