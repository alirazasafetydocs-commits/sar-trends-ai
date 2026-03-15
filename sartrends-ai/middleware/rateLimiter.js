/**
 * Rate Limiter Middleware
 * Implements API rate limiting to prevent abuse
 */

const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'sartrends-secret-key-2024';

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Auth endpoints rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// AI generation rate limiter
const aiGenerationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each user to 10 AI requests per minute
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise use IP
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return `user:${decoded.userId}`;
      } catch (e) {
        return `ip:${req.ip}`;
      }
    }
    return `ip:${req.ip}`;
  },
  message: {
    error: 'Too many AI requests, please slow down.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// File upload rate limiter
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each user to 5 uploads per minute
  message: {
    error: 'Too many file uploads, please try again later.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Payment submission rate limiter
const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each user to 3 payment submissions per hour
  keyGenerator: (req) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return `user:${decoded.userId}`;
      } catch (e) {
        return `ip:${req.ip}`;
      }
    }
    return `ip:${req.ip}`;
  },
  message: {
    error: 'Too many payment submissions, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Daily AI request limiter (more permissive for higher plans)
const dailyAILimiter = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      // No token - allow limited requests for non-authenticated users
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Business plan users have unlimited requests
    if (user.plan === 'business') {
      return next();
    }

    // Get today's usage
    const ToolUsage = require('../models/ToolUsage');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayUsage = await ToolUsage.aggregate([
      {
        $match: {
          user: user._id,
          date: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: '$usageCount' }
        }
      }
    ]);

    const usageCount = todayUsage[0]?.totalCount || 0;
    const planLimits = {
      free: 3,
      pro: 100,
      business: -1
    };

    const limit = planLimits[user.plan] || 3;

    // Check if limit exceeded
    if (limit > 0 && usageCount >= limit) {
      return res.status(403).json({
        error: 'Daily AI request limit exceeded',
        plan: user.plan,
        limit: limit,
        used: usageCount,
        resetAt: tomorrow
      });
    }

    // Add usage info to request
    req.dailyUsage = {
      used: usageCount,
      limit: limit,
      remaining: limit - usageCount
    };

    next();
  } catch (error) {
    // If there's an error, allow the request but log it
    console.error('Daily limiter error:', error);
    next();
  }
};

module.exports = {
  generalLimiter,
  authLimiter,
  aiGenerationLimiter,
  uploadLimiter,
  paymentLimiter,
  dailyAILimiter
};

