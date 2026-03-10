'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Shield, 
  FileText, 
  Globe, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Users,
  TrendingUp,
  Award
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'ATS Resume Builder',
    description: 'Create professional, ATS-optimized resumes that pass through applicant tracking systems.',
    color: 'from-blue-500 to-cyan-500',
    link: '/ai-tools'
  },
  {
    icon: Shield,
    title: 'HSE Documentation',
    description: 'Generate Risk Assessments, RAMS, JSA, Method Statements, and more in minutes.',
    color: 'from-green-500 to-emerald-500',
    link: '/hse-documentation'
  },
  {
    icon: Globe,
    title: 'AI Website Builder',
    description: 'Create stunning, responsive websites instantly with our AI-powered builder.',
    color: 'from-purple-500 to-pink-500',
    link: '/ai-tools'
  },
  {
    icon: Zap,
    title: 'Cover Letter Generator',
    description: 'Write compelling cover letters that capture recruiters\' attention.',
    color: 'from-orange-500 to-red-500',
    link: '/ai-tools'
  }
]

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Users' },
  { icon: FileText, value: '50,000+', label: 'Documents Generated' },
  { icon: TrendingUp, value: '98%', label: 'Success Rate' },
  { icon: Award, value: '4.9/5', label: 'User Rating' }
]

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Safety Manager',
    company: 'Al-Futtaim Group',
    text: 'The HSE documentation tools saved me hours of work. The RAMS and Risk Assessments are professionally formatted.',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'Tech Corp',
    text: 'My resume got noticed after using the ATS builder. Landed 3 interviews within a week!',
    rating: 5
  },
  {
    name: 'Muhammad Ali',
    role: 'Business Owner',
    company: 'StartUp Inc',
    text: 'The AI website builder created an amazing website for my business. Highly recommended!',
    rating: 5
  }
]

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started',
    features: ['5 AI generations/month', 'Basic resume templates', 'Limited HSE docs', 'Standard support'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '19',
    description: 'Best for professionals',
    features: ['Unlimited AI generations', 'All resume templates', 'Full HSE documentation', 'Website builder', 'Priority support'],
    cta: 'Go Pro',
    popular: true
  },
  {
    name: 'Business',
    price: '49',
    description: 'For teams and companies',
    features: ['Everything in Pro', 'Custom templates', 'Team management', 'API access', 'Dedicated support', 'White-label options'],
    cta: 'Contact Sales',
    popular: false
  }
]

export default function HomePage() {
  return (
    <div className="bg-dark-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-pink/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">AI-Powered Professional Tools</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Create ATS Resumes,{' '}
                <span className="gradient-text">HSE Documents</span>{' '}
                and Websites Instantly with AI
              </h1>
              
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Transform your career with our cutting-edge AI tools. Generate professional resumes, comprehensive HSE documentation, and stunning websites in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="https://ai.sartrends.store" className="btn-primary inline-flex items-center justify-center gap-2">
                  Start AI Tools <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="btn-secondary inline-flex items-center justify-center gap-2">
                  View Services
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Floating Elements */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                {/* Main Card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 glass-card p-6 float-animation">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Resume Builder</h3>
                  <p className="text-gray-400 text-sm">Generate ATS-optimized resumes in seconds</p>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Pro</span>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs">AI Powered</span>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute top-10 right-10 w-48 glass-card p-4 float-animation float-delay-1">
                  <FileText className="w-8 h-8 text-cyan-400 mb-2" />
                  <p className="text-sm font-medium">HSE Documents</p>
                  <p className="text-xs text-gray-400">RAMS, JSA, Risk Assessment</p>
                </div>

                <div className="absolute bottom-20 left-10 w-48 glass-card p-4 float-animation float-delay-2">
                  <Globe className="w-8 h-8 text-purple-400 mb-2" />
                  <p className="text-sm font-medium">Website Builder</p>
                  <p className="text-xs text-gray-400">AI-generated websites</p>
                </div>

                <div className="absolute top-20 left-0 w-40 glass-card p-3 float-animation float-delay-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-sm font-medium">98% Success</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-dark-700 bg-dark-800/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful <span className="gradient-text">AI Tools</span> for Professionals
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered tools help you create professional documents, resumes, and websites in minutes, not hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.link}>
                  <div className="glass-card p-6 h-full card-hover group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className={`glass-card p-8 ${plan.popular ? 'border-primary/50' : ''}`}>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={plan.price === '0' ? 'https://ai.sartrends.store' : '/pricing'}
                    className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                      plan.popular 
                        ? 'btn-primary' 
                        : 'border border-primary/50 text-primary hover:bg-primary/10'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied professionals who trust SAR Trends for their career needs.
            </p>
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
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Join thousands of professionals using SAR Trends AI to create professional documents, resumes, and websites in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://ai.sartrends.store" className="btn-primary inline-flex items-center justify-center gap-2">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

