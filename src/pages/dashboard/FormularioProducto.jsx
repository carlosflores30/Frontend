import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

const FormularioProducto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productoEditar = location.state?.producto || null;

  const [producto, setProducto] = useState(
    productoEditar ?? {
      codProducto: '',
      nombre: '',
      descripcion: '',
      stock: '',
      umbral: '',
      precioVenta: '',
      precioCompra: '',
      precioDescuento: '',
      fechaIngreso: new Date().toISOString().split('T')[0],
      idCategoria: ''
    }
  );

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await api.get('/Categories');
        setCategorias(res.data);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name.includes('precio') || name === 'stock' || name === 'umbral' || name === 'idCategoria'
        ? parseFloat(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productoEditar) {
        await api.patch(`/Productos/${productoEditar.id}`, producto);
      } else {
        await api.post('/Productos', producto);
      }
      navigate('/dashboard/productos');
    } catch (err) {
      console.error('Error al guardar producto:', err);
    }
  };

  return (
    <div>
      {/* Encabezado y botón de volver */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{productoEditar ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h2>
        <button
          type="button"
          onClick={() => navigate('/dashboard/productos')}
          className="btn btn-outline-secondary"
        >
          ← Volver al Inventario
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {/* Fila 1 */}
        <div className="row g-3">
          <div className="col-md-4">
            <input className="form-control" name="codProducto" value={producto.codProducto} onChange={handleChange} placeholder="Código" required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre" required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" required />
          </div>
        </div>

        {/* Fila 2 */}
        <div className="row g-3 mt-1">
          <div className="col-md-3">
            <input className="form-control" type="number" name="stock" value={producto.stock} onChange={handleChange} placeholder="Stock" required />
          </div>
          <div className="col-md-3">
            <input className="form-control" type="number" name="umbral" value={producto.umbral} onChange={handleChange} placeholder="Umbral" required />
          </div>
          <div className="col-md-3">
            <input className="form-control" type="number" step="0.01" name="precioVenta" value={producto.precioVenta} onChange={handleChange} placeholder="Precio Venta" required />
          </div>
          <div className="col-md-3">
            <input className="form-control" type="number" step="0.01" name="precioCompra" value={producto.precioCompra} onChange={handleChange} placeholder="Precio Compra" required />
          </div>
        </div>

        {/* Fila 3 */}
        <div className="row g-3 mt-1">
          <div className="col-md-4">
            <input className="form-control" type="number" step="0.01" name="precioDescuento" value={producto.precioDescuento} onChange={handleChange} placeholder="Descuento" />
          </div>
          <div className="col-md-4">
            <input className="form-control" type="date" name="fechaIngreso" value={producto.fechaIngreso} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              name="idCategoria"
              value={producto.idCategoria}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón enviar */}
        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            {productoEditar ? 'Guardar Cambios' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioProducto;
