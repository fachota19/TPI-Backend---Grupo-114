import { useState } from 'react';
import { obtenerSeguimiento } from '../api/solicitudesService';
import { Card, Button, Loading, ErrorMessage } from '../components';

const SeguimientoPage = () => {
  const [numeroSeguimiento, setNumeroSeguimiento] = useState('');
  const [solicitudId, setSolicitudId] = useState('');
  const [seguimiento, setSeguimiento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuscar = async () => {
    if (!solicitudId) {
      alert('Por favor ingresa un ID de solicitud');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await obtenerSeguimiento(solicitudId);
      setSeguimiento(data);
    } catch (err) {
      setError(err.message || 'Error al obtener el seguimiento');
      setSeguimiento(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Seguimiento de Contenedores
          </h1>
          <p className="text-gray-600 mt-2">
            Rastrea el estado y ubicación de tus contenedores en tiempo real
          </p>
        </div>

        {/* Buscador */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID de Solicitud
              </label>
              <input
                type="number"
                value={solicitudId}
                onChange={(e) => setSolicitudId(e.target.value)}
                placeholder="Ej: 1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleBuscar} className="w-full md:w-auto">
                <svg
                  className="w-5 h-5 mr-2 inline"
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
                Buscar
              </Button>
            </div>
          </div>
        </Card>

        {/* Loading */}
        {loading && <Loading message="Buscando información..." />}

        {/* Error */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleBuscar} />
        )}

        {/* Resultados */}
        {seguimiento && !loading && !error && (
          <div className="space-y-6">
            {/* Info General */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {seguimiento.numeroSeguimiento}
                  </h2>
                  <p className="text-gray-600">
                    Solicitud ID: {seguimiento.id}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    seguimiento.estado === 'PENDIENTE'
                      ? 'bg-yellow-100 text-yellow-800'
                      : seguimiento.estado === 'EN_PROCESO'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {seguimiento.estado}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Origen
                  </h3>
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    <p className="text-gray-900">{seguimiento.origen}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Destino
                  </h3>
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    <p className="text-gray-900">{seguimiento.destino}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Creación
                  </h3>
                  <p className="text-gray-900">
                    {new Date(seguimiento.fechaCreacion).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Costo Estimado
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ${seguimiento.costoEstimado?.toLocaleString() || 'N/A'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Información de Ruta */}
            {seguimiento.rutaId && (
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Información de Ruta
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium mb-1">
                      Ruta ID
                    </p>
                    <p className="text-xl font-bold text-blue-900">
                      {seguimiento.rutaId}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium mb-1">
                      Tramos
                    </p>
                    <p className="text-xl font-bold text-purple-900">
                      {seguimiento.cantidadTramos || 0}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Timeline (si tienes tramos) */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Estado del Envío
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Solicitud Creada
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(seguimiento.fechaCreacion).toLocaleString()}
                    </p>
                  </div>
                </div>

                {seguimiento.estado !== 'PENDIENTE' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM 15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        En Proceso
                      </p>
                      <p className="text-sm text-gray-500">
                        Contenedor en tránsito
                      </p>
                    </div>
                  </div>
                )}

                {seguimiento.estado === 'COMPLETADO' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Entregado
                      </p>
                      <p className="text-sm text-gray-500">
                        Contenedor entregado exitosamente
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Estado vacío */}
        {!seguimiento && !loading && !error && (
          <Card className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Busca una solicitud
            </h3>
            <p className="text-gray-600">
              Ingresa el ID de una solicitud para ver su seguimiento
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SeguimientoPage;