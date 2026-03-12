import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, Users, CreditCard, FileText, Settings, 
  BarChart3, Package, MessageSquare, Palette, Image, Video,
  Menu, LogOut, Check, XCircle, Edit, Trash2, Upload,
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
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
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
              activePage === item.id ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-dark-700 hover:text-white'
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
    </div>
  );
}

// Blog Page with API Integration
function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Resume Tips',
    status: 'Draft',
    readTime: '5 min read',
    image: ''
  });

  const categories = ['Resume Tips', 'HSE', 'AI Technology', 'Career Tips'];

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/blogs/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editingPost) {
        await axios.put(`${API_URL}/blogs/${editingPost._id}`, formData, config);
      } else {
        await axios.post(`${API_URL}/blogs`, formData, config);
      }
      setShowModal(false);
      setEditingPost(null);
      setFormData({ title: '', excerpt: '', category: 'Resume Tips', status: 'Draft', readTime: '5 min read', image: '' });
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      status: post.status,
      readTime: post.readTime || '5 min read',
      image: post.image || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${API_URL}/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <button onClick={() => { setEditingPost(null); setFormData({ title: '', excerpt: '', category: 'Resume Tips', status: 'Draft', readTime: '5 min read', image: '' }); setShowModal(true); }} className="btn-primary flex items-center gap-2">
          <FilePlus className="w-4 h-4" /> New Post
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4"><p className="text-gray-400 text-sm">Total Blogs</p><p className="text-2xl font-bold">{posts.length}</p></div>
        <div className="glass-card p-4"><p className="text-gray-400 text-sm">Published</p><p className="text-2xl font-bold text-green-500">{posts.filter(p => p.status === 'Published').length}</p></div>
        <div className="glass-card p-4"><p className="text-gray-400 text-sm">Drafts</p><p className="text-2xl font-bold text-yellow-500">{posts.filter(p => p.status === 'Draft').length}</p></div>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Views</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-dark-700/50">
                  <td className="px-6 py-4 font-medium">{post.title}</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary">{post.category}</span></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs ${post.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{post.status}</span></td>
                  <td className="px-6 py-4 text-gray-400">{post.views || 0}</td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(post.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(post)} className="p-2 text-gray-400 hover:text-primary"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(post._id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="input" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Excerpt</label>
                  <textarea value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="input h-24" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="input">
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="input">
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">{editingPost ? 'Update' : 'Create'} Post</button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-dark-700 text-white rounded-xl hover:bg-dark-600">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Pages Placeholders

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/users/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/users/toggle-status/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleUpdatePlan = async (userId, plan) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/users/update-plan/${userId}`, 
        { plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-64" 
          />
          <button onClick={fetchUsers} className="btn-primary">Refresh</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-500">
            {users.filter(u => u.isActive).length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Business Plan</p>
          <p className="text-2xl font-bold text-purple-500">
            {users.filter(u => u.plan === 'business').length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Pro Plan</p>
          <p className="text-2xl font-bold text-primary">
            {users.filter(u => u.plan === 'pro').length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Generations</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-dark-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {user.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.plan}
                      onChange={(e) => handleUpdatePlan(user._id, e.target.value)}
                      className="input w-32 text-sm"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="business">Business</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {user.generationsLeft === -1 ? '∞' : user.generationsLeft}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleStatus(user._id)}
                        className={`p-2 rounded-lg ${
                          user.isActive 
                            ? 'text-red-400 hover:bg-red-500/10' 
                            : 'text-green-400 hover:bg-green-500/10'
                        }`}
                      >
                        {user.isActive ? <XCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/payments/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (paymentId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/payments/verify/${paymentId}`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPayments();
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(p => p.status === filter);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Management</h1>
        <div className="flex gap-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-40"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={fetchPayments} className="btn-primary">Refresh</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Total Payments</p>
          <p className="text-2xl font-bold">{payments.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-500">
            {payments.filter(p => p.status === 'pending').length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-500">
            {payments.filter(p => p.status === 'approved').length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-primary">
            ${payments.filter(p => p.status === 'approved').reduce((sum, p) => sum + (p.amount || 0), 0)}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Method</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-dark-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{payment.user?.name || 'Unknown'}</p>
                      <p className="text-sm text-gray-400">{payment.user?.email || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">${payment.amount}</td>
                  <td className="px-6 py-4 text-gray-300">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary">
                      {payment.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      payment.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {formatDate(payment.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    {payment.status === 'pending' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleVerify(payment._id, 'approved')}
                          className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleVerify(payment._id, 'rejected')}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/documents/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Document Management</h1>
        <button onClick={fetchDocuments} className="btn-primary">Refresh</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Total Documents</p>
          <p className="text-2xl font-bold">{documents.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">This Month</p>
          <p className="text-2xl font-bold text-primary">
            {documents.filter(d => new Date(d.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-gray-400 text-sm">Document Types</p>
          <p className="text-2xl font-bold text-secondary">
            {new Set(documents.map(d => d.type)).size}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {documents.slice(0, 50).map((doc) => (
                <tr key={doc._id} className="hover:bg-dark-700/50">
                  <td className="px-6 py-4 font-medium">{doc.title || 'Untitled'}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary">
                      {doc.type || 'Document'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{doc.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {formatDate(doc.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
function TemplatesPage() { return <div className="space-y-6"><h1 className="text-2xl font-bold">Template Management</h1><p className="text-gray-400">Template management features coming soon...</p></div>; }
function AppearancePage() { return <div className="space-y-6"><h1 className="text-2xl font-bold">Website Appearance</h1><p className="text-gray-400">Appearance settings coming soon...</p></div>; }
function AnalyticsPage() { return <div className="space-y-6"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-gray-400">Analytics features coming soon...</p></div>; }
function SettingsPage() { return <div className="space-y-6"><h1 className="text-2xl font-bold">System Settings</h1><p className="text-gray-400">Settings coming soon...</p></div>; }

// Main App Component
function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    if (token && user) {
      setAdminUser(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => { setAdminUser(user); setIsLoggedIn(true); };
  const handleLogout = () => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); setAdminUser(null); setIsLoggedIn(false); };

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

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-dark-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={handleLogout} />
      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-white"><Menu className="w-6 h-6" /></button>
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
        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  );
}

export default App;

