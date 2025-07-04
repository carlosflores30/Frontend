import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-smartstock.png';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const [, payload] = token.split('.');
        const { exp } = JSON.parse(atob(payload));
        if (exp * 1000 > Date.now()) {
          navigate('/dashboard'); // Redirige si ya está autenticado
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* BARRA SUPERIOR */}
      <div className="container-fluid bg-white py-3 shadow-sm">
        <div className="d-flex justify-content-end gap-2 px-4">
          <button onClick={() => navigate('/login')} className="btn btn-outline-primary">
            Iniciar Sesión
          </button>
          <button onClick={() => navigate('/register')} className="btn btn-outline-success">
            Crear Cuenta
          </button>
        </div>
      </div>

      {/* CUERPO PRINCIPAL */}
      <div className="container py-5 flex-grow-1 d-flex align-items-center">
        <div className="row align-items-center w-100">
          {/* IZQUIERDA: TEXTO */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h1 className="display-4 fw-bold text-primary">
              Bienvenido a SmartStock AI
            </h1>
            <p className="lead text-muted mt-3">
              Plataforma inteligente de gestión de inventarios para pequeñas y
              medianas empresas. Optimiza tu stock, mejora tus ventas y toma
              decisiones con datos en tiempo real.
            </p>

            {/* BOTÓN CENTRAL */}
            <div className="mt-4">
              <button
                onClick={() => navigate('/login')}
                className="btn btn-primary btn-lg px-5 shadow"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>

          {/* DERECHA: LOGO */}
          <div className="col-md-6 text-center">
            <img
              src={logo}
              alt="Logo SmartStock AI"
              className="img-fluid shadow"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN FUNCIONALIDADES */}
      <div className="container mb-5">
        <h3 className="text-center text-dark mb-4">
          ¿Qué puedes hacer con SmartStock AI?
        </h3>
        <div className="row g-4">
          {[
            {
              icon: "📦",
              title: "Gestión de Inventario",
              desc: "Controla tu stock en tiempo real y recibe alertas inteligentes.",
            },
            {
              icon: "📊",
              title: "Reportes y Métricas",
              desc: "Visualiza estadísticas clave para tomar mejores decisiones.",
            },
            {
              icon: "🤖",
              title: "IA Predictiva",
              desc: "Anticipa la demanda de productos con inteligencia artificial.",
            },
            {
              icon: "🛒",
              title: "Ventas y Compras",
              desc: "Gestiona tus procesos de venta y abastecimiento fácilmente.",
            },
          ].map(({ icon, title, desc }) => (
            <div className="col-md-6 col-lg-3" key={title}>
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body">
                  <div className="fs-1">{icon}</div>
                  <h5 className="card-title mt-2">{title}</h5>
                  <p className="card-text text-muted">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
