import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, Users, CreditCard, FileText, Settings, 
  BarChart3, Package, MessageSquare, Palette, Image, Video,
  Menu, X, LogOut, Check, XCircle, Edit, Trash2, Upload,
  TrendingUp, DollarSign, UserCheck, FilePlus, Eye, EyeOff, Lock
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// Login Page Component
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.user.isAdmin) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        onLogin(response.data.user);
      } else {
        setError('Access denied. Admin only.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-primary">SAR</span>
              <span className="text-white">Trends Admin</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="admin@sartrends.store"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-dark-800 rounded-xl">
            <p className="text-sm text-gray-400 text-center">Demo Credentials:</p>
            <p className="text-xs text-gray-500 text-center mt-1">admin@sartrends.store / Admin@123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ activePage, setActivePage, isOpen, setIsOpen, onLogout }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'templates', icon: Package, label: 'Templates' },
    { id: 'blog', icon: MessageSquare, label: 'Blog' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-dark-800 border-r border-dark-700 z-40 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-6 border-b border-dark-700">
        <h1 className="text-xl font-bold">
          <span className="text-primary">SAR</span> Trends Admin
        </h1>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActivePage(item.id); setIsOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activePage === item.id 
                ? 'bg-primary/20 text-primary' 
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

// Dashboard Page
function Dashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'bg-primary' },
    { label: 'Revenue', value: '$12,450', change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Active Subscriptions', value: '456', change: '+5%', icon: UserCheck, color: 'bg-secondary' },
    { label: 'Documents Generated', value: '8,901', change: '+15%', icon: FileText, color: 'bg-accent' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <button className="btn-primary flex items-center gap-2">
          <FilePlus className="w-4 h-4" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-500 text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-400">Pro Plan • ${['19', '49', '19', '35', '49'][i-1]}</p>
                  </div>
                </div>
                <span className="text-green-500 text-sm">Completed</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Registrations</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{['Ahmed Khan', 'Sarah Ali', 'Mike Chen', 'Fatima', 'Ali Raza'][i-1]}</p>
                    <p className="text-sm text-gray-400">{['Free', 'Pro', 'Business', 'Free', 'Pro'][i-1]} Plan</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{['2h ago', '5h ago', '1d ago', '2d ago', '3d ago'][i-1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Users Page
function UsersPage() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Pro', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Sarah Ali', email: 'sarah@example.com', plan: 'Business', status: 'Active', joined: '2024-01-14' },
    { id: 3, name: 'Mike Chen', email: 'mike@example.com', plan: 'Free', status: 'Inactive', joined: '2024-01-13' },
    { id: 4, name: 'Fatima Khan', email: 'fatima@example.com', plan: 'Pro', status: 'Active', joined: '2024-01-12' },
    { id: 5, name: 'Ali Raza', email: 'ali@example.com', plan: 'Business', status: 'Active', joined: '2024-01-11' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-3">
          <input type="text" placeholder="Search users..." className="input w-64" />
          <button className="btn-primary">Export</button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Plan</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Joined</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-dark-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    user.plan === 'Business' ? 'bg-purple-500/20 text-purple-400' :
                    user.plan === 'Pro' ? 'bg-primary/20 text-primary' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-primary"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Payments Page
function PaymentsPage() {
  const payments = [
    { id: 1, user: 'John Doe', amount: 19, method: 'EasyPaisa', plan: 'Pro', status: 'Pending', date: '2024-01-15' },
    { id: 2, user: 'Sarah Ali', amount: 49, method: 'Bank Transfer', plan: 'Business', status: 'Verified', date: '2024-01-14' },
    { id: 3, user: 'Mike Chen', amount: 19, method: 'EasyPaisa', plan: 'Pro', status: 'Pending', date: '2024-01-14' },
    { id: 4, user: 'Fatima', amount: 35, method: 'Bank Transfer', plan: 'Professional', status: 'Verified', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Management</h1>
        <div className="flex gap-3">
          <select className="input w-40">
            <option>All</option>
            <option>Pending</option>
            <option>Verified</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <p className="text-gray-400 mb-2">Pending Payments</p>
          <p className="text-3xl font-bold text-yellow-500">5</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-gray-400 mb-2">This Month Revenue</p>
          <p className="text-3xl font-bold text-green-500">$4,520</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-gray-400 mb-2">Verified Today</p>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-dark-700">
          <h3 className="font-semibold">Pending Payments</h3>
        </div>
        <table className="w-full">
          <thead className="bg-dark-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Method</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Plan</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {payments.filter(p => p.status === 'Pending').map((payment) => (
              <tr key={payment.id} className="hover:bg-dark-700/50">
                <td className="px-6 py-4 font-medium">{payment.user}</td>
                <td className="px-6 py-4">${payment.amount}</td>
                <td className="px-6 py-4 text-gray-400">{payment.method}</td>
                <td className="px-6 py-4">{payment.plan}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg"><Check className="w-4 h-4" /></button>
                    <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><XCircle className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-primary"><Image className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-dark-700">
          <h3 className="font-semibold">Verified Payments</h3>
        </div>
        <table className="w-full">
          <thead className="bg-dark-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Method</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {payments.filter(p => p.status === 'Verified').map((payment) => (
              <tr key={payment.id} className="hover:bg-dark-700/50">
                <td className="px-6 py-4 font-medium">{payment.user}</td>
                <td className="px-6 py-4">${payment.amount}</td>
                <td className="px-6 py-4 text-gray-400">{payment.method}</td>
                <td className="px-6 py-4 text-gray-400">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Templates Page
function TemplatesPage() {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Modern Resume Template', type: 'Resume', downloads: 1234 },
    { id: 2, name: 'Professional Resume', type: 'Resume', downloads: 987 },
    { id: 3, name: 'Risk Assessment Template', type: 'HSE', downloads: 543 },
    { id: 4, name: 'RAMS Document', type: 'HSE', downloads: 421 },
    { id: 5, name: 'Method Statement Template', type: 'HSE', downloads: 312 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Template Management</h1>
        <button className="btn-primary flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Resume Templates</h3>
          <div className="space-y-3">
            {templates.filter(t => t.type === 'Resume').map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>{t.name}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-400 hover:text-primary"><Edit className="w-4 h-4" /></button>
                  <button className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">HSE Templates</h3>
          <div className="space-y-3">
            {templates.filter(t => t.type === 'HSE').map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-secondary" />
                  <span>{t.name}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-400 hover:text-primary"><Edit className="w-4 h-4" /></button>
                  <button className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Blog Page
function BlogPage() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'How to Write ATS Resume', status: 'Published', date: '2024-01-15', views: 1234 },
    { id: 2, title: 'HSE Documentation Best Practices', status: 'Published', date: '2024-01-10', views: 987 },
    { id: 3, title: 'AI in Professional Writing', status: 'Draft', date: '2024-01-08', views: 0 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <button className="btn-primary flex items-center gap-2">
          <FilePlus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Title</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Views</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-dark-700/50">
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    post.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{post.date}</td>
                <td className="px-6 py-4 text-gray-400">{post.views}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-primary"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Appearance Page
function AppearancePage() {
  const [settings, setSettings] = useState({
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    heroTitle: 'AI Powered Professional Tools',
    heroSubtitle: 'Create ATS resumes, HSE documents and websites instantly with AI.',
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Website Appearance</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Color Scheme</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
              <div className="flex gap-3">
                <input type="color" value={settings.primaryColor} className="w-16 h-10 rounded" />
                <input type="text" value={settings.primaryColor} className="input flex-1" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Secondary Color</label>
              <div className="flex gap-3">
                <input type="color" value={settings.secondaryColor} className="w-16 h-10 rounded" />
                <input type="text" value={settings.secondaryColor} className="input flex-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
              <input type="text" value={settings.heroTitle} className="input" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
              <textarea value={settings.heroSubtitle} className="input h-24" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Hero Images</h3>
          <div className="border-2 border-dashed border-dark-600 rounded-xl p-8 text-center">
            <Image className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Drag and drop images here</p>
            <button className="btn-primary mt-2">Upload Images</button>
            <p className="text-xs text-gray-500 mt-2">Images will rotate every 15 seconds</p>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Hero Video</h3>
          <div className="border-2 border-dashed border-dark-600 rounded-xl p-8 text-center">
            <Video className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Upload background video</p>
            <button className="btn-primary mt-2">Upload Video</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}

// Analytics Page
function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <p className="text-gray-400 mb-2">Total Page Views</p>
          <p className="text-3xl font-bold">45,231</p>
          <p className="text-green-500 text-sm mt-2">+12% from last month</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-gray-400 mb-2">Unique Visitors</p>
          <p className="text-3xl font-bold">12,543</p>
          <p className="text-green-500 text-sm mt-2">+8% from last month</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-gray-400 mb-2">Bounce Rate</p>
          <p className="text-3xl font-bold">32%</p>
          <p className="text-red-500 text-sm mt-2">+2% from last month</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-gray-400 mb-2">Avg. Session</p>
          <p className="text-3xl font-bold">4m 32s</p>
          <p className="text-green-500 text-sm mt-2">+15% from last month</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Traffic Overview</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {['/ai-tools', '/hse-documentation', '/pricing', '/services', '/blog'].map((page, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-dark-800 rounded-lg">
                <span>{page}</span>
                <span className="text-primary">{[1234, 987, 765, 543, 321][i]} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Top Countries</h3>
          <div className="space-y-3">
            {['Pakistan', 'United States', 'UK', 'UAE', 'India'].map((country, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-dark-800 rounded-lg">
                <span>{country}</span>
                <span className="text-primary">{[45, 25, 15, 10, 5][i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Page
function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Payment Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">EasyPaisa Number</label>
              <input type="text" defaultValue="+92 345 4837460" className="input" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Bank Account</label>
              <input type="text" defaultValue="77010105779192" className="input" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">API Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">OpenAI API Key</label>
              <input type="password" defaultValue="sk-..." className="input" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">JWT Secret</label>
              <input type="password" defaultValue="your-secret-key" className="input" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Email Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Support Email</label>
              <input type="email" defaultValue="info@sartrends.store" className="input" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">From Name</label>
              <input type="text" defaultValue="SAR Trends" className="input" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Pricing Plans</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-dark-800 rounded-lg">
              <span>Free Plan Generations</span>
              <input type="number" defaultValue="5" className="input w-20 text-center" />
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-800 rounded-lg">
              <span>Pro Plan Price ($)</span>
              <input type="number" defaultValue="19" className="input w-20 text-center" />
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-800 rounded-lg">
              <span>Business Plan Price ($)</span>
              <input type="number" defaultValue="49" className="input w-20 text-center" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Save All Settings</button>
      </div>
    </div>
  );
}

// Documents Page
function DocumentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Document Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold">Resume Generated</h3>
          <p className="text-3xl font-bold mt-2">3,421</p>
        </div>
        <div className="glass-card p-6 text-center">
          <FileText className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="font-semibold">HSE Documents</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="glass-card p-6 text-center">
          <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="font-semibold">Websites Built</h3>
          <p className="text-3xl font-bold mt-2">567</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-dark-700">
          <h3 className="font-semibold">Recent Documents</h3>
        </div>
        <table className="w-full">
          <thead className="bg-dark-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Document</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Type</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {[
              { name: 'Professional Resume - John Doe', type: 'Resume', user: 'john@example.com', date: '2024-01-15' },
              { name: 'Risk Assessment - Construction', type: 'HSE', user: 'ahmed@example.com', date: '2024-01-15' },
              { name: 'Business Website - TechCorp', type: 'Website', user: 'sarah@example.com', date: '2024-01-14' },
              { name: 'RAMS Document', type: 'HSE', user: 'mike@example.com', date: '2024-01-14' },
            ].map((doc, i) => (
              <tr key={i} className="hover:bg-dark-700/50">
                <td className="px-6 py-4 font-medium">{doc.name}</td>
                <td className="px-6 py-4">{doc.type}</td>
                <td className="px-6 py-4 text-gray-400">{doc.user}</td>
                <td className="px-6 py-4 text-gray-400">{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Check for existing admin session
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    if (token && user) {
      setAdminUser(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setAdminUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setIsLoggedIn(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <UsersPage />;
      case 'payments': return <PaymentsPage />;
      case 'documents': return <DocumentsPage />;
      case 'templates': return <TemplatesPage />;
      case 'blog': return <BlogPage />;
      case 'appearance': return <AppearancePage />;
      case 'analytics': return <AnalyticsPage />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={handleLogout} />
      
      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-sm font-bold">{adminUser?.name?.charAt(0) || 'A'}</span>
                </div>
                <span className="text-sm hidden sm:inline">{adminUser?.name || 'Admin'}</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;

