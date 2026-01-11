import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://clueso-mern-app-2.onrender.com"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = (data) => api.post("/api/auth/register", data);
export const loginUser = (data) => api.post("/api/auth/login", data);

export const fetchProfile = () => api.get("/api/user/profile");
export const updateProfile = (data) => api.put("/api/user/profile", data);

export const fetchTasks = (params) => api.get("/api/tasks", { params });
export const createTask = (data) => api.post("/api/tasks", data);
export const updateTaskApi = (id, data) => api.put(`/api/tasks/${id}`, data);
export const deleteTaskApi = (id) => api.delete(`/api/tasks/${id}`);

export default api;
