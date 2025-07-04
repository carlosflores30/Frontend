import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const navigate = useNavigate();

  const obtenerProductos = async () => {
    try {
      const res = await api.get('/Productos');
      setProductos(res.data);
    } catch (err) {
      console.error('❌ Error al obtener productos:', err);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    try {
      await api.delete(`/Productos/${id}`);
      obtenerProductos();
    } catch (err) {
      const mensaje = err.response?.data || '';
      if (
        mensaje.includes('foreign key constraint') ||
        mensaje.includes('detalle_venta') ||
        mensaje.includes('violates foreign key constraint')
      ) {
        alert('⚠️ No puedes eliminar este producto porque ya tiene ventas registradas.');
      } else {
        console.error('❌ Error al eliminar producto:', err);
        alert('❌ Ocurrió un error al eliminar el producto.');
      }
    }
  };
  
  
  const handleEditar = (producto) => {
    setProductoEditando(producto);
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setProductoEditando((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'umbral' ? parseInt(value) : value
    }));
  };
  
  const actualizarProducto = async () => {
    try {
      await api.patch(`/Productos/${productoEditando.id}`, productoEditando);
      setProductoEditando(null);
      obtenerProductos();
    } catch (err) {
      console.error('❌ Error al actualizar producto:', err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📦 Inventario</h2>
        <div className="d-flex gap-2">
    <button onClick={() => navigate('/dashboard/categorias/crear')} className="btn btn-outline-secondary">
      ➕ Nueva Categoría
    </button>
    <button onClick={() => navigate('/dashboard/productos/crear')} className="btn btn-primary">
      ➕ Nuevo Producto
    </button>
  </div>
      </div>

      {/* Tabla de productos */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Umbral</th>
              <th>Precio Venta</th>
              <th>Precio Compra</th>
              <th>Descuento</th>
              <th>Ingreso</th>
              <th>ID Cat</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.codProducto}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.stock}</td>
                <td>{p.umbral}</td>
                <td>S/ {p.precioVenta}</td>
                <td>S/ {p.precioCompra}</td>
                <td>S/ {p.precioDescuento}</td>
                <td>{p.fechaIngreso ? new Date(p.fechaIngreso).toLocaleDateString() : '-'}</td>
                <td>{p.idCategoria}</td>
                <td>
                  <button onClick={() => handleEditar(p)} className="btn btn-sm btn-warning me-2">✏️</button>
                  <button onClick={() => eliminarProducto(p.id)} className="btn btn-sm btn-danger">🗑️</button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center">No hay productos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productoEditando && (
  <div className="modal d-block bg-dark bg-opacity-50">
    <div className="modal-dialog modal-lg">
      <div className="modal-content p-4">
        <h5 className="modal-title mb-3">Editar Producto</h5>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input name="nombre" value={productoEditando.nombre} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Descripción</label>
            <input name="descripcion" value={productoEditando.descripcion} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Stock</label>
            <input name="stock" type="number" value={productoEditando.stock} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Umbral</label>
            <input name="umbral" type="number" value={productoEditando.umbral} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Precio Venta</label>
            <input name="precioVenta" type="number" step="0.01" value={productoEditando.precioVenta} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Precio Compra</label>
            <input name="precioCompra" type="number" step="0.01" value={productoEditando.precioCompra} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Descuento</label>
            <input name="precioDescuento" type="number" step="0.01" value={productoEditando.precioDescuento} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha Ingreso</label>
            <input name="fechaIngreso" type="date" value={productoEditando.fechaIngreso?.split('T')[0]} onChange={handleChangeEdit} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">ID Categoría</label>
            <input name="idCategoria" type="number" value={productoEditando.idCategoria} onChange={handleChangeEdit} className="form-control" />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button onClick={() => setProductoEditando(null)} className="btn btn-secondary">Cancelar</button>
          <button onClick={actualizarProducto} className="btn btn-success">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Productos;
