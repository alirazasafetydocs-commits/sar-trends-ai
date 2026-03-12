'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'How to Create an ATS-Optimized Resume That Gets Noticed',
    excerpt: 'Learn the secrets to passing through applicant tracking systems and getting your resume noticed by recruiters. Our comprehensive guide covers formatting, keywords, and content strategies.',
    category: 'Resume Tips',
    date: 'Jan 15, 2024',
    author: 'SAR Trends Team',
    image: 'resume',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'Complete Guide to HSE Documentation for Construction Projects',
    excerpt: 'A comprehensive guide to the HSE documentation required for construction projects. Learn about RAMS, risk assessments, and safety protocols.',
    category: 'HSE',
    date: 'Jan 12, 2024',
    author: 'SAR Trends Team',
    image: 'hse',
    readTime: '12 min read'
  },
  {
    id: 3,
    title: 'How AI is Revolutionizing Professional Document Creation',
    excerpt: 'Discover how artificial intelligence is transforming the way we create resumes, cover letters, and business documents. Save time and improve quality.',
    category: 'AI Technology',
    date: 'Jan 10, 2024',
    author: 'SAR Trends Team',
    image: 'ai',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Writing Cover Letters That Land Interviews',
    excerpt: 'Expert tips and proven strategies to write cover letters that capture recruiters attention and help you stand out from other applicants.',
    category: 'Career Tips',
    date: 'Jan 8, 2024',
    author: 'SAR Trends Team',
    image: 'cover',
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Understanding RAMS Documents: A Complete Overview',
    excerpt: 'Everything you need to know about Risk Assessment and Method Statements (RAMS). Templates, examples, and best practices included.',
    category: 'HSE',
    date: 'Jan 5, 2024',
    author: 'SAR Trends Team',
    image: ' rams',
    readTime: '10 min read'
  },
  {
    id: 6,
    title: 'Building Your Personal Brand with AI Tools',
    excerpt: 'How to leverage AI tools to build a strong professional personal brand and accelerate your career growth in 2024.',
    category: 'Career Tips',
    date: 'Jan 3, 2024',
    author: 'SAR Trends Team',
    image: 'brand',
    readTime: '5 min read'
  },
  {
    id: 7,
    title: 'Top 10 Resume Mistakes That Cost You Interviews',
    excerpt: 'Avoid these common resume mistakes that automatically disqualify your application before it reaches human eyes.',
    category: 'Resume Tips',
    date: 'Jan 1, 2024',
    author: 'SAR Trends Team',
    image: 'resume',
    readTime: '9 min read'
  },
  {
    id: 8,
    title: 'AI-Powered Website Building: The Future of Web Development',
    excerpt: 'Learn how our AI website builder can create stunning, professional websites in minutes without coding knowledge.',
    category: 'AI Technology',
    date: 'Dec 28, 2023',
    author: 'SAR Trends Team',
    image: 'ai',
    readTime: '6 min read'
  }
]

const categories = ['All', 'Resume Tips', 'HSE', 'AI Technology', 'Career Tips']

export default function BlogPage() {
  return (
    <div className="bg-dark-900 min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Latest <span className="gradient-text">Blog Posts</span>
            </h1>
            <p className="text-xl text-gray-400">
              Tips, guides, and insights on resumes, HSE documentation, and AI tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                <div className={`h-48 bg-gradient-to-br ${
                  post.image === 'resume' ? 'from-blue-500 to-cyan-500' :
                  post.image === 'hse' ? 'from-green-500 to-emerald-500' :
                  post.image === 'ai' ? 'from-purple-500 to-pink-500' :
                  post.image === ' rams' ? 'from-orange-500 to-red-500' :
                  'from-primary to-secondary'
                } flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-white/30">{post.category[0]}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" /> {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                  <Link href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get the latest tips and insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-5 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

