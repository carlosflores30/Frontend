import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [negocio, setNegocio] = useState(null);
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    const fetchNegocio = async () => {
        try {
          const idNegocio = userData.negocioId;
      
          if (!idNegocio || idNegocio <= 0) {
            console.warn('🟡 Usuario sin negocio asignado');
            return;
          }
      
          const response = await api.get(`/Negocios/${idNegocio}`);
          setNegocio(response.data);
        } catch (error) {
          if (error.response?.status === 404) {
            console.warn('⚠️ No se encontró el negocio con el ID indicado.');
          } else {
            console.error('❌ Error al obtener negocio:', error.response?.data || error.message);
          }
        }
      };      
    fetchNegocio();

    const fetchResumen = async () => {
      try {
        const response = await api.get('/Dashboard/resumen');
        setResumen(response.data);
      } catch (error) {
        console.error('Error al obtener resumen del dashboard:', error);
      }
    };

    fetchResumen();
  }, []);

  const formatFecha = (fechaISO) => {
    if (!fechaISO) return 'Sin datos';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString();
  };

  return (
    <div>
      <h2 className="mb-4 fw-bold">Bienvenido, {user.fullName || 'Usuario'} 👋</h2>

      {negocio && (
        <p className="text-muted">
          Negocio actual: <strong>{negocio.razonSocial}</strong>
        </p>
      )}

      {resumen && (
        <>
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3">
                <h5 className="text-primary">📦 Productos</h5>
                <h2>{resumen.totalProductos}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3">
                <h5 className="text-success">🛒 Ventas Mes</h5>
                <h2>S/ {resumen.ventasTotalesMes.toFixed(2)}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3">
                <h5 className="text-warning">⚠️ Stock Bajo</h5>
                <h2>{resumen.stockBajo}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 text-center p-3">
                <h5 className="text-info">📅 Movimientos Hoy</h5>
                <h2>{resumen.movimientosHoy}</h2>
              </div>
            </div>
          </div>

          {/* Indicadores adicionales (sin nuevos clientes) */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-0 text-center p-3">
                <h6 className="text-dark">🔥 Producto Más Vendido</h6>
                <h5>{resumen.productoMasVendido || 'N/A'}</h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm border-0 text-center p-3">
                <h6 className="text-dark">📥 Último Ingreso Stock</h6>
                <h5>{formatFecha(resumen.ultimoIngresoStock)}</h5>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
