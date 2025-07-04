import { FaHome, FaBell, FaChartBar, FaCog, FaBoxes, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-light border-end p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="text-center mb-4">Mi Cuenta</h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link"><FaHome /> Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/productos" className="nav-link"><FaBoxes /> Productos</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/movimientos" className="nav-link"><FaFileAlt /> Movimientos</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/reportes" className="nav-link"><FaChartBar /> Reportes</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/notificaciones" className="nav-link"><FaBell /> Notificaciones</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/configuracion" className="nav-link"><FaCog /> Configuración</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
