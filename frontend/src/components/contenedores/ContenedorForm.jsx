import { useState } from 'react';
import Button from '../common/Button';

const ContenedorForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    pesoKg: initialData?.pesoKg || '',
    volumenM3: initialData?.volumenM3 || '',
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Peso (kg) *
        </label>
        <input
          type="number"
          name="pesoKg"
          value={formData.pesoKg}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: 2500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Volumen (m³) *
        </label>
        <input
          type="number"
          name="volumenM3"
          value={formData.volumenM3}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: 12.5"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" loading={loading}>
          {initialData ? 'Actualizar' : 'Crear'} Contenedor
        </Button>
      </div>
    </form>
  );
};

export default ContenedorForm;