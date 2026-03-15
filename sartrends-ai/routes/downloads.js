const express = require('express');
const Document = require('../models/Document');
const fileGen = require('../services/fileGenerator');
const auth = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Optional auth
const optionalAuth = (req, res, next) => {
  if (req.header('Authorization')) {
    auth(req, res, next);
  } else {
    next();
  }
};

// GET /api/downloads/pdf/:docId or /pdf/:type/:id
router.get('/:format(pdf|docx|txt|png|mp4)/:docId', optionalAuth, async (req, res) => {
  try {
    const { format, docId } = req.params;
    const doc = await Document.findById(docId);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const content = doc.content.generatedContent || doc.content.content || JSON.stringify(doc.content);
    const filename = `${doc.type}-${docId.substring(0,8)}.${format}`;
    let url;

    switch (format) {
      case 'pdf':
        url = await fileGen.generatePDF(content, filename);
        break;
      case 'docx':
        url = await fileGen.generateDOCX(content, filename);
        break;
      case 'txt':
        url = fileGen.generateTXT(content, filename);
        break;
      case 'png':
        url = await fileGen.generatePNG(doc.inputData.prompt || 'demo', filename);
        break;
      case 'mp4':
        url = await fileGen.generateMP4(doc.inputData.prompt || 'demo', filename);
        break;
    }

    res.json({ 
      url, 
      filename,
      downloadUrl: url,
      type: doc.type,
      message: 'Download ready'
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Generation failed', details: error.message });
  }
});

module.exports = router;
