import { useState, useEffect } from 'react';
import {
  obtenerSolicitudes,
  crearSolicitud,
  eliminarSolicitud,
} from '../api/solicitudesService';
import {
  SolicitudList,
  SolicitudForm,
  Modal,
  Button,
  Card,
} from '../components';

const SolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState('TODAS');

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerSolicitudes();
      setSolicitudes(data);
    } catch (err) {
      setError(err.message || 'Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async (solicitudData) => {
    try {
      await crearSolicitud(solicitudData);
      setShowModal(false);
      cargarSolicitudes();
      // TODO: Mostrar notificación de éxito
      alert('Solicitud creada exitosamente');
    } catch (err) {
      alert('Error al crear la solicitud: ' + err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta solicitud?')) {
      return;
    }

    try {
      await eliminarSolicitud(id);
      cargarSolicitudes();
      alert('Solicitud eliminada exitosamente');
    } catch (err) {
      alert('Error al eliminar la solicitud: ' + err.message);
    }
  };

  const solicitudesFiltradas = solicitudes.filter((s) => {
    if (filtro === 'TODAS') return true;
    return s.estado?.nombre === filtro;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Solicitudes de Transporte
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona todas las solicitudes de traslado de contenedores
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nueva Solicitud
          </Button>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltro('TODAS')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'TODAS'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todas ({solicitudes.length})
            </button>
            <button
              onClick={() => setFiltro('PENDIENTE')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'PENDIENTE'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pendientes (
              {solicitudes.filter((s) => s.estado?.nombre === 'PENDIENTE').length}
              )
            </button>
            <button
              onClick={() => setFiltro('EN_PROCESO')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'EN_PROCESO'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              En Proceso (
              {solicitudes.filter((s) => s.estado?.nombre === 'EN_PROCESO').length}
              )
            </button>
            <button
              onClick={() => setFiltro('COMPLETADO')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'COMPLETADO'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completadas (
              {solicitudes.filter((s) => s.estado?.nombre === 'COMPLETADO').length}
              )
            </button>
          </div>
        </Card>

        {/* Lista de Solicitudes */}
        <SolicitudList
          solicitudes={solicitudesFiltradas}
          loading={loading}
          error={error}
          onDelete={handleEliminar}
          onRetry={cargarSolicitudes}
        />

        {/* Modal Crear Solicitud */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Nueva Solicitud de Transporte"
          size="lg"
        >
          <SolicitudForm
            onSubmit={handleCrear}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SolicitudesPage;