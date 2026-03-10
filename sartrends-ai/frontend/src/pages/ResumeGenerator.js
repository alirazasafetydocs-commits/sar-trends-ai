import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FileText, Loader } from 'lucide-react';

function ResumeGenerator() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    education: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await aiAPI.generateResume(formData);
      setResult(response.data.document);
      
      // Update user generations if free plan
      if (user.plan === 'free') {
        updateUser({ ...user, generationsLeft: user.generationsLeft - 1 });
      }
    } catch (error) {
      if (error.response?.data?.upgradeRequired) {
        navigate('/payment');
      } else {
        alert(error.response?.data?.message || 'Error generating resume');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold mb-2">ATS Resume Generator</h1>
          <p className="text-gray-400 mb-6">Create professional, ATS-optimized resumes</p>

          {user?.plan === 'free' && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-sm">
                You have <span className="font-bold text-primary">{user?.generationsLeft}</span> generations left.
                <button onClick={() => navigate('/payment')} className="ml-2 text-primary hover:underline">
                  Upgrade to Pro
                </button>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                placeholder="+92 300 1234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className="input h-24"
                placeholder="Brief summary of your professional background..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="input"
                placeholder="JavaScript, React, Node.js, Python..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Work Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input h-32"
                placeholder="Job title, Company, Duration, Responsibilities..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Education</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="input h-24"
                placeholder="Degree, Institution, Year..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
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

          {result && (
            <div className="mt-8 p-6 bg-dark-800 rounded-xl">
              <h3 className="font-bold mb-4">Generated Resume</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {result.content.fullName}</p>
                <p><strong>Email:</strong> {result.content.email}</p>
                <p><strong>Phone:</strong> {result.content.phone}</p>
                <p><strong>Summary:</strong> {result.content.summary}</p>
                <p><strong>Skills:</strong> {result.content.skills?.join(', ')}</p>
              </div>
              <button
                onClick={() => navigate('/documents')}
                className="mt-4 btn-secondary w-full"
              >
                View All Documents
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeGenerator;

