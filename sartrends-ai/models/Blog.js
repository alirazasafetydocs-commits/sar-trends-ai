const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Resume Tips', 'HSE', 'AI Technology', 'Career Tips']
  },
  author: {
    type: String,
    default: 'SAR Trends Team'
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: String,
    default: '5 min read'
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);

