import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editando, setEditando] = useState(null);

  const obtenerCategorias = async () => {
    try {
      const res = await api.get('/Categories');
      setCategorias(res.data);
    } catch (err) {
      console.error('Error al obtener categorías:', err);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleCrear = async () => {
    if (!nombre.trim()) return;
    try {
      await api.post('/Categories', { nombre });
      setNombre('');
      obtenerCategorias();
    } catch (err) {
      console.error('Error al crear categoría:', err);
    }
  };

  const handleEditar = async () => {
    if (!nombre.trim()) return;
    try {
      await api.patch(`/Categories/${editando.id}`, { nombre });
      setEditando(null);
      setNombre('');
      obtenerCategorias();
    } catch (err) {
      console.error('Error al actualizar categoría:', err);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      await api.delete(`/Categories/${id}`);
      obtenerCategorias();
    } catch (err) {
      const msg = err.response?.data || '';
      if (
        msg.includes('foreign key') ||
        msg.includes('productos') ||
        msg.includes('violates foreign key constraint')
      ) {
        alert('⚠️ No se puede eliminar esta categoría porque tiene productos asociados.');
      } else {
        alert('❌ Error al eliminar categoría.');
        console.error(err);
      }
    }
  };
  

  return (
    <div>
      <h2 className="fw-bold mb-4">📂 Categorías</h2>

      <div className="d-flex mb-3 gap-2">
        <input
          className="form-control"
          placeholder="Nombre de categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button
          onClick={editando ? handleEditar : handleCrear}
          className={`btn ${editando ? 'btn-warning' : 'btn-primary'}`}
        >
          {editando ? 'Guardar Cambios' : 'Crear'}
        </button>
        {editando && (
          <button
            onClick={() => {
              setEditando(null);
              setNombre('');
            }}
            className="btn btn-outline-secondary"
          >
            Cancelar
          </button>
        )}
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th style={{ width: '140px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No hay categorías registradas.</td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.nombre}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditando(cat);
                      setNombre(cat.nombre);
                    }}
                    className="btn btn-sm btn-warning me-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(cat.id)}
                    className="btn btn-sm btn-danger"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categorias;
