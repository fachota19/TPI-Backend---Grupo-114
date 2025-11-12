import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import {
  DashboardPage,
  SolicitudesPage,
  SeguimientoPage,
  ContenedoresPage,
  CamionesPage,
  NotFoundPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Ruta principal - Dashboard */}
          <Route path="/" element={<DashboardPage />} />

          {/* Solicitudes */}
          <Route path="/solicitudes" element={<SolicitudesPage />} />

          {/* Seguimiento */}
          <Route path="/seguimiento" element={<SeguimientoPage />} />

          {/* Contenedores */}
          <Route path="/contenedores" element={<ContenedoresPage />} />

          {/* Camiones */}
          <Route path="/camiones" element={<CamionesPage />} />

          {/* Página 404 */}
          <Route path="/404" element={<NotFoundPage />} />
          
          {/* Redirigir rutas no encontradas */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;