import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/logo-smartstock.png';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Carga usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Manejo de sesión y token expirado
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const [, payload] = token.split('.');
      const { exp } = JSON.parse(atob(payload));
      if (exp * 1000 < Date.now()) {
        localStorage.clear();
        navigate('/login');
        return;
      }
    } catch {
      localStorage.clear();
      navigate('/login');
      return;
    }

    const negocioId = user.negocioId;
    const hasBusiness = Number(negocioId) > 0;

    if (!hasBusiness) {
      navigate('/negocio/registrar');
    }
  }, [user, navigate]);

  // Cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="bg-light shadow p-3" style={{ width: '240px' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" style={{ width: 100 }} />
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink to="/dashboard" className="nav-link">🏠 Inicio</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/dashboard/productos" className="nav-link">📦 Inventario</NavLink>
          </li>
          <li className="nav-item mb-2">
  <NavLink to="/dashboard/categorias" className="nav-link">
    📂 Categorías
  </NavLink>
</li>
          <li className="nav-item mb-2">
            <NavLink to="/dashboard/clientes" className="nav-link">👥 Clientes</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/dashboard/proveedores" className="nav-link">🏪 Proveedores</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/dashboard/ventas" className="nav-link">💰 Ventas</NavLink>
          </li>
          <li className="nav-item mb-2">
  <NavLink to="/dashboard/movimientos" className="nav-link">📅 Movimientos</NavLink>
</li>

          <li className="nav-item mb-2">
            <NavLink to="/dashboard/notificaciones" className="nav-link">🔔 Notificaciones</NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/dashboard/reportes" className="nav-link">📊 Reportes</NavLink>
          </li>
          <li className="nav-item mb-4">
            <NavLink to="/dashboard/configuracion" className="nav-link">⚙️ Configuración</NavLink>
          </li>
        </ul>

        <div className="mt-auto">
          <button onClick={handleLogout} className="btn btn-outline-danger w-100">
            🔓 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-grow-1 p-4 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
