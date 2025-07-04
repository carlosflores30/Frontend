import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import logo from '../assets/logo-smartstock.png';
import { BsArrowLeft } from 'react-icons/bs';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/Auth/login', { email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));

        const user = response.data;
      if (user.negocioId) {
        navigate('/dashboard');
      } else {
        navigate('/negocio/registrar');
      }
    } else {
      setError('No se recibió el token del servidor.');
    }

    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errores
      ) {
        const mensaje = error.response.data.errores[0];
        const horaMatch = mensaje.match(/\d{2}:\d{2}:\d{2}/)?.[0];

        if (horaMatch) {
          const [hh, mm, ss] = horaMatch.split(':').map(Number);
          const ahora = new Date();
          const fechaUTC = new Date(Date.UTC(
            ahora.getUTCFullYear(),
            ahora.getUTCMonth(),
            ahora.getUTCDate(),
            hh, mm, ss
          ));
          const horaLocal = fechaUTC.toLocaleTimeString();
          setError(`Cuenta bloqueada hasta las ${horaLocal} (hora local).`);
        } else {
          setError(mensaje);
        }
      } else {
        setError("Error al iniciar sesión.");
      }

      setTimeout(() => setError(''), 6000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        {/* Botón regresar */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-sm btn-link position-absolute top-0 start-0 m-3"
        >
          <BsArrowLeft size={20} className="me-2" />
          Volver
        </button>

        {/* Logo y encabezado */}
        <div className="d-flex flex-column align-items-center text-center mb-4">
          <img src={logo} alt="SmartStock AI" style={{ width: 180 }} className="mb-3" />
          <h4 className="fw-bold mb-1">Iniciar sesión</h4>
          <p className="text-muted" style={{ fontSize: '14px' }}>
            Accede a tu inventario de forma inteligente.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger mt-2 text-center" role="alert" style={{ whiteSpace: 'pre-line' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
            ¿No tienes cuenta?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{ color: '#0d6efd', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Crear una aquí
            </span>
          </p>
        </div>

        <div className="text-center mb-3">
          <span
            onClick={() => navigate('/forgot-password')}
            style={{ fontSize: '13px', color: '#0d6efd', cursor: 'pointer' }}
          >
            ¿Olvidaste tu contraseña?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
