import api from './api';

/**
 * Servicio para gestionar solicitudes de transporte
 */

// Obtener todas las solicitudes
export const obtenerSolicitudes = async () => {
  const response = await api.get('/solicitudes');
  return response.data;
};

// Obtener una solicitud por ID
export const obtenerSolicitudPorId = async (id) => {
  const response = await api.get(`/solicitudes/${id}`);
  return response.data;
};

// Crear una nueva solicitud
export const crearSolicitud = async (solicitud) => {
  const response = await api.post('/solicitudes', solicitud);
  return response.data;
};

// Obtener seguimiento de una solicitud
export const obtenerSeguimiento = async (id) => {
  const response = await api.get(`/solicitudes/${id}/seguimiento`);
  return response.data;
};

// Asignar ruta a una solicitud
export const asignarRuta = async (solicitudId, rutaId) => {
  const response = await api.put(`/solicitudes/${solicitudId}/ruta/${rutaId}`);
  return response.data;
};

// Eliminar una solicitud
export const eliminarSolicitud = async (id) => {
  const response = await api.delete(`/solicitudes/${id}`);
  return response.data;
};

// Obtener solicitudes por cliente
export const obtenerSolicitudesPorCliente = async (clienteId) => {
  const response = await api.get('/solicitudes', {
    params: { clienteId }
  });
  return response.data;
};