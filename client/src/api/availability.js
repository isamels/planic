import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/availability';

const api = axios.create({
  baseURL: API_BASE
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getDefaultHours = () => api.get(`${API_BASE}/default-hours`);
const setDefaultHours = (day, hours) => api.post(`${API_BASE}/default-hours`, { day, hours });
const getDateHours = () => api.get(`${API_BASE}/date-hours`);
const setDateHours = (date, hours) => api.post(`${API_BASE}/date-hours`, { date, hours });

export { getDefaultHours, setDefaultHours, getDateHours, setDateHours };