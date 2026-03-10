'use client'

import Link from 'next/link'
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const services = [
    { name: 'ATS Resume Builder', href: '/ai-tools' },
    { name: 'Cover Letter Generator', href: '/ai-tools' },
    { name: 'Risk Assessment', href: '/hse-documentation' },
    { name: 'RAMS', href: '/hse-documentation' },
    { name: 'Method Statements', href: '/hse-documentation' },
    { name: 'Website Builder', href: '/ai-tools' },
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      {/* Newsletter Section */}
      <div className="border-b border-dark-700">
        <div className="container-custom py-16">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Stay Updated with AI Trends</h3>
                <p className="text-gray-400">Get the latest tips on resume writing, HSE documentation, and AI tools.</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 md:w-72 px-5 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
                <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">SAR</span>
                <span className="text-white">Trends</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              AI-powered professional tools for resumes, HSE documents, and websites. Transform your career with cutting-edge technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-400 hover:text-primary transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <a href="mailto:info@sartrends.store" className="text-gray-400 hover:text-primary transition-colors">
                  info@sartrends.store
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+923454837460" className="text-gray-400 hover:text-primary transition-colors">
                  +92 345 4837460
                </a>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8 pt-8 border-t border-dark-700">
              <h5 className="text-sm font-semibold text-gray-300 mb-4">Payment Methods</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <p>EasyPaisa: +92 345 4837460</p>
                <p>Meezan Bank: 77010105779192</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-dark-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SAR Trends. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

