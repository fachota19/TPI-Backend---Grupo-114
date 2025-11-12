import { useState, useEffect } from 'react';
import {
  obtenerContenedores,
  crearContenedor,
  eliminarContenedor,
} from '../api/contenedoresService';
import {
  ContenedorCard,
  ContenedorForm,
  Modal,
  Button,
  Loading,
  ErrorMessage,
  Card,
} from '../components';

const ContenedoresPage = () => {
  const [contenedores, setContenedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargarContenedores();
  }, []);

  const cargarContenedores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerContenedores();
      setContenedores(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los contenedores');
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async (contenedorData) => {
    try {
      await crearContenedor(contenedorData);
      setShowModal(false);
      cargarContenedores();
      alert('Contenedor creado exitosamente');
    } catch (err) {
      alert('Error al crear el contenedor: ' + err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este contenedor?')) {
      return;
    }

    try {
      await eliminarContenedor(id);
      cargarContenedores();
      alert('Contenedor eliminado exitosamente');
    } catch (err) {
      alert('Error al eliminar el contenedor: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading message="Cargando contenedores..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <ErrorMessage message={error} onRetry={cargarContenedores} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Contenedores
            </h1>
            <p className="text-gray-600 mt-2">
              Administra todos los contenedores de transporte
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
            Nuevo Contenedor
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Contenedores
                </p>
                <p className="text-3xl font-bold mt-2">{contenedores.length}</p>
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Peso Total
                </p>
                <p className="text-3xl font-bold mt-2">
                  {contenedores
                    .reduce((sum, c) => sum + (c.pesoKg || 0), 0)
                    .toLocaleString()}{' '}
                  kg
                </p>
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
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Volumen Total
                </p>
                <p className="text-3xl font-bold mt-2">
                  {contenedores
                    .reduce((sum, c) => sum + (c.volumenM3 || 0), 0)
                    .toFixed(2)}{' '}
                  m³
                </p>
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de Contenedores */}
        {contenedores.length === 0 ? (
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay contenedores
            </h3>
            <p className="text-gray-600 mb-4">
              Comienza creando tu primer contenedor
            </p>
            <Button onClick={() => setShowModal(true)}>
              Crear Contenedor
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contenedores.map((contenedor) => (
              <ContenedorCard
                key={contenedor.id}
                contenedor={contenedor}
                onDelete={handleEliminar}
              />
            ))}
          </div>
        )}

        {/* Modal Crear Contenedor */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Nuevo Contenedor"
        >
          <ContenedorForm
            onSubmit={handleCrear}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ContenedoresPage;