import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smartstockai-api-402647003795.us-central1.run.app/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
