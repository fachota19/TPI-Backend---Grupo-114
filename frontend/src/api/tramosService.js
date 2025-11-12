import api from './api';

/**
 * Servicio para gestionar tramos de ruta
 */

// Iniciar un tramo
export const iniciarTramo = async (tramoId, fechaHoraInicioReal) => {
  const response = await api.put(`/tramos/${tramoId}/iniciar`, {
    fechaHoraInicioReal
  });
  return response.data;
};

// Finalizar un tramo
export const finalizarTramo = async (tramoId, fechaHoraFinReal) => {
  const response = await api.put(`/tramos/${tramoId}/finalizar`, {
    fechaHoraFinReal
  });
  return response.data;
};

// Obtener tramos de una ruta
export const obtenerTramosPorRuta = async (rutaId) => {
  const response = await api.get(`/tramos/ruta/${rutaId}`);
  return response.data;
};