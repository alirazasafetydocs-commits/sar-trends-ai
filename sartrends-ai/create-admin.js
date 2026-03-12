// Seed script to create admin user
// Run this script once: node create-admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sartrends-ai';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing admin and create fresh
    await User.deleteOne({ email: 'admin@sartrends.store' });
    
    // Create admin user - don't hash here, let the model pre-save hook handle it
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@sartrends.store',
      password: 'Admin@123',
      plan: 'business',
      isAdmin: true,
      generationsLeft: 999999,
      paymentVerified: true
    });

    await adminUser.save();
    console.log('Admin user created successfully!');

    console.log('\nAdmin Credentials:');
    console.log('Email: admin@sartrends.store');
    console.log('Password: Admin@123');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createAdmin();

