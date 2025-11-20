import api from './api';

export const obtenerCamiones = async () => {
  const response = await api.get(`/camiones`);
  return response.data;
};

export const obtenerCamionesDisponibles = async () => {
  const response = await api.get(`/camiones/disponibles`);
  return response.data;
};

export const obtenerCamionPorId = async (id) => {
  const response = await api.get(`/camiones/${id}`);
  return response.data;
};

export const crearCamion = async (camion) => {
  const response = await api.post(`/camiones`, camion);
  return response.data;
};

export const actualizarDisponibilidad = async (id, disponible) => {
  const response = await api.put(`/camiones/${id}/disponibilidad`, {
    disponible
  });
  return response.data;
};
