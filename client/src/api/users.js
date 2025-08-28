import axios from "axios";

const API_BASE = "http://localhost:3000/api/users";

const api = axios.create({
  baseURL: API_BASE
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const signup = (userData) => api.post(`${API_BASE}/signup`, userData);
const login = (userData) => api.post(`${API_BASE}/login`, userData);
const getAccount = () => api.get(`${API_BASE}/account`);
const deleteAccount = () => api.delete(`${API_BASE}/account`);

export { signup, login, getAccount, deleteAccount };