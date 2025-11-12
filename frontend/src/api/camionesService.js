import api from './api';

/**
 * Servicio para gestionar camiones (MS-Camiones)
 * Nota: Ajustar baseURL cuando conectes con el microservicio de camiones
 */

const CAMIONES_API = 'http://localhost:8083/api'; // Ajustar según tu configuración

// Obtener todos los camiones
export const obtenerCamiones = async () => {
  const response = await api.get(`${CAMIONES_API}/camiones`);
  return response.data;
};

// Obtener camiones disponibles
export const obtenerCamionesDisponibles = async () => {
  const response = await api.get(`${CAMIONES_API}/camiones/disponibles`);
  return response.data;
};

// Obtener un camión por ID
export const obtenerCamionPorId = async (id) => {
  const response = await api.get(`${CAMIONES_API}/camiones/${id}`);
  return response.data;
};

// Crear un camión
export const crearCamion = async (camion) => {
  const response = await api.post(`${CAMIONES_API}/camiones`, camion);
  return response.data;
};

// Actualizar disponibilidad de un camión
export const actualizarDisponibilidad = async (id, disponible) => {
  const response = await api.put(`${CAMIONES_API}/camiones/${id}/disponibilidad`, {
    disponible
  });
  return response.data;
};