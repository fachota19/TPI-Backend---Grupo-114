import axios from "axios";
import keycloak from "./keycloak";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// agrega token automáticamente
api.interceptors.request.use((config) => {
  if (keycloak?.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default api;
