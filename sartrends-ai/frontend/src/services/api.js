import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  verify: () => api.get('/auth/verify')
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getDocuments: () => api.get('/users/documents'),
  getAllUsers: () => api.get('/users/all'),
  updateUserPlan: (userId, data) => api.put(`/users/update-plan/${userId}`, data),
  toggleUserStatus: (userId) => api.put(`/users/toggle-status/${userId}`)
};

// Document API
export const documentAPI = {
  getAll: (params) => api.get('/documents', { params }),
  getById: (id) => api.get(`/documents/${id}`),
  delete: (id) => api.delete(`/documents/${id}`),
  getStats: () => api.get('/documents/stats/overview')
};

// Payment API
export const paymentAPI = {
  submit: (data) => api.post('/payments/submit', data),
  getMyPayments: () => api.get('/payments/my-payments'),
  getAllPayments: (params) => api.get('/payments/all', { params }),
  verifyPayment: (id, data) => api.put(`/payments/verify/${id}`, data)
};

// AI API
export const aiAPI = {
  generateResume: (data) => api.post('/ai/resume', data),
  generateCoverLetter: (data) => api.post('/ai/cover-letter', data),
  generateHSE: (data) => api.post('/ai/hse', data),
  generateWebsite: (data) => api.post('/ai/website', data)
};

