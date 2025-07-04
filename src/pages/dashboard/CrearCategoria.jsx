import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const CrearCategoria = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Categories', { nombre });
      navigate('/dashboard/productos'); // Puedes redirigir a categorías si luego haces CRUD completo
    } catch (err) {
      console.error('Error al crear categoría:', err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">➕ Nueva Categoría</h2>
        <button onClick={() => navigate('/dashboard/productos')} className="btn btn-outline-secondary">
          ← Volver al Inventario
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la categoría"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Crear Categoría
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCategoria;
