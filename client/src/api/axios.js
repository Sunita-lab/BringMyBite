import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Har request mein token automatically attach ho
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('bringmybite_user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;