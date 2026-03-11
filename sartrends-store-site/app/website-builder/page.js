'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Loader, Copy } from 'lucide-react'

export default function WebsiteBuilderPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    services: '',
    email: '',
    phone: '',
    address: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'website', 
          businessName: formData.businessName,
          industry: formData.industry,
          services: formData.services.split(',').map(s => s.trim()).filter(s => s),
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        })
      })
      const data = await response.json()
      setResult(data.document)
    } catch (error) {
      alert('Error generating website. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result) {
      const text = `Business: ${result.content.businessName}
Industry: ${result.content.industry}
Pages: ${result.content.pages.map(p => p.name).join(', ')}`
      navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="bg-dark-900 min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            AI Website <span className="gradient-text">Builder</span>
          </h1>
          <p className="text-gray-400 mb-8">Generate website content for your business</p>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="My Business"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Industry *</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Construction, Healthcare, Technology..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Services (comma separated)</label>
                <input
                  type="text"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Web Design, Marketing, Consulting..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="info@business.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-20"
                  placeholder="123 Business St, City, Country"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader className="w-5 h-5 animate-spin" /> Generating...</>
                ) : (
                  <><Globe className="w-5 h-5" /> Generate Website</>
                )}
              </button>
            </form>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Generated Website</h3>
              
              {result ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Business Name</p>
                    <p className="font-semibold">{result.content.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Industry</p>
                    <p>{result.content.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pages Generated</p>
                    <div className="space-y-2 mt-2">
                      {result.content.pages && result.content.pages.map((page, i) => (
                        <div key={i} className="bg-dark-800 p-3 rounded-lg">
                          <p className="font-semibold text-primary">{page.name}</p>
                          <p className="text-sm text-gray-400">{page.content}</p>
                        </div>
                      ))}
                    </div>
                  
                  <button
                    onClick={copyToClipboard}
                    className="w-full bg-dark-700 text-white py-2 px-4 rounded-lg hover:bg-dark-600 flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> Copy to Clipboard
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill the form and click Generate</p>
                </div>
              )}
            </div>
        </motion.div>
      </div>
  )
}
