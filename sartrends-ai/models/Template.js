const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['resume', 'cover-letter', 'website'],
    required: true
  },
  tier: {
    type: String,
    enum: ['free', 'gold', 'premium', 'platinum'],
    default: 'free'
  },
  html: {
    type: String,
    required: true
  },
  css: String,
  js: String,
  previewImage: String,
  thumbnail: String,
  category: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Template', templateSchema);

