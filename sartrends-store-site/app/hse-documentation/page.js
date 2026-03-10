'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, FileText, AlertTriangle, ClipboardList, ArrowRight, CheckCircle } from 'lucide-react'

const documents = [
  {
    icon: AlertTriangle,
    title: 'Risk Assessment',
    description: 'Comprehensive risk assessments identifying hazards, evaluating risks, and implementing control measures.',
    features: ['Hazard Identification', 'Risk Matrix', 'Control Measures', 'Compliance Templates'],
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: ClipboardList,
    title: 'RAMS',
    description: 'Risk Assessment and Method Statements for comprehensive safety planning and compliance.',
    features: ['Risk Assessment', 'Method Statements', 'Safe Procedures', 'Emergency Plans'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: 'JSA',
    description: 'Job Safety Analysis break down tasks into steps and identify hazards at each stage.',
    features: ['Task Breakdown', 'Hazard Analysis', 'Control Measures', 'Sign-off Sheets'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Shield,
    title: 'Method Statements',
    description: 'Detailed method statements explaining HOW work will be carried out safely.',
    features: ['Work Procedures', 'Resource Planning', 'Timeline', 'Quality Standards'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FileText,
    title: 'Safety Reports',
    description: 'Comprehensive safety reports for projects, sites, and organizational compliance.',
    features: ['Site Audits', 'Compliance Reports', 'Incident Analysis', 'Recommendations'],
    color: 'from-indigo-500 to-violet-500'
  },
  {
    icon: AlertTriangle,
    title: 'Toolbox Talks',
    description: 'Weekly safety talks and toolbox meeting templates for your workforce.',
    features: ['Topic Guides', 'Attendance Sheets', 'Discussion Points', 'Action Items'],
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: 'Incident Reports',
    description: 'Detailed incident reporting forms for accidents and near-misses.',
    features: ['Investigation Forms', 'Root Cause Analysis', 'Corrective Actions', 'Follow-up Tracking'],
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Shield,
    title: 'HSE Audit Reports',
    description: 'Comprehensive HSE audit reports for compliance verification.',
    features: ['Audit Checklists', 'Findings Summary', 'Compliance Status', 'Action Plans'],
    color: 'from-rose-500 to-pink-500'
  }
]

export default function HSEDocumentationPage() {
  return (
    <div className="bg-dark-900 min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-400 font-medium">HSE Documentation Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="gradient-text">HSE Documentation</span>
            </h1>
            <p className="text-xl text-gray-400">
              Generate comprehensive health, safety, and environmental documents instantly with our AI-powered tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <doc.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{doc.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{doc.description}</p>
                <ul className="space-y-2 mb-4">
                  {doc.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="https://ai.sartrends.store" 
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm"
                >
                  Generate Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose HSE Docs */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our HSE Documentation?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Professional, compliant, and comprehensive HSE documents tailored to your needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compliant</h3>
              <p className="text-gray-400">All documents follow international HSE standards and regulations.</p>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <p className="text-gray-400">Industry-standard formatting and comprehensive content.</p>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant</h3>
              <p className="text-gray-400">Generate complete documents in minutes, not hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Generate HSE Documents?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Start creating professional HSE documents today with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://ai.sartrends.store" className="btn-primary inline-flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center gap-2">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

