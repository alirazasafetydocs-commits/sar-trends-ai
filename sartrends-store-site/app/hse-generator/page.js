'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Loader, Copy, FileText } from 'lucide-react'

export default function HSEGeneratorPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [documentType, setDocumentType] = useState('risk-assessment')
  const [formData, setFormData] = useState({
    projectName: '',
    scope: '',
    hazards: '',
    controls: '',
    location: '',
    date: ''
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
          documentType,
          ...formData,
          hazards: formData.hazards.split(',').map(h => h.trim()),
          controls: formData.controls.split(',').map(c => c.trim())
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
    if (result && result.content) {
      const text = typeof result.content.generatedContent === 'string' 
        ? result.content.generatedContent 
        : JSON.stringify(result.content.generatedContent, null, 2)
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
            HSE Document <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-gray-400 mb-8">Create professional HSE documents</p>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Document Type *</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                >
                  <option value="risk-assessment">Risk Assessment</option>
                  <option value="RAMS">RAMS (Risk Assessment & Method Statement)</option>
                  <option value="method-statement">Method Statement</option>
                  <option value="toolbox-talk">Toolbox Talk</option>
                  <option value="incident-report">Incident Report</option>
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
                  placeholder="Construction Project Alpha"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Scope of Work *</label>
                <textarea
                  name="scope"
                  value={formData.scope}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-24"
                  placeholder="Describe the scope of work..."
                  required
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
                  placeholder="Working at height, Electrical hazards"
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
                  placeholder="PPE, Guard rails, Training"
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
                    <p className="font-semibold">{result.content?.documentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Project</p>
                    <p>{result.content?.projectName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Content</p>
                    <pre className="whitespace-pre-wrap text-sm bg-dark-800 p-4 rounded-lg mt-2 max-h-64 overflow-y-auto">
                      {result.content?.generatedContent}
                    </pre>
                  </div>
                  

                  <div className="space-y-2">
                    <button
                      onClick={copyToClipboard}
                      className="w-full bg-dark-700 text-white py-2 px-4 rounded-lg hover:bg-dark-600 flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" /> Copy to Clipboard
                    </button>
                    {result && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => downloadFile('pdf')}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                        <button
                          onClick={() => downloadFile('docx')}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download DOCX
                        </button>
                        <button
                          onClick={() => downloadFile('txt')}
                          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2 col-span-2"
                        >
                          <Download className="w-4 h-4" />
                          Download TXT
                        </button>
                      </div>
                    )}
                  </div>

                  {result && (
                    <script>
                      async function downloadFile(type) {
                        try {
                          const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
                          const response = await fetch(`${backendUrl}/api/downloads/${type}/${result._id}`);
                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `hse.${type}`;
                          document.body.appendChild(a);
                          a.click();
                          window.URL.revokeObjectURL(url);
                          document.body.removeChild(a);
                        } catch (error) {
                          alert('Download failed. Backend may not be running.');
                        }
                      }
                    </script>
                  )}

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

