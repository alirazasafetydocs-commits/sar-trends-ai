const express = require('express');
const Payment = require('../models/Payment');
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

// Submit payment
router.post('/submit', auth, async (req, res) => {
  try {
    const { amount, method, plan, screenshot, transactionId } = req.body;

    const payment = new Payment({
      user: req.user._id,
      amount,
      method,
      plan,
      screenshot,
      transactionId,
      status: 'pending'
    });

    await payment.save();

    res.status(201).json({
      message: 'Payment submitted successfully. We will verify it within 24 hours.',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user payments
router.get('/my-payments', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all payments (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.query;
    const query = {};
    if (status) {
      query.status = status;
    }

    const payments = await Payment.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve/Reject payment (admin only)
router.put('/verify/:id', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status, notes } = req.body;
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = status;
    payment.notes = notes;
    payment.processedAt = new Date();
    await payment.save();

    // Update user plan if approved
    if (status === 'approved') {
      const user = await User.findById(payment.user);
      user.plan = payment.plan;
      user.paymentVerified = true;
      
      if (payment.plan === 'pro') {
        user.generationsLeft = -1; // Unlimited
      } else if (payment.plan === 'business') {
        user.generationsLeft = -1; // Unlimited
      }
      
      await user.save();
    }

    res.json({ message: `Payment ${status}`, payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

