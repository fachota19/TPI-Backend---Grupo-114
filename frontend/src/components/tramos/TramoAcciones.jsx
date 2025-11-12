import { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';

const TramoAcciones = ({ tramo, onIniciar, onFinalizar }) => {
  const [showIniciarModal, setShowIniciarModal] = useState(false);
  const [showFinalizarModal, setShowFinalizarModal] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [fechaFin, setFechaFin] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [loading, setLoading] = useState(false);

  const handleIniciar = async () => {
    setLoading(true);
    try {
      await onIniciar(tramo.id, fechaInicio);
      setShowIniciarModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizar = async () => {
    setLoading(true);
    try {
      await onFinalizar(tramo.id, fechaFin);
      setShowFinalizarModal(false);
    } finally {
      setLoading(false);
    }
  };

  const puedeIniciar = tramo.estado?.nombre === 'PENDIENTE';
  const puedeFinalizar = tramo.estado?.nombre === 'EN_PROCESO';

  return (
    <>
      <div className="flex gap-2">
        {puedeIniciar && (
          <Button
            variant="primary"
            onClick={() => setShowIniciarModal(true)}
          >
            Iniciar Tramo
          </Button>
        )}

        {puedeFinalizar && (
          <Button
            variant="success"
            onClick={() => setShowFinalizarModal(true)}
          >
            Finalizar Tramo
          </Button>
        )}
      </div>

      {/* Modal Iniciar */}
      <Modal
        isOpen={showIniciarModal}
        onClose={() => setShowIniciarModal(false)}
        title="Iniciar Tramo"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowIniciarModal(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleIniciar} loading={loading}>
              Confirmar Inicio
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Estás por iniciar el tramo <strong>#{tramo.orden}</strong>
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha y hora de inicio
            </label>
            <input
              type="datetime-local"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Modal>

      {/* Modal Finalizar */}
      <Modal
        isOpen={showFinalizarModal}
        onClose={() => setShowFinalizarModal(false)}
        title="Finalizar Tramo"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowFinalizarModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="success"
              onClick={handleFinalizar}
              loading={loading}
            >
              Confirmar Finalización
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Estás por finalizar el tramo <strong>#{tramo.orden}</strong>
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha y hora de finalización
            </label>
            <input
              type="datetime-local"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TramoAcciones;