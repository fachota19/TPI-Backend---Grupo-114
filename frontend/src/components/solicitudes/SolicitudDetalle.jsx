const SolicitudDetalle = ({ solicitud }) => {
  return (
    <div className="space-y-6">
      {/* Información General */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Información General
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Número de Seguimiento</p>
            <p className="text-sm font-medium text-gray-900">
              {solicitud.numeroSeguimiento}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Estado</p>
            <p className="text-sm font-medium text-gray-900">
              {solicitud.estado?.nombre || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Fecha de Creación</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(solicitud.fechaCreacion).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Cliente ID</p>
            <p className="text-sm font-medium text-gray-900">
              {solicitud.clienteId}
            </p>
          </div>
        </div>
      </div>

      {/* Ubicaciones */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Ruta de Transporte
        </h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Origen</p>
              <p className="text-sm font-medium text-gray-900">
                {solicitud.origenDireccion}
              </p>
              {solicitud.origenLatitud && solicitud.origenLongitud && (
                <p className="text-xs text-gray-400">
                  {solicitud.origenLatitud}, {solicitud.origenLongitud}
                </p>
              )}
            </div>
          </div>

          <div className="ml-4 border-l-2 border-gray-300 h-8"></div>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
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
              </div>
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Destino</p>
              <p className="text-sm font-medium text-gray-900">
                {solicitud.destinoDireccion}
              </p>
              {solicitud.destinoLatitud && solicitud.destinoLongitud && (
                <p className="text-xs text-gray-400">
                  {solicitud.destinoLatitud}, {solicitud.destinoLongitud}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Costos */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Información de Costos
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {solicitud.costoEstimado && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-600">Costo Estimado</p>
              <p className="text-lg font-bold text-blue-900">
                ${solicitud.costoEstimado.toLocaleString()}
              </p>
            </div>
          )}
          {solicitud.costoReal && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-green-600">Costo Real</p>
              <p className="text-lg font-bold text-green-900">
                ${solicitud.costoReal.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tiempos */}
      {(solicitud.tiempoEstimadoHs || solicitud.tiempoRealHs) && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Información de Tiempos
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {solicitud.tiempoEstimadoHs && (
              <div>
                <p className="text-xs text-gray-500">Tiempo Estimado</p>
                <p className="text-sm font-medium text-gray-900">
                  {solicitud.tiempoEstimadoHs} horas
                </p>
              </div>
            )}
            {solicitud.tiempoRealHs && (
              <div>
                <p className="text-xs text-gray-500">Tiempo Real</p>
                <p className="text-sm font-medium text-gray-900">
                  {solicitud.tiempoRealHs} horas
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recursos Asignados */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Recursos Asignados
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Tarifa ID</p>
            <p className="text-sm font-medium text-gray-900">
              {solicitud.tarifaId || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Contenedor ID</p>
            <p className="text-sm font-medium text-gray-900">
              {solicitud.contenedor?.id || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Camión ID</p>
            <p className="text-sm font-medium text-gray-900">
              {solicitud.camionId || 'No asignado'}
            </p>
          </div>
        </div>
      </div>

      {/* Ruta */}
      {solicitud.ruta && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Información de Ruta
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Ruta ID</p>
                <p className="text-sm font-medium text-gray-900">
                  {solicitud.ruta.id}
                </p>
              </div>
              {solicitud.ruta.tramos && (
                <div>
                  <p className="text-xs text-gray-500">Tramos</p>
                  <p className="text-sm font-medium text-gray-900">
                    {solicitud.ruta.tramos.length} tramo(s)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudDetalle;