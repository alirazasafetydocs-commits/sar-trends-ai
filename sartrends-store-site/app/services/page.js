'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Shield, Globe, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: 'Resume Writing Services',
    description: 'AI-powered resume builder that creates ATS-optimized resumes tailored to your industry.',
    features: ['ATS-Optimized Templates', 'Industry-Specific Content', 'Keyword Optimization', 'Multiple Formats'],
    color: 'from-blue-500 to-cyan-500',
    link: '/resume-services'
  },
  {
    icon: Shield,
    title: 'HSE Documentation',
    description: 'Comprehensive health, safety, and environmental documentation for your projects.',
    features: ['Risk Assessments', 'RAMS', 'Method Statements', 'JSA', 'Toolbox Talks'],
    color: 'from-green-500 to-emerald-500',
    link: '/hse-documentation'
  },
  {
    icon: Globe,
    title: 'Website Builder',
    description: 'Create stunning, responsive websites in minutes with our AI-powered builder.',
    features: ['AI Content Generation', 'Responsive Design', 'SEO Optimized', 'Custom Branding'],
    color: 'from-purple-500 to-pink-500',
    link: '/ai-tools'
  },
  {
    icon: Zap,
    title: 'Cover Letter Generator',
    description: 'Write compelling cover letters that capture recruiters\' attention.',
    features: ['AI-Powered Writing', 'Custom Templates', 'Industry Variations', 'Quick Generation'],
    color: 'from-orange-500 to-red-500',
    link: '/ai-tools'
  }
]

const process = [
  { step: 1, title: 'Choose Service', desc: 'Select the type of document you need' },
  { step: 2, title: 'Enter Details', desc: 'Provide your information and preferences' },
  { step: 3, title: 'AI Generation', desc: 'Our AI creates your document instantly' },
  { step: 4, title: 'Download & Use', desc: 'Review, edit, and download your document' }
]

export default function ServicesPage() {
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
              Our <span className="gradient-text">Professional Services</span>
            </h1>
            <p className="text-xl text-gray-400">
              AI-powered tools and services to help you create professional documents, resumes, and websites in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.link} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Get your professional documents in four simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold gradient-text mb-2">10,000+</p>
                <p className="text-gray-400">Documents Generated</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text mb-2">98%</p>
                <p className="text-gray-400">Success Rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text mb-2">4.9/5</p>
                <p className="text-gray-400">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding pb-24">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of professionals who trust SAR Trends for their career needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://ai.sartrends.store" className="btn-primary inline-flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

