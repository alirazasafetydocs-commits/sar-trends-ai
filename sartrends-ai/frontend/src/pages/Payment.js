import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentAPI } from '../services/api';
import { CreditCard, Loader } from 'lucide-react';

function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    plan: 'pro',
    method: 'easypaisa',
    amount: 19
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await paymentAPI.submit({
        ...formData,
        amount: formData.plan === 'pro' ? 19 : 49,
        transactionId: 'TXN' + Date.now()
      });
      alert('Payment submitted! We will verify within 24 hours.');
    } catch (error) {
      alert('Error submitting payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold mb-2">Upgrade Your Plan</h1>
          <p className="text-gray-400 mb-6">Choose a plan and make payment</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Select Plan</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, plan: 'pro', amount: 19 })}
                    className={`p-4 rounded-xl border-2 transition-all ${formData.plan === 'pro' ? 'border-primary bg-primary/10' : 'border-dark-600'}`}
                  >
                    <p className="font-bold text-lg">Pro</p>
                    <p className="text-2xl font-bold gradient-text">$19<span className="text-sm text-gray-400">/mo</span></p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, plan: 'business', amount: 49 })}
                    className={`p-4 rounded-xl border-2 transition-all ${formData.plan === 'business' ? 'border-primary bg-primary/10' : 'border-dark-600'}`}
                  >
                    <p className="font-bold text-lg">Business</p>
                    <p className="text-2xl font-bold gradient-text">$49<span className="text-sm text-gray-400">/mo</span></p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, method: 'easypaisa' })}
                    className={`p-4 rounded-xl border-2 transition-all ${formData.method === 'easypaisa' ? 'border-primary bg-primary/10' : 'border-dark-600'}`}
                  >
                    <p className="font-bold">EasyPaisa</p>
                    <p className="text-sm text-gray-400">+92 345 4837460</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, method: 'bank' })}
                    className={`p-4 rounded-xl border-2 transition-all ${formData.method === 'bank' ? 'border-primary bg-primary/10' : 'border-dark-600'}`}
                  >
                    <p className="font-bold">Meezan Bank</p>
                    <p className="text-sm text-gray-400">77010105779192</p>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-dark-800 rounded-xl">
                <p className="text-gray-400 mb-2">Payment Details:</p>
                <p className="font-bold text-lg">
                  {formData.method === 'easypaisa' ? 'EasyPaisa: +92 345 4837460' : 'Meezan Bank: 77010105779192'}
                </p>
                <p className="text-sm text-gray-400 mt-2">Amount: ${formData.amount}</p>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                {loading ? 'Submitting...' : 'Confirm Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;

