import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerSolicitudes } from '../api/solicitudesService';
import { Card, Loading, ErrorMessage } from '../components';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSolicitudes: 0,
    pendientes: 0,
    enProceso: 0,
    completadas: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentSolicitudes, setRecentSolicitudes] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      const solicitudes = await obtenerSolicitudes();
      
      // Calcular estadísticas
      const pendientes = solicitudes.filter(s => s.estado?.nombre === 'PENDIENTE').length;
      const enProceso = solicitudes.filter(s => s.estado?.nombre === 'EN_PROCESO').length;
      const completadas = solicitudes.filter(s => s.estado?.nombre === 'COMPLETADO').length;

      setStats({
        totalSolicitudes: solicitudes.length,
        pendientes,
        enProceso,
        completadas,
      });

      // Últimas 5 solicitudes
      setRecentSolicitudes(solicitudes.slice(0, 5));
    } catch (err) {
      setError(err.message || 'Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading message="Cargando dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <ErrorMessage message={error} onRetry={cargarDatos} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Resumen general del sistema de logística
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Solicitudes */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Solicitudes
                </p>
                <p className="text-3xl font-bold mt-2">
                  {stats.totalSolicitudes}
                </p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          {/* Pendientes */}
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">
                  Pendientes
                </p>
                <p className="text-3xl font-bold mt-2">{stats.pendientes}</p>
              </div>
              <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          {/* En Proceso */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  En Proceso
                </p>
                <p className="text-3xl font-bold mt-2">{stats.enProceso}</p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          {/* Completadas */}
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Completadas
                </p>
                <p className="text-3xl font-bold mt-2">{stats.completadas}</p>
              </div>
              <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Solicitudes Recientes */}
          <div className="lg:col-span-2">
            <Card
              title="Solicitudes Recientes"
              actions={
                <Link
                  to="/solicitudes"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver todas →
                </Link>
              }
            >
              {recentSolicitudes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No hay solicitudes recientes
                </p>
              ) : (
                <div className="space-y-4">
                  {recentSolicitudes.map((solicitud) => (
                    <div
                      key={solicitud.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">
                            {solicitud.numeroSeguimiento}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              solicitud.estado?.nombre === 'PENDIENTE'
                                ? 'bg-yellow-100 text-yellow-800'
                                : solicitud.estado?.nombre === 'EN_PROCESO'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {solicitud.estado?.nombre}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {solicitud.origenDireccion} → {solicitud.destinoDireccion}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          ${solicitud.costoEstimado?.toLocaleString() || 'N/A'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(solicitud.fechaCreacion).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card title="Acciones Rápidas">
              <div className="space-y-3">
                <Link
                  to="/solicitudes"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Nueva Solicitud
                    </p>
                    <p className="text-xs text-gray-600">
                      Crear solicitud de transporte
                    </p>
                  </div>
                </Link>

                <Link
                  to="/seguimiento"
                  className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Seguimiento</p>
                    <p className="text-xs text-gray-600">
                      Rastrear contenedores
                    </p>
                  </div>
                </Link>

                <Link
                  to="/contenedores"
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="bg-green-600 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Contenedores</p>
                    <p className="text-xs text-gray-600">
                      Gestionar contenedores
                    </p>
                  </div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;