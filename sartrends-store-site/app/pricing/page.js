'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, XCircle, ArrowRight, CreditCard, Building, User } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    icon: User,
    features: [
      { name: '5 AI generations/month', included: true },
      { name: 'Basic resume templates', included: true },
      { name: 'Limited HSE docs', included: true },
      { name: 'Standard support', included: true },
      { name: 'Website builder', included: false },
      { name: 'Advanced templates', included: false },
      { name: 'Priority support', included: false },
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: 19,
    period: 'month',
    description: 'Best for professionals',
    icon: CreditCard,
    features: [
      { name: 'Unlimited AI generations', included: true },
      { name: 'All resume templates', included: true },
      { name: 'Full HSE documentation', included: true },
      { name: 'Website builder', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced templates', included: true },
      { name: 'Custom branding', included: false },
    ],
    cta: 'Go Pro',
    popular: true
  },
  {
    name: 'Business',
    price: 49,
    period: 'month',
    description: 'For teams and companies',
    icon: Building,
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Custom templates', included: true },
      { name: 'Team management', included: true },
      { name: 'API access', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'White-label options', included: true },
      { name: 'Custom integrations', included: true },
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const paymentMethods = [
  { name: 'EasyPaisa', details: '+92 345 4837460' },
  { name: 'Meezan Bank', details: '77010105779192' }
]

export default function PricingPage() {
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
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-400">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
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
                <div className={`glass-card p-8 h-full ${plan.popular ? 'border-primary/50' : ''}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-3 text-sm">
                        {feature.included ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={plan.price === 0 ? 'https://ai.sartrends.store' : '/contact'}
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

      {/* Payment Methods */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Payment Methods</h2>
            <p className="text-gray-400">We accept easy and secure payment options</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                <p className="text-2xl font-bold gradient-text">{method.details}</p>
                <p className="text-sm text-gray-400 mt-2">Send payment and upload screenshot for verification</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'How does payment verification work?', a: 'After you make a payment, upload your payment screenshot. Our team will verify it within 24 hours and activate your account.' },
              { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.' },
              { q: 'What payment methods do you accept?', a: 'We accept EasyPaisa and bank transfers to Meezan Bank. Contact us for other payment options.' },
              { q: 'Is there a refund policy?', a: 'Yes, we offer a 7-day money-back guarantee if you\'re not satisfied with our service.' },
            ].map((faq, index) => (
              <div key={index} className="glass-card p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

