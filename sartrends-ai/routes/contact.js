const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Contact Message Model
const ContactMessage = require('../models/ContactMessage');

// Admin auth middleware
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

// POST - Submit contact form (public)
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    // Save to database
    const contactMessage = new ContactMessage({
      name,
      email,
      subject: subject || 'General Inquiry',
      message
    });

    await contactMessage.save();

    // Return WhatsApp link for user convenience
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '923454837460';
    const whatsappMessage = encodeURIComponent(`New Contact Message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'General Inquiry'}\n\nMessage: ${message}`);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    res.status(201).json({
      message: 'Message received successfully!',
      whatsappLink,
      saved: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Get all contact messages (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Get unread message count (admin only)
router.get('/unread-count', auth, async (req, res) => {
  try {
    const count = await ContactMessage.countDocuments({ read: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Mark message as read (admin only)
router.put('/mark-read/:id', auth, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

