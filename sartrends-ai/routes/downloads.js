const express = require('express');
const Document = require('../models/Document');
const User = require('../models/User');
const auth = require('./auth'); // Reuse auth from routes/auth or inline
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();

// Download specific file for document
router.get('/documents/:id/download/:format', auth, async (req, res) => {
  try {
    const { id, format } = req.params;
    const document = await Document.findOne({ _id: id, user: req.user._id });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const file = document.files.find(f => f.format === format.toLowerCase());

    if (!file) {
      return res.status(404).json({ message: 'File format not available' });
    }

    // Check free user download limits if watermark
    if (req.user.plan === 'free' && file.watermark && req.user.dailyDownloads >= 3) {
      return res.status(403).json({ message: 'Free download limit reached. Upgrade for unlimited.' });
    }

    const filePath = path.join(__dirname, '..', file.path);

    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(filePath, file.name, (err) => {
      if (err) {
        res.status(500).send('Could not download file. Try again.');
      }
      // Optional: Log download or inc counter
    });
  } catch (error) {
    res.status(500).json({ message: 'Download error', error: error.message });
  }
});

// List document files
router.get('/documents/:id/files', auth, async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, user: req.user._id });
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ files: document.files });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
});

module.exports = router;
