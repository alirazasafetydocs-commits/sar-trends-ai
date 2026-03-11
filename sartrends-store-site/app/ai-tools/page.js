'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Shield, Globe, Mail, ArrowRight, CheckCircle } from 'lucide-react'

const tools = [
  {
    id: 'ats-resume',
    icon: FileText,
    title: 'ATS Resume Generator',
    description: 'Create professional, ATS-optimized resumes that pass through applicant tracking systems.',
    features: ['ATS-Optimized', 'Keyword Optimization', 'Industry Templates', 'GPT-4 Powered'],
    color: 'from-blue-500 to-cyan-500',
    link: '/resume-generator'
  },
  {
    id: 'cv-uk',
    icon: FileText,
    title: 'CV Generator (UK)',
    description: 'Create comprehensive CVs in UK/EU format with professional formatting.',
    features: ['UK/EU Format', 'Detailed Sections', 'Achievement-focused', '2-3 Pages'],
    color: 'from-indigo-500 to-blue-500',
    link: '/resume-generator'
  },
  {
    id: 'cover-letter',
    icon: Mail,
    title: 'Cover Letter Generator',
    description: 'Write compelling cover letters with multiple tone options.',
    features: ['AI-Powered', 'Multiple Tones', 'Industry Variations', 'Quick Generation'],
    color: 'from-orange-500 to-red-500',
    link: '/cover-letter'
  },
  {
    id: 'follow-up',
    icon: Mail,
    title: 'Follow-up Letter',
    description: 'Generate professional follow-up letters for job applications.',
    features: ['Polite Follow-ups', 'Interview Thanks', 'Application Status', 'Professional'],
    color: 'from-amber-500 to-orange-500',
    link: '/cover-letter'
  },
  {
    id: 'hse-risk',
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Generate comprehensive risk assessments following ISO 45001 and OSHA.',
    features: ['ISO 45001', 'Risk Matrix', 'Control Measures', 'Emergency Procedures'],
    color: 'from-green-500 to-emerald-500',
    link: '/hse-generator'
  },
  {
    id: 'hse-rams',
    icon: Shield,
    title: 'RAMS Document',
    description: 'Create detailed Risk Assessment and Method Statements.',
    features: ['Complete RAMS', 'Method Statements', 'Safe Work', 'Compliance'],
    color: 'from-teal-500 to-green-500',
    link: '/hse-generator'
  },
  {
    id: 'hse-method',
    icon: Shield,
    title: 'Method Statement',
    description: 'Generate detailed method statements for construction projects.',
    features: ['Step-by-step', 'Resource Planning', 'Quality Standards', 'Timeline'],
    color: 'from-cyan-500 to-teal-500',
    link: '/hse-generator'
  },
  {
    id: 'hse-jsa',
    icon: Shield,
    title: 'Job Safety Analysis',
    description: 'Create comprehensive JSAs for specific job tasks.',
    features: ['Step Analysis', 'Hazard ID', 'Risk Ratings', 'OSHA Compliant'],
    color: 'from-lime-500 to-green-500',
    link: '/hse-generator'
  },
  {
    id: 'hse-incident',
    icon: Shield,
    title: 'Incident Report',
    description: 'Generate professional incident reports with root cause analysis.',
    features: ['Root Cause', 'Corrective Actions', 'OSHA Recording', 'Legal Compliance'],
    color: 'from-red-500 to-rose-500',
    link: '/hse-generator'
  },
  {
    id: 'hse-fire',
    icon: Shield,
    title: 'Fire Risk Assessment',
    description: 'Create fire risk assessments following UK Fire Safety Order.',
    features: ['UK Fire Safety', 'PAS 79', 'Risk Matrix', 'Emergency Planning'],
    color: 'from-red-600 to-orange-500',
    link: '/hse-generator'
  },
  {
    id: 'hse-toolbox',
    icon: Shield,
    title: 'Toolbox Talk',
    description: 'Generate engaging toolbox talks for safety meetings.',
    features: ['5-10 Minutes', 'Interactive', 'Case Studies', 'Sign-off Sheets'],
    color: 'from-yellow-500 to-amber-500',
    link: '/hse-generator'
  },
  {
    id: 'website',
    icon: Globe,
    title: 'AI Website Builder',
    description: 'Create stunning website content with AI-powered generation.',
    features: ['AI Content', 'Responsive Design', 'SEO Optimized', 'Multiple Pages'],
    color: 'from-purple-500 to-pink-500',
    link: '/website-builder'
  },
  {
    id: 'website-code',
    icon: Globe,
    title: 'Website Code Generator',
    description: 'Generate complete HTML/CSS code for professional websites.',
    features: ['Complete HTML/CSS', 'Responsive', 'Modern Design', 'Clean Code'],
    color: 'from-violet-500 to-purple-500',
    link: '/website-builder'
  },
  {
    id: 'job-desc',
    icon: FileText,
    title: 'Job Description',
    description: 'Create comprehensive job descriptions to attract candidates.',
    features: ['Complete JD', 'Responsibilities', 'Requirements', 'Benefits'],
    color: 'from-rose-500 to-pink-500',
    link: '/ai-tools'
  },
  {
    id: 'business-proposal',
    icon: FileText,
    title: 'Business Proposal',
    description: 'Generate professional business proposals to win clients.',
    features: ['Executive Summary', 'Scope', 'Pricing', 'Terms'],
    color: 'from-emerald-500 to-teal-500',
    link: '/ai-tools'
  },
  {
    id: 'sop',
    icon: FileText,
    title: 'SOP Generator',
    description: 'Create detailed Standard Operating Procedures.',
    features: ['Step-by-step', 'Responsibilities', 'Quality Controls', 'Approvals'],
    color: 'from-slate-500 to-gray-500',
    link: '/ai-tools'
  },
  {
    id: 'linkedin',
    icon: FileText,
    title: 'LinkedIn Optimizer',
    description: 'Optimize your LinkedIn profile to attract recruiters.',
    features: ['Keyword Optimization', 'Headline', 'Summary', 'SEO Tips'],
    color: 'from-blue-600 to-indigo-500',
    link: '/ai-tools'
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

