import api from './api';

/**
 * Servicio para gestionar rutas de transporte
 */

// Obtener ruta de una solicitud
export const obtenerRutaPorSolicitud = async (solicitudId) => {
  const response = await api.get(`/rutas/solicitud/${solicitudId}`);
  return response.data;
};

// Crear una ruta
export const crearRuta = async (ruta) => {
  const response = await api.post('/rutas', ruta);
  return response.data;
};