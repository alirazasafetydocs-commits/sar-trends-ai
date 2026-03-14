const mongoose = require('mongoose');

const toolUsageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  toolName: {
    type: String,
    required: true,
    enum: [
      'resume',
      'cv',
      'cover-letter',
      'follow-up-letter',
      'risk-assessment',
      'RAMS',
      'method-statement',
      'JSA',
      'incident-report',
      'fire-risk-assessment',
      'toolbox-talk',
      'website',
      'website-code',
      'job-description',
      'business-proposal',
      'SOP',
      'linkedin-optimize'
    ]
  },
  usageCount: {
    type: Number,
    default: 1,
    min: 1
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  provider: {
    type: String,
    enum: ['openai', 'groq', 'together', 'template'],
    default: 'template'
  },
  tokensUsed: {
    type: Number,
    default: 0
  },
  cost: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
toolUsageSchema.index({ user: 1, date: -1 });
toolUsageSchema.index({ user: 1, toolName: 1, date: -1 });

// Static method to get today's usage for a user
toolUsageSchema.statics.getTodayUsage = async function(userId, toolName = null) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const match = {
    user: userId,
    date: { $gte: today, $lt: tomorrow }
  };

  if (toolName) {
    match.toolName = toolName;
  }

  const result = await this.aggregate([
    { $match: match },
    { $group: { _id: null, totalCount: { $sum: '$usageCount' }, totalTokens: { $sum: '$tokensUsed' }, totalCost: { $sum: '$cost' } } }
  ]);

  return result[0] || { totalCount: 0, totalTokens: 0, totalCost: 0 };
};

// Static method to get usage for date range
toolUsageSchema.statics.getUsageRange = async function(userId, startDate, endDate, toolName = null) {
  const match = {
    user: userId,
    date: { $gte: startDate, $lte: endDate }
  };

  if (toolName) {
    match.toolName = toolName;
  }

  const result = await this.aggregate([
    { $match: match },
    { $group: { 
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
      totalCount: { $sum: '$usageCount' },
      totalTokens: { $sum: '$tokensUsed' },
      totalCost: { $sum: '$cost' }
    }},
    { $sort: { _id: 1 } }
  ]);

  return result;
};

// Static method to get tool-wise usage
toolUsageSchema.statics.getToolUsage = async function(userId, startDate, endDate) {
  const result = await this.aggregate([
    { $match: { user: userId, date: { $gte: startDate, $lte: endDate } } },
    { $group: { 
      _id: '$toolName',
      totalCount: { $sum: '$usageCount' },
      totalTokens: { $sum: '$tokensUsed' },
      totalCost: { $sum: '$cost' }
    }},
    { $sort: { totalCount: -1 } }
  ]);

  return result;
};

module.exports = mongoose.model('ToolUsage', toolUsageSchema);

