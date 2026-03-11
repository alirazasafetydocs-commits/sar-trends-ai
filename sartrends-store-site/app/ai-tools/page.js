'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Shield, Globe, Mail, ArrowRight, CheckCircle } from 'lucide-react'

const tools = [
{
    id: 'ats-resume',
    icon: FileText,
    title: 'ATS Resume Generator',
    description: 'Create professional, ATS-optimized resumes that pass through applicant tracking systems with ease.',
    features: [
      'ATS-Optimized Formatting',
      'Keyword Optimization',
      'Industry Templates',
      'Multiple Layout Options',
      'Real-time Preview'
    ],
    color: 'from-blue-500 to-cyan-500',
    link: '/resume-generator'
  },
  {
    id: 'cover-letter',
    icon: Mail,
    title: 'Cover Letter Generator',
    description: 'Write compelling cover letters that capture recruiters\' attention and land you interviews.',
    features: [
      'AI-Powered Writing',
      'Custom Templates',
      'Industry Variations',
      'Quick Generation',
      'Professional Tone'
    ],
    color: 'from-orange-500 to-red-500',
    link: '/cover-letter'
  },
  {
    id: 'hse',
    icon: Shield,
    title: 'HSE Documents Generator',
    description: 'Generate comprehensive HSE documents including Risk Assessments, RAMS, and Method Statements.',
    features: [
      'Risk Assessments',
      'RAMS Documents',
      'Method Statements',
      'Toolbox Talks',
      'Compliance Templates'
    ],
    color: 'from-green-500 to-emerald-500',
    link: '/hse-generator'
  },
  {
    id: 'website',
    icon: Globe,
    title: 'AI Website Builder',
    description: 'Create stunning, responsive websites in minutes with our AI-powered builder.',
    features: [
      'AI Content Generation',
      'Responsive Design',
      'SEO Optimized',
      'Custom Branding',
      'Multiple Templates'
    ],
    color: 'from-teal-500 to-cyan-500',
    link: '/website-builder'
  }
]

export default function AIToolsPage() {
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
              AI Powered <span className="gradient-text">Tools</span>
            </h1>
            <p className="text-xl text-gray-400">
              Professional AI tools for resumes, HSE documents, and websites. Generate unlimited documents with our platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 group hover:border-primary/30 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                <ul className="space-y-2 mb-6">
                  {tool.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {tool.features.length > 3 && (
                    <li className="text-sm text-primary">+{tool.features.length - 3} more features</li>
                  )}
                </ul>
                <Link 
                  href={tool.link} 
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Use Tool <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Unlimited AI Generations</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get unlimited access to all AI tools with our Pro plan. Create as many resumes, HSE documents, and websites as you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="btn-primary inline-flex items-center justify-center gap-2">
                View Pricing <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://ai.sartrends.store" className="btn-secondary inline-flex items-center justify-center gap-2">
                Try Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

