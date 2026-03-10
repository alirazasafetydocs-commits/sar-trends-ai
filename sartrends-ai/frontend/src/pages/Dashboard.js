import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { documentAPI } from '../services/api';
import { FileText, Shield, Globe, Mail, TrendingUp, Clock, ArrowRight } from 'lucide-react';

const tools = [
  { id: 'resume', name: 'ATS Resume', icon: FileText, color: 'from-blue-500 to-cyan-500', link: '/resume' },
  { id: 'cover-letter', name: 'Cover Letter', icon: Mail, color: 'from-purple-500 to-pink-500', link: '/cover-letter' },
  { id: 'hse', name: 'HSE Documents', icon: Shield, color: 'from-green-500 to-emerald-500', link: '/hse' },
  { id: 'website', name: 'Website Builder', icon: Globe, color: 'from-orange-500 to-red-500', link: '/website' },
];

function Dashboard() {
  const { user } = useAuth();
  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentDocs();
  }, []);

  const loadRecentDocs = async () => {
    try {
      const response = await documentAPI.getStats();
      setRecentDocs(response.data.recentDocuments || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>!
          </h1>
          <p className="text-gray-400">Ready to create something amazing today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Generations Left</p>
                <p className="text-3xl font-bold gradient-text">
                  {user?.plan === 'pro' || user?.plan === 'business' ? '∞' : user?.generationsLeft}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Generated</p>
                <p className="text-3xl font-bold gradient-text">{user?.totalGenerations || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Plan</p>
                <p className="text-3xl font-bold gradient-text uppercase">{user?.plan || 'Free'}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.link}
                className="glass-card p-6 group hover:border-primary/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{tool.name}</h3>
                <p className="text-gray-400 text-sm">Create now</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Documents</h2>
            <Link to="/documents" className="text-primary text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="glass-card p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : recentDocs.length > 0 ? (
            <div className="space-y-3">
              {recentDocs.map((doc) => (
                <div key={doc._id} className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-gray-400 text-sm">{doc.type} • {new Date(doc.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No documents yet. Start creating!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

