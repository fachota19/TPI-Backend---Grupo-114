import api from './api';

/**
 * Servicio para gestionar tarifas (MS-Tarifas)
 * Nota: Ajustar baseURL cuando conectes con el microservicio de tarifas
 */

const TARIFAS_API = 'http://localhost:8082/api'; // Ajustar según tu configuración

// Calcular costo de un traslado
export const calcularCosto = async (datos) => {
  const response = await api.post(`${TARIFAS_API}/tarifas/calcular`, datos);
  return response.data;
};

// Obtener todas las tarifas
export const obtenerTarifas = async () => {
  const response = await api.get(`${TARIFAS_API}/tarifas`);
  return response.data;
};

// Obtener tarifa activa
export const obtenerTarifaActiva = async () => {
  const response = await api.get(`${TARIFAS_API}/tarifas/activa`);
  return response.data;
};

// Crear una tarifa
export const crearTarifa = async (tarifa) => {
  const response = await api.post(`${TARIFAS_API}/tarifas`, tarifa);
  return response.data;
};