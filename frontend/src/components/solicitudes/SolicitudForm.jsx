import { useState } from 'react';
import Button from '../common/Button';

const SolicitudForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    clienteId: initialData?.clienteId || '',
    contenedorId: initialData?.contenedorId || '',
    tarifaId: initialData?.tarifaId || 1,
    camionId: initialData?.camionId || '',
    origenDireccion: initialData?.origenDireccion || '',
    destinoDireccion: initialData?.destinoDireccion || '',
    fechaCreacion: initialData?.fechaCreacion || new Date().toISOString().split('T')[0],
    costoEstimado: initialData?.costoEstimado || '',
    estadoId: initialData?.estadoId || 1,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cliente ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Cliente *
          </label>
          <input
            type="number"
            name="clienteId"
            value={formData.clienteId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: 1"
          />
        </div>

        {/* Contenedor ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Contenedor *
          </label>
          <input
            type="number"
            name="contenedorId"
            value={formData.contenedorId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: 1"
          />
        </div>

        {/* Camión ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Camión
          </label>
          <input
            type="number"
            name="camionId"
            value={formData.camionId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: 3"
          />
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Creación *
          </label>
          <input
            type="date"
            name="fechaCreacion"
            value={formData.fechaCreacion}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Direcciones */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dirección de Origen *
        </label>
        <input
          type="text"
          name="origenDireccion"
          value={formData.origenDireccion}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: Calle 123, Córdoba"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dirección de Destino *
        </label>
        <input
          type="text"
          name="destinoDireccion"
          value={formData.destinoDireccion}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: Ruta 9 km 500, Rosario"
        />
      </div>

      {/* Costo Estimado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Costo Estimado ($)
        </label>
        <input
          type="number"
          name="costoEstimado"
          value={formData.costoEstimado}
          onChange={handleChange}
          step="0.01"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: 18500.75"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" loading={loading}>
          {initialData ? 'Actualizar' : 'Crear'} Solicitud
        </Button>
      </div>
    </form>
  );
};

export default SolicitudForm;