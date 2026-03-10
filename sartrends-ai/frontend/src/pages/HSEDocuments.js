import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Shield, Loader, AlertTriangle, FileText, ClipboardList } from 'lucide-react';

function HSEDocuments() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [docType, setDocType] = useState('risk-assessment');
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    scope: '',
    hazards: '',
    controls: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [result, setResult] = useState(null);

  const docTypes = [
    { id: 'risk-assessment', name: 'Risk Assessment', price: 20, icon: AlertTriangle },
    { id: 'rams', name: 'RAMS', price: 40, icon: Shield },
    { id: 'jsa', name: 'JSA', price: 30, icon: ClipboardList },
    { id: 'method-statement', name: 'Method Statement', price: 25, icon: FileText },
    { id: 'toolbox-talk', name: 'Toolbox Talk', price: 15, icon: FileText },
    { id: 'incident-report', name: 'Incident Report', price: 20, icon: AlertTriangle },
    { id: 'hse-audit', name: 'HSE Audit Report', price: 50, icon: Shield },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await aiAPI.generateHSE({ type: docType, ...formData });
      setResult(response.data.document);
      if (user.plan === 'free') {
        updateUser({ ...user, generationsLeft: user.generationsLeft - 1 });
      }
    } catch (error) {
      if (error.response?.data?.upgradeRequired) {
        navigate('/payment');
      } else {
        alert(error.response?.data?.message || 'Error generating document');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold mb-2">HSE Documentation Generator</h1>
          <p className="text-gray-400 mb-6">Generate professional HSE documents instantly</p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {docTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setDocType(type.id)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  docType === type.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-dark-600 hover:border-primary/50'
                }`}
              >
                <type.icon className={`w-6 h-6 mx-auto mb-2 ${docType === type.id ? 'text-primary' : 'text-gray-400'}`} />
                <p className="text-xs font-medium">{type.name}</p>
                <p className="text-xs text-primary mt-1">${type.price}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} className="input" placeholder="Project Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="input" placeholder="Location" required />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Scope of Work *</label>
              <textarea name="scope" value={formData.scope} onChange={handleChange} className="input h-24" placeholder="Describe the scope of work..." required />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Identified Hazards</label>
              <textarea name="hazards" value={formData.hazards} onChange={handleChange} className="input h-24" placeholder="List potential hazards..." />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Control Measures</label>
              <textarea name="controls" value={formData.controls} onChange={handleChange} className="input h-24" placeholder="List control measures..." />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
              {loading ? 'Generating...' : `Generate ${docTypes.find(d => d.id === docType)?.name}`}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-dark-800 rounded-xl">
              <h3 className="font-bold mb-4">Generated {docTypes.find(d => d.id === docType)?.name}</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-300">{result.content.content}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HSEDocuments;

