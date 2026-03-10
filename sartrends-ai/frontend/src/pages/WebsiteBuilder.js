import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Globe, Loader, Palette, Layout, Smartphone, Monitor } from 'lucide-react';

function WebsiteBuilder() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    services: '',
    brandStyle: 'modern',
    colorScheme: 'dark',
    contactEmail: '',
    contactPhone: '',
    address: '',
    websiteType: 'business'
  });
  const [result, setResult] = useState(null);

  const websiteTypes = [
    { id: 'business', name: 'Business Website', price: 50, icon: Building },
    { id: 'professional', name: 'Professional', price: 120, icon: Briefcase },
    { id: 'ecommerce', name: 'E-Commerce', price: 250, icon: ShoppingCart },
  ];

  const brandStyles = [
    { id: 'modern', name: 'Modern', desc: 'Clean, minimal design' },
    { id: 'corporate', name: 'Corporate', desc: 'Professional, trustworthy' },
    { id: 'creative', name: 'Creative', desc: 'Bold, artistic' },
    { id: 'tech', name: 'Tech', desc: 'Innovation-focused' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await aiAPI.generateWebsite(formData);
      setResult(response.data.website);
      if (user.plan === 'free') {
        updateUser({ ...user, generationsLeft: user.generationsLeft - 1 });
      }
    } catch (error) {
      if (error.response?.data?.upgradeRequired) {
        navigate('/payment');
      } else {
        alert(error.response?.data?.message || 'Error generating website');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold mb-2">AI Website Builder</h1>
          <p className="text-gray-400 mb-6">Create a stunning website in minutes</p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s ? 'bg-primary text-white' : 'bg-dark-700 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-primary' : 'bg-dark-700'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Step 1: Business Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Name *</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="input" placeholder="Your Business Name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Industry *</label>
                    <select name="industry" value={formData.industry} onChange={handleChange} className="input" required>
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="construction">Construction</option>
                      <option value="retail">Retail</option>
                      <option value="finance">Finance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Services/Products</label>
                  <textarea name="services" value={formData.services} onChange={handleChange} className="input h-24" placeholder="List your services or products..." />
                </div>

                <button type="button" onClick={() => setStep(2)} className="btn-primary w-full">
                  Next Step
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Step 2: Design Preferences</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Website Type</label>
                  <div className="grid grid-cols-3 gap-4">
                    {websiteTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, websiteType: type.id })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.websiteType === type.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-dark-600'
                        }`}
                      >
                        <p className="font-semibold">{type.name}</p>
                        <p className="text-primary text-sm">${type.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Brand Style</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {brandStyles.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, brandStyle: style.id })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.brandStyle === style.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-dark-600'
                        }`}
                      >
                        <p className="font-semibold">{style.name}</p>
                        <p className="text-xs text-gray-400">{style.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Color Scheme</label>
                  <div className="flex gap-3">
                    {['dark', 'light', 'blue', 'green', 'purple'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, colorScheme: color })}
                        className={`w-12 h-12 rounded-lg border-2 ${
                          formData.colorScheme === color ? 'border-primary' : 'border-dark-600'
                        }`}
                        style={{
                          backgroundColor: 
                            color === 'dark' ? '#0a0a0f' : 
                            color === 'light' ? '#ffffff' :
                            color === 'blue' ? '#3b82f6' :
                            color === 'green' ? '#10b981' : '#8b5cf6'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">
                    Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1">
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Step 3: Contact Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="input" placeholder="contact@business.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="input" placeholder="+92 300 1234567" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} className="input h-20" placeholder="Business address..." />
                </div>

                <div className="p-4 bg-dark-800 rounded-xl">
                  <h4 className="font-semibold mb-2">Website Summary</h4>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p>Business: {formData.businessName}</p>
                    <p>Type: {websiteTypes.find(t => t.id === formData.websiteType)?.name}</p>
                    <p>Style: {formData.brandStyle}</p>
                    <p className="text-primary font-bold mt-2">Price: ${websiteTypes.find(t => t.id === formData.websiteType)?.price}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
                    {loading ? 'Generating...' : 'Build Website'}
                  </button>
                </div>
              </div>
            )}
          </form>

          {result && (
            <div className="mt-8">
              <h3 className="font-bold mb-4">Your Website is Ready!</h3>
              <div className="p-4 bg-dark-800 rounded-xl mb-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-300">{result.html}</pre>
              </div>
              <button className="btn-primary w-full">Download Website</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Building(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>; }
function Briefcase(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>; }
function ShoppingCart(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>; }

export default WebsiteBuilder;

