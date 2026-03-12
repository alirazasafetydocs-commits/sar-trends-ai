const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');

// Middleware to verify admin
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sartrends-secret-key-2024');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all blogs (public - only published)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'Published' }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all blogs for admin (including drafts)
router.get('/admin', verifyAdmin, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Increment views
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create blog (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, excerpt, content, category, author, image, status, readTime } = req.body;
    
    const blog = new Blog({
      title,
      excerpt,
      content,
      category,
      author: author || 'SAR Trends Team',
      image,
      status: status || 'Draft',
      readTime: readTime || '5 min read'
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update blog (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, excerpt, content, category, author, image, status, readTime } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (category) blog.category = category;
    if (author) blog.author = author;
    if (image !== undefined) blog.image = image;
    if (status) blog.status = status;
    if (readTime) blog.readTime = readTime;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete blog (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get blog stats (admin only)
router.get('/stats/overview', verifyAdmin, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'Published' });
    const draftBlogs = await Blog.countDocuments({ status: 'Draft' });
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    res.json({
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalViews: totalViews[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

