import api from './api';

// Obtener todos los clientes
export const obtenerClientes = async () => {
  const response = await api.get(`/clientes`);
  return response.data;
};

// Obtener un cliente por ID
export const obtenerClientePorId = async (id) => {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
};

// Crear un cliente
export const crearCliente = async (cliente) => {
  const response = await api.post(`/clientes`, cliente);
  return response.data;
};

// Obtener transportistas
export const obtenerTransportistas = async () => {
  const response = await api.get(`/transportistas`);
  return response.data;
};
