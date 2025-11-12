import { Link } from 'react-router-dom';
import { Button } from '../components';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <div className="mt-4">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button>
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Ir al Inicio
            </Button>
          </Link>

          <Link to="/solicitudes">
            <Button variant="outline">Ver Solicitudes</Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Enlaces útiles
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Dashboard
            </Link>
            <Link
              to="/solicitudes"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Solicitudes
            </Link>
            <Link
              to="/seguimiento"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Seguimiento
            </Link>
            <Link
              to="/contenedores"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Contenedores
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;