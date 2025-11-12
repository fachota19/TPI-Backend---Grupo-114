import TramoCard from './TramoCard';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const TramoList = ({ tramos, loading, error, onIniciar, onFinalizar, onRetry }) => {
  if (loading) {
    return <Loading message="Cargando tramos..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!tramos || tramos.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No hay tramos disponibles
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Esta ruta aún no tiene tramos asignados.
        </p>
      </div>
    );
  }

  // Ordenar tramos por orden
  const tramosOrdenados = [...tramos].sort((a, b) => a.orden - b.orden);

  return (
    <div className="space-y-4">
      {tramosOrdenados.map((tramo) => (
        <TramoCard
          key={tramo.id}
          tramo={tramo}
          onIniciar={onIniciar}
          onFinalizar={onFinalizar}
        />
      ))}
    </div>
  );
};

export default TramoList;