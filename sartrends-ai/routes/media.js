const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const router = express.Router();

// Media Model
const Media = require('../models/Media');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../uploads');
const imagesDir = path.join(uploadDir, 'images');
const videosDir = path.join(uploadDir, 'videos');

[uploadDir, imagesDir, videosDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVideo = file.mimetype.startsWith('video/');
    cb(null, isVideo ? videosDir : imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  
  if (allowedImageTypes.includes(file.mimetype)) {
    file.isImage = true;
    cb(null, true);
  } else if (allowedVideoTypes.includes(file.mimetype)) {
    file.isImage = false;
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 10 // Max 10 files at once
  }
});

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'sartrends-secret-key-2024';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const User = require('../models/User');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET all media
router.get('/', auth, async (req, res) => {
  try {
    const { type, category, sort = '-createdAt', page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    
    const media = await Media.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Media.countDocuments(query);
    
    res.json({
      media,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single media
router.get('/:id', auth, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST upload images
router.post('/upload-image', auth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const { category = 'other', title = '', alt = '' } = req.body;
    const uploadedMedia = [];

    for (const file of req.files) {
      const media = new Media({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        url: `/uploads/images/${file.filename}`,
        type: 'image',
        category,
        title,
        alt,
        uploadedBy: req.user._id
      });

      await media.save();
      uploadedMedia.push(media);
    }

    res.status(201).json({
      message: `${uploadedMedia.length} image(s) uploaded successfully`,
      media: uploadedMedia
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST upload videos
router.post('/upload-video', auth, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video uploaded' });
    }

    const { category = 'other', title = '' } = req.body;

    const media = new Media({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/uploads/videos/${req.file.filename}`,
      type: 'video',
      category,
      title,
      uploadedBy: req.user._id
    });

    await media.save();

    res.status(201).json({
      message: 'Video uploaded successfully',
      media
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update media
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, alt, category, isActive } = req.body;
    
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    if (title !== undefined) media.title = title;
    if (alt !== undefined) media.alt = alt;
    if (category) media.category = category;
    if (isActive !== undefined) media.isActive = isActive;

    await media.save();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE media
router.delete('/:id', auth, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', media.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Media.findByIdAndDelete(req.params.id);

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE multiple media
router.delete('/', auth, async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Please provide array of IDs' });
    }

    const mediaFiles = await Media.find({ _id: { $in: ids } });
    
    // Delete files from filesystem
    for (const media of mediaFiles) {
      const filePath = path.join(__dirname, '..', media.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await Media.deleteMany({ _id: { $in: ids } });

    res.json({ message: `${mediaFiles.length} media deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 50MB.' });
    }
    return res.status(400).json({ message: error.message });
  }
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
});

module.exports = router;

