import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Mail, Loader } from 'lucide-react';

function CoverLetterGenerator() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    manager: '',
    yourName: '',
    yourQualifications: ''
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
      const response = await aiAPI.generateCoverLetter(formData);
      setResult(response.data.document);
      if (user.plan === 'free') {
        updateUser({ ...user, generationsLeft: user.generationsLeft - 1 });
      }
    } catch (error) {
      if (error.response?.data?.upgradeRequired) {
        navigate('/payment');
      } else {
        alert(error.response?.data?.message || 'Error generating cover letter');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold mb-2">Cover Letter Generator</h1>
          <p className="text-gray-400 mb-6">Write compelling cover letters</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                  <input type="text" name="position" value={formData.position} onChange={handleChange} className="input" placeholder="Software Engineer" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="input" placeholder="Tech Corp" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hiring Manager</label>
                  <input type="text" name="manager" value={formData.manager} onChange={handleChange} className="input" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                  <input type="text" name="yourName" value={formData.yourName} onChange={handleChange} className="input" placeholder="Your Name" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Qualifications</label>
                <textarea name="yourQualifications" value={formData.yourQualifications} onChange={handleChange} className="input h-32" placeholder="Your key qualifications..." />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                {loading ? 'Generating...' : 'Generate Cover Letter'}
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-dark-800 rounded-xl">
              <h3 className="font-bold mb-4">Generated Cover Letter</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-300">{result.content.content}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoverLetterGenerator;

