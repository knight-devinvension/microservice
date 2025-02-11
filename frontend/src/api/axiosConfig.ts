import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
  if (window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/register')) {
    config.baseURL = 'http://localhost:8000';
  } else {
    config.baseURL = 'http://localhost:4000';
  }

  // Attach JWT token
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
