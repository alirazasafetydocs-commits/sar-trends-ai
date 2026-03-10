'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Brain, ChevronDown } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'AI Tools', href: '/ai-tools' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const servicesDropdown = [
  { name: 'HSE Documentation', href: '/hse-documentation', desc: 'Risk Assessments, RAMS, JSA & More' },
  { name: 'Resume Writing', href: '/resume-services', desc: 'ATS-Optimized Professional Resumes' },
  { name: 'Website Builder', href: '/ai-tools', desc: 'AI-Powered Website Generation' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-primary/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">SAR</span>
              <span className="text-white">Trends</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-primary transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="glass-card p-2 min-w-[280px] animate-fade-in">
                    {servicesDropdown.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block p-4 rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        <p className="font-semibold text-white">{service.name}</p>
                        <p className="text-sm text-gray-400 mt-1">{service.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="https://ai.sartrends.store" className="btn-primary">
              Start AI Tools
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden glass overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container-custom py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 rounded-lg transition-colors ${
                pathname === link.href 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-gray-300 hover:bg-dark-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-dark-700">
            <p className="text-xs text-gray-500 px-4 mb-2">Services</p>
            {servicesDropdown.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-gray-300 hover:bg-dark-700 rounded-lg"
              >
                {service.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4">
            <Link href="https://ai.sartrends.store" className="btn-primary block text-center mx-4">
              Start AI Tools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

