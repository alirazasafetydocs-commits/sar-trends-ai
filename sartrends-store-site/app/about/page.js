'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Shield, Globe, Zap, Users, Award, TrendingUp, CheckCircle } from 'lucide-react'

const values = [
  {
    icon: Brain,
    title: 'Innovation',
    description: 'We constantly innovate to provide cutting-edge AI solutions.'
  },
  {
    icon: Shield,
    title: 'Quality',
    description: 'Every document is crafted to the highest professional standards.'
  },
  {
    icon: Zap,
    title: 'Speed',
    description: 'Generate professional documents in seconds, not hours.'
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Our customers success is our top priority.'
  }
]

const stats = [
  { value: '10,000+', label: 'Happy Users' },
  { value: '50,000+', label: 'Documents Generated' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'Support' }
]

export default function AboutPage() {
  return (
    <div className="bg-dark-900 min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">SAR Trends</span>
            </h1>
            <p className="text-xl text-gray-400">
              We're on a mission to make professional document creation accessible to everyone through the power of AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  SAR Trends was founded with a simple vision: to make professional document creation accessible to everyone. We recognized that many professionals struggle with creating resumes, HSE documents, and websites that meet industry standards.
                </p>
                <p>
                  By leveraging the power of artificial intelligence, we've created a platform that can generate professional-quality documents in seconds, saving our users countless hours of work.
                </p>
                <p>
                  Today, we serve thousands of users across multiple industries, helping them land jobs, win contracts, and grow their businesses with our AI-powered tools.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              To democratize professional document creation by making AI-powered tools accessible to everyone, everywhere. We believe that everyone deserves access to high-quality resumes, HSE documentation, and websites - regardless of their technical skills or budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Innovation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Quality</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Accessibility</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Customer Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pb-24">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Join Thousands of Satisfied Users</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Start creating professional documents today with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://ai.sartrends.store" className="btn-primary">
              Get Started Free
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

