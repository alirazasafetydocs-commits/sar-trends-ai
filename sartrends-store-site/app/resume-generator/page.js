'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Loader, Download, Copy } from 'lucide-react'

export default function ResumeGeneratorPage() {
  const [loading, setLoading] = useState(false)
  const [backendUrl, setBackendUrl] = useState('')
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    education: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname
      if (host === 'localhost' || host === '127.0.0.1') {
        setBackendUrl('http://localhost:5000')
      } else {
        setBackendUrl(process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-backend.onrender.com')
      }
    }
  }, [])

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
        body: JSON.stringify({ type: 'resume', ...formData })
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        if (response.status === 403 || errData.upgradeRequired) {
          alert('Free trial limit reached (3 documents). Upgrade to Pro or Business for unlimited!');
          window.location.href = '/pricing'
          return
        }
        alert(errData.message || 'Generation failed')
        return
      }

      const data = await response.json()
      setResult(data.document)
    } catch (error) {
      alert('Error generating resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result) {
      const text = `${result.content.fullName}\n${result.content.email}\n${result.content.phone}\n\nSummary: ${result.content.summary}\n\nSkills: ${result.content.skills.join(', ')}\n\nExperience: ${result.content.experience}\n\nEducation: ${result.content.education}`
      navigator.clipboard.writeText(text)
        .then(() => alert('Copied to clipboard!'))
        .catch(() => alert('Copy failed'))
    }
  }

  const handleDownload = async (type) => {
    if (!result || !backendUrl || loading) return
    setLoading(true)
    try {
      const response = await fetch(`${backendUrl}/api/downloads/${type}/${result._id}`)
      if (response.status === 403) {
        const errData = await response.json().catch(() => ({}))
        alert('Download limit reached. Upgrade to Pro/Business for unlimited documents!')
        window.location.href = '/pricing'
        return
      }
      if (!response.ok) throw new Error('Download failed')
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resume.${type}`
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      alert('Download failed. Ensure backend is running.')
    } finally {
      setLoading(false)
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
            ATS Resume <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-gray-400 mb-8">Create professional, ATS-optimized resumes</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* form fields same */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              {/* ... other fields same */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" /> Generate Resume
                  </>
                )}
              </button>
            </form>

            {/* Result */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Generated Resume</h3>
              {result ? (
                <div className="space-y-4">
                  {/* display fields same */}
                  <div className="space-y-2">
                    <button
                      onClick={copyToClipboard}
                      className="w-full bg-dark-700 text-white py-2 px-4 rounded-lg hover:bg-dark-600 flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" /> Copy to Clipboard
                    </button>
                    {backendUrl && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleDownload('pdf')}
                          disabled={loading}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          PDF
                        </button>
                        <button
                          onClick={() => handleDownload('docx')}
                          disabled={loading}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          DOCX
                        </button>
                        <button
                          onClick={() => handleDownload('txt')}
                          disabled={loading}
                          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 flex items-center justify-center gap-2 col-span-2"
                        >
                          <Download className="w-4 h-4" />
                          TXT
                        </button>
                      </div>
                    )}
                    {!backendUrl && (
                      <p className="text-orange-400 text-sm text-center">Backend URL not configured. Download not available.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill the form and click Generate</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
