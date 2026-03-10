'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Mail, CheckCircle, ArrowRight, Star } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'ATS Resume Builder',
    description: 'Create resumes that pass through Applicant Tracking Systems.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Mail,
    title: 'Cover Letter Generator',
    description: 'Write compelling cover letters that get noticed.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: CheckCircle,
    title: 'Keyword Optimization',
    description: 'Automatically optimize your resume with relevant keywords.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FileText,
    title: 'Multiple Formats',
    description: 'Export to PDF, DOCX, and other formats.',
    color: 'from-orange-500 to-red-500'
  }
]

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Software Engineer',
    text: 'My resume got noticed after using the ATS builder. Landed 3 interviews within a week!',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    text: 'The cover letter generator helped me stand out from other applicants. Highly recommended!',
    rating: 5
  },
  {
    name: 'Muhammad Ali',
    role: 'Project Manager',
    text: 'Professional resumes that actually work. SAR Trends is a game changer.',
    rating: 5
  }
]

export default function ResumeServicesPage() {
  return (
    <div className="bg-dark-900 min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="gradient-text">Resume Services</span>
            </h1>
            <p className="text-xl text-gray-400">
              AI-powered resume builder and cover letter generator to help you land your dream job.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Job Seekers Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Create professional resumes and cover letters that get you noticed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://ai.sartrends.store" className="btn-primary inline-flex items-center justify-center gap-2">
              Create Resume <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center gap-2">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

