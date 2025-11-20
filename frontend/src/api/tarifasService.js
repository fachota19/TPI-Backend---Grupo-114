import api from './api';

// Calcular costo de un traslado
export const calcularCosto = async (datos) => {
  const response = await api.post(`/tarifas/calcular`, datos);
  return response.data;
};

// Obtener todas las tarifas
export const obtenerTarifas = async () => {
  const response = await api.get(`/tarifas`);
  return response.data;
};

// Obtener tarifa activa
export const obtenerTarifaActiva = async () => {
  const response = await api.get(`/tarifas/activa`);
  return response.data;
};

// Crear tarifa
export const crearTarifa = async (tarifa) => {
  const response = await api.post(`/tarifas`, tarifa);
  return response.data;
};
