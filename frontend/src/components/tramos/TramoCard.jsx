import Button from '../common/Button';

const TramoCard = ({ tramo, onIniciar, onFinalizar }) => {
  const getEstadoColor = (estado) => {
    const colores = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      EN_PROCESO: 'bg-blue-100 text-blue-800 border-blue-300',
      COMPLETADO: 'bg-green-100 text-green-800 border-green-300',
    };
    return colores[estado] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const puedeIniciar = tramo.estado?.nombre === 'PENDIENTE';
  const puedeFinalizar = tramo.estado?.nombre === 'EN_PROCESO';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Tramo #{tramo.orden}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getEstadoColor(
                tramo.estado?.nombre
              )}`}
            >
              {tramo.estado?.nombre || 'PENDIENTE'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {tramo.tipoTramo?.nombre || 'Tramo de transporte'}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-3 mb-4">
        {/* Distancia y Costo */}
        <div className="grid grid-cols-2 gap-4">
          {tramo.distanciaEstimadaKm && (
            <div>
              <p className="text-xs text-gray-500">Distancia</p>
              <p className="text-sm font-medium text-gray-900">
                {tramo.distanciaEstimadaKm} km
              </p>
            </div>
          )}
          {tramo.costoEstimado && (
            <div>
              <p className="text-xs text-gray-500">Costo Estimado</p>
              <p className="text-sm font-medium text-gray-900">
                ${tramo.costoEstimado.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Tiempos Estimados */}
        {tramo.fechaHoraInicioEstimada && (
          <div>
            <p className="text-xs text-gray-500">Inicio Estimado</p>
            <p className="text-sm text-gray-900">
              {new Date(tramo.fechaHoraInicioEstimada).toLocaleString()}
            </p>
          </div>
        )}

        {tramo.fechaHoraFinEstimada && (
          <div>
            <p className="text-xs text-gray-500">Fin Estimado</p>
            <p className="text-sm text-gray-900">
              {new Date(tramo.fechaHoraFinEstimada).toLocaleString()}
            </p>
          </div>
        )}

        {/* Tiempos Reales */}
        {tramo.fechaHoraInicioReal && (
          <div className="bg-blue-50 p-2 rounded">
            <p className="text-xs text-blue-600">Inicio Real</p>
            <p className="text-sm font-medium text-blue-900">
              {new Date(tramo.fechaHoraInicioReal).toLocaleString()}
            </p>
          </div>
        )}

        {tramo.fechaHoraFinReal && (
          <div className="bg-green-50 p-2 rounded">
            <p className="text-xs text-green-600">Fin Real</p>
            <p className="text-sm font-medium text-green-900">
              {new Date(tramo.fechaHoraFinReal).toLocaleString()}
            </p>
          </div>
        )}

        {/* Camión Asignado */}
        {tramo.camionId && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Camión Asignado</p>
              <p className="text-sm font-medium text-gray-900">
                ID: {tramo.camionId}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {puedeIniciar && onIniciar && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onIniciar(tramo.id)}
            className="flex-1"
          >
            <svg
              className="w-4 h-4 mr-1 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Iniciar Tramo
          </Button>
        )}

        {puedeFinalizar && onFinalizar && (
          <Button
            variant="success"
            size="sm"
            onClick={() => onFinalizar(tramo.id)}
            className="flex-1"
          >
            <svg
              className="w-4 h-4 mr-1 inline"
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
            Finalizar Tramo
          </Button>
        )}
      </div>
    </div>
  );
};

export default TramoCard;