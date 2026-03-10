const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['resume', 'cover-letter', 'risk-assessment', ' rams', 'method-statement', 'toolbox-talk', 'incident-report', 'hse-audit', 'website'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  inputData: {
    type: mongoose.Schema.Types.Mixed
  },
  status: {
    type: String,
    enum: ['completed', 'processing', 'failed'],
    default: 'completed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', documentSchema);

