import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, FileText, Shield, Globe, LogOut, User, CreditCard } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">
              <span className="gradient-text">SAR</span>
              <span className="text-white">Trends AI</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            <Link to="/resume" className="text-gray-300 hover:text-white transition-colors">Resume</Link>
            <Link to="/hse" className="text-gray-300 hover:text-white transition-colors">HSE Docs</Link>
            <Link to="/website" className="text-gray-300 hover:text-white transition-colors">Website</Link>
            <Link to="/documents" className="text-gray-300 hover:text-white transition-colors">My Docs</Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-gray-400">Plan:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user?.plan === 'pro' ? 'bg-primary/20 text-primary' :
                user?.plan === 'business' ? 'bg-green-500/20 text-green-500' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {user?.plan?.toUpperCase() || 'FREE'}
              </span>
            </div>
            
            <Link to="/payment" className="p-2 text-gray-300 hover:text-white">
              <CreditCard className="w-5 h-5" />
            </Link>
            
            <Link to="/profile" className="p-2 text-gray-300 hover:text-white">
              <User className="w-5 h-5" />
            </Link>
            
            <button onClick={handleLogout} className="p-2 text-gray-300 hover:text-red-500">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

