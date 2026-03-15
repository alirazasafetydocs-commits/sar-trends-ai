'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader, Copy, Download } from 'lucide-react'

export default function CoverLetterPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    manager: '',
    yourName: '',
    yourQualifications: ''
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
        body: JSON.stringify({ type: 'cover-letter', ...formData })
      })
      const data = await response.json()
      setResult(data.document)
    } catch (error) {
      alert('Error generating cover letter. Please try again.')
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

  const handleDownload = (filePath) => {
    const link = document.createElement('a')
    async function downloadFile(type) {
      try {
        const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
        const response = await fetch(`${backendUrl}/api/downloads/${type}/${result._id}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coverletter.${type}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        alert('Download failed. Backend may not be running.');
      }
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
            Cover Letter <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-gray-400 mb-8">Create professional cover letters</p>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Tech Corp"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Hiring Manager Name</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Qualifications</label>
                <textarea
                  name="yourQualifications"
                  value={formData.yourQualifications}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none h-32"
                  placeholder="Describe your qualifications and experience..."
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
                    <Mail className="w-5 h-5" /> Generate Cover Letter
                  </>
                )}
              </button>
            </form>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Generated Cover Letter</h3>
              
              {result ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Position</p>
                    <p className="font-semibold">{result.content?.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Company</p>
                    <p>{result.content?.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Cover Letter</p>
                    <pre className="whitespace-pre-wrap text-sm bg-dark-800 p-4 rounded-lg mt-2">
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
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
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

