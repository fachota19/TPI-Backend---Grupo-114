import api from './api';

/**
 * Servicio para gestionar contenedores
 */

// Obtener todos los contenedores
export const obtenerContenedores = async () => {
  const response = await api.get('/contenedores');
  return response.data;
};

// Obtener un contenedor por ID
export const obtenerContenedorPorId = async (id) => {
  const response = await api.get(`/contenedores/${id}`);
  return response.data;
};

// Crear un contenedor
export const crearContenedor = async (contenedor) => {
  const response = await api.post('/contenedores', contenedor);
  return response.data;
};

// Eliminar un contenedor
export const eliminarContenedor = async (id) => {
  const response = await api.delete(`/contenedores/${id}`);
  return response.data;
};