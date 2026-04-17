const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = IS_LOCAL ? 'http://localhost:3000/api' : `${window.location.origin}/api`;

const api = {
  getSocketUrl: () => IS_LOCAL ? 'http://localhost:3000' : window.location.origin,
  getToken: () => localStorage.getItem('thodung_token'),
  setToken: (token) => localStorage.setItem('thodung_token', token),
  
  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers }
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'API Error');
    }
    return res.json();
  },

  auth: {
    verify: (phone, role) => api.request('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, role })
    }),
  },

  user: {
    getProfile: () => api.request('/user/profile'),
  },

  data: {
    getHome: () => api.request('/data/home'),
  },

  orders: {
    getAll: () => api.request('/orders'),
    create: (data) => api.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
};

window.api = api;
