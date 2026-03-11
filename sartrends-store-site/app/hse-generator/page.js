'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Loader, Copy, FileText } from 'lucide-react'

export default function HSEDocumentsPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    documentType: 'risk-assessment',
    projectName: '',
    scope: '',
    hazards: '',
    controls: ''
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
          type: 'hse', 
          documentType: formData.documentType,
          projectName: formData.projectName,
          scope: formData.scope,
          hazards: formData.hazards.split(',').map(h => h.trim()).filter(h => h),
          controls: formData.controls.split(',').map(c => c.trim()).filter(c => c)
        })
      })
      const data = await response.json()
      setResult(data.document)
    } catch (error) {
      alert('Error generating HSE document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result) {
      const text = `Project: ${result.content.projectName}
Scope: ${result.content.scope}
Date: ${result.content.date}
Hazards: ${result.content.hazards.join(', ')}
Controls: ${result.content.controls.join(', ')}`
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
            HSE Documents <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-gray-400 mb-8">Generate Risk Assessments, RAMS, Method Statements and more</p>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Document Type</label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                >
                  <option value="risk-assessment">Risk Assessment</option>
                  <option value=" rams">RAMS</option>
                  <option value="method-statement">Method Statement</option>
                  <option value="toolbox-talk">Toolbox Talk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Construction Project A"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Scope of Work</label>
                <textarea
                  name="scope"
                  value={formData.scope}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-24"
                  placeholder="Describe the scope of work..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Hazards (comma separated)</label>
                <input
                  type="text"
                  name="hazards"
                  value={formData.hazards}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Fall from height, Electrical shock, Struck by object"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Control Measures (comma separated)</label>
                <input
                  type="text"
                  name="controls"
                  value={formData.controls}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="PPE, Guardrails, Training, Supervision"
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
                    <Shield className="w-5 h-5" /> Generate HSE Document
                  </>
                )}
              </button>
            </form>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Generated Document</h3>
              
              {result ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Document Type</p>
                    <p className="font-semibold">{formData.documentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Project Name</p>
                    <p>{result.content.projectName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Scope</p>
                    <p className="text-sm">{result.content.scope}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hazards</p>
                    <div className="flex flex-wrap gap-2">
                      {result.content.hazards?.map((hazard, i) => (
                        <span key={i} className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                          {hazard}
                        </span>
                      ))}
                    </div>
                  <div>
                    <p className="text-sm text-gray-400">Control Measures</p>
                    <div className="flex flex-wrap gap-2">
                      {result.content.controls?.map((control, i) => (
                        <span key={i} className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                          {control}
                        </span>
                      ))}
                    </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p>{result.content.date}</p>
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
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill the form and click Generate</p>
                </div>
              )}
            </div>
        </motion.div>
      </div>
  )
}
