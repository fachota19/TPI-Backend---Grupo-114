import api from './api';

/**
 * Servicio para gestionar usuarios (MS-Usuarios)
 * Nota: Ajustar baseURL cuando conectes con el microservicio de usuarios
 */

const USUARIOS_API = 'http://localhost:8081/api'; // Ajustar según tu configuración

// Obtener todos los clientes
export const obtenerClientes = async () => {
  const response = await api.get(`${USUARIOS_API}/clientes`);
  return response.data;
};

// Obtener un cliente por ID
export const obtenerClientePorId = async (id) => {
  const response = await api.get(`${USUARIOS_API}/clientes/${id}`);
  return response.data;
};

// Crear un cliente
export const crearCliente = async (cliente) => {
  const response = await api.post(`${USUARIOS_API}/clientes`, cliente);
  return response.data;
};

// Obtener todos los transportistas
export const obtenerTransportistas = async () => {
  const response = await api.get(`${USUARIOS_API}/transportistas`);
  return response.data;
};

// Login (cuando integres Keycloak)
export const login = async (credentials) => {
  const response = await api.post(`${USUARIOS_API}/auth/login`, credentials);
  return response.data;
};

// Logout
export const logout = async () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};