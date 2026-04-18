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
    verify: async (phone, role) => {
      // ------ TẠM THỜI BYPASS API ĐỂ TEST GIAO DIỆN ------
      // Giả lập thời gian chờ của mạng
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        token: 'mock-token-' + Date.now(),
        user: {
          id: 'TD-' + Math.floor(Math.random() * 10000),
          phone: phone,
          role: role.toLowerCase()
        }
      };

      /* ----- SAU NÀY MUỐN MỞ LẠI HÃY UNCOMMENT ĐOẠN NÀY -----
      return api.request('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ phone, role })
      });
      */
    },
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
