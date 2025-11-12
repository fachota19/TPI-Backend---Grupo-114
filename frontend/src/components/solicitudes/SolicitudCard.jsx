import { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import SolicitudDetalle from './SolicitudDetalle';

const SolicitudCard = ({ solicitud, onDelete }) => {
  const [showDetalle, setShowDetalle] = useState(false);

  const getEstadoColor = (estado) => {
    const colores = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800',
      EN_PROCESO: 'bg-blue-100 text-blue-800',
      COMPLETADO: 'bg-green-100 text-green-800',
      CANCELADO: 'bg-red-100 text-red-800',
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {solicitud.numeroSeguimiento}
            </h3>
            <p className="text-sm text-gray-500">
              Creado: {new Date(solicitud.fechaCreacion).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
              solicitud.estado?.nombre
            )}`}
          >
            {solicitud.estado?.nombre || 'PENDIENTE'}
          </span>
        </div>

        {/* Body */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-green-600 mr-2 mt-0.5"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Origen</p>
              <p className="text-sm text-gray-900">{solicitud.origenDireccion}</p>
            </div>
          </div>

          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mr-2 mt-0.5"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Destino</p>
              <p className="text-sm text-gray-900">{solicitud.destinoDireccion}</p>
            </div>
          </div>

          {solicitud.costoEstimado && (
            <div className="flex items-center pt-2 border-t border-gray-100">
              <svg
                className="w-5 h-5 text-gray-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Costo estimado</p>
                <p className="text-sm font-semibold text-gray-900">
                  ${solicitud.costoEstimado.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetalle(true)}
            className="flex-1"
          >
            Ver detalle
          </Button>
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(solicitud.id)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Modal de Detalle */}
      <Modal
        isOpen={showDetalle}
        onClose={() => setShowDetalle(false)}
        title="Detalle de Solicitud"
        size="lg"
      >
        <SolicitudDetalle solicitud={solicitud} />
      </Modal>
    </>
  );
};

export default SolicitudCard;