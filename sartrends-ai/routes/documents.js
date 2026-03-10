const express = require('express');
const Document = require('../models/Document');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'sartrends-secret-key-2024';

// Middleware to verify token
const auth = async (req, res, next) => {
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

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all user documents
router.get('/', auth, async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;
    
    const query = { user: req.user._id };
    if (type) {
      query.type = type;
    }

    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Document.countDocuments(query);

    res.json({
      documents,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single document
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete document
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get document stats
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const totalDocuments = await Document.countDocuments({ user: req.user._id });
    
    const byType = await Document.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    const recentDocuments = await Document.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalDocuments,
      byType,
      recentDocuments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

