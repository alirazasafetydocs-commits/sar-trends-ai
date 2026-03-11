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

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@sartrends.store' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      // Update to ensure isAdmin is true
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log('Admin user updated successfully');
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const adminUser = new User({
        name: 'Admin',
        email: 'admin@sartrends.store',
        password: hashedPassword,
        plan: 'business',
        isAdmin: true,
        generationsLeft: 999999,
        paymentVerified: true
      });

      await adminUser.save();
      console.log('Admin user created successfully!');
    }

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

