'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Loader, Download, Copy } from 'lucide-react'

export default function ResumeGeneratorPage() {
  const [loading, setLoading] = useState(false)
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
            ATS Resume <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-gray-400 mb-8">Create professional, ATS-optimized resumes</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                    placeholder="john@example.com"
                    required
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Professional Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-20"
                  placeholder="Brief summary of your professional background..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="JavaScript, React, Node.js, Python..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Work Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-24"
                  placeholder="Job title, Company, Duration, Responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Education</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-20"
                  placeholder="Degree, Institution, Year..."
                />
              </div>

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
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-semibold">{result.content.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>{result.content.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p>{result.content.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Summary</p>
                    <p className="text-sm">{result.content.summary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {result.content.skills?.map((skill, i) => (
                        <span key={i} className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Experience</p>
                    <p className="text-sm">{result.content.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Education</p>
                    <p className="text-sm">{result.content.education}</p>
                  </div>
                  

                  <div className="space-y-2">
                    <button
                      onClick={copyToClipboard}
                      className="w-full bg-dark-700 text-white py-2 px-4 rounded-lg hover:bg-dark-600 flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" /> Copy to Clipboard
                    </button>
                    {result?.files?.length > 0 && (
                      <div className="grid grid-cols-1 gap-2">
                        {result.files.map((file) => (
                          <a
                            key={file.type}
                            href={`http://localhost:3001/uploads/${file.path}`}
                            download={file.name}
                            className="w-full bg-primary text-white py-2 px-4 rounded-lg text-center hover:bg-primary-dark flex items-center justify-center gap-2 no-underline"
                          >
                            <Download className="w-4 h-4" />
                            Download {file.type.toUpperCase()} ({file.name})
                          </a>
                        ))}
                      </div>
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

