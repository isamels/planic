import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/tasks';

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

const getTasks = () => api.get(`${API_BASE}`);
const createTask = (task) => api.post(`${API_BASE}`, task);
const getTask = (id) => api.get(`${API_BASE}/${id}`);
const editTask = (id, task) => api.put(`${API_BASE}/${id}`, task);
const deleteTask = (id) => api.delete(`${API_BASE}/${id}`);

export { getTasks, createTask, getTask, editTask, deleteTask };