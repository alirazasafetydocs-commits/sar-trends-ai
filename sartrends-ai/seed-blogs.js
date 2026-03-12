// Seed script to create initial blog posts
// Run this script once: node seed-blogs.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Blog = require('./models/Blog');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sartrends-ai';

const blogs = [
  {
    title: 'How to Create an ATS-Optimized Resume That Gets Noticed',
    excerpt: 'Learn the secrets to passing through applicant tracking systems and getting your resume noticed by recruiters. Our comprehensive guide covers formatting, keywords, and content strategies.',
    category: 'Resume Tips',
    image: 'resume',
    status: 'Published',
    views: 1234,
    readTime: '8 min read'
  },
  {
    title: 'Complete Guide to HSE Documentation for Construction Projects',
    excerpt: 'A comprehensive guide to the HSE documentation required for construction projects. Learn about RAMS, risk assessments, and safety protocols.',
    category: 'HSE',
    image: 'hse',
    status: 'Published',
    views: 987,
    readTime: '12 min read'
  },
  {
    title: 'How AI is Revolutionizing Professional Document Creation',
    excerpt: 'Discover how artificial intelligence is transforming the way we create resumes, cover letters, and business documents. Save time and improve quality.',
    category: 'AI Technology',
    image: 'ai',
    status: 'Published',
    views: 756,
    readTime: '6 min read'
  },
  {
    title: 'Writing Cover Letters That Land Interviews',
    excerpt: 'Expert tips and proven strategies to write cover letters that capture recruiters attention and help you stand out from other applicants.',
    category: 'Career Tips',
    image: 'cover',
    status: 'Published',
    views: 654,
    readTime: '7 min read'
  },
  {
    title: 'Understanding RAMS Documents: A Complete Overview',
    excerpt: 'Everything you need to know about Risk Assessment and Method Statements (RAMS). Templates, examples, and best practices included.',
    category: 'HSE',
    image: 'hse',
    status: 'Published',
    views: 543,
    readTime: '10 min read'
  },
  {
    title: 'Building Your Personal Brand with AI Tools',
    excerpt: 'How to leverage AI tools to build a strong professional personal brand and accelerate your career growth in 2024.',
    category: 'Career Tips',
    image: 'brand',
    status: 'Published',
    views: 432,
    readTime: '5 min read'
  },
  {
    title: 'Top 10 Resume Mistakes That Cost You Interviews',
    excerpt: 'Avoid these common resume mistakes that automatically disqualify your application before it reaches human eyes.',
    category: 'Resume Tips',
    image: 'resume',
    status: 'Published',
    views: 321,
    readTime: '9 min read'
  },
  {
    title: 'AI-Powered Website Building: The Future of Web Development',
    excerpt: 'Learn how our AI website builder can create stunning, professional websites in minutes without coding knowledge.',
    category: 'AI Technology',
    image: 'ai',
    status: 'Published',
    views: 210,
    readTime: '6 min read'
  }
];

async function seedBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    // Insert new blogs
    await Blog.insertMany(blogs);
    console.log('Created 8 blog posts successfully!');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedBlogs();

