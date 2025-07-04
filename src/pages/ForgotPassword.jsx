import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-smartstock.png';
import { BsArrowLeft } from 'react-icons/bs';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Auth/forgot-password', { email });
      setMessage('Se ha enviado un enlace para restablecer tu contraseña.');
      setError('');
    } catch (err) {
      setError('No se pudo enviar el correo. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">

        {/* Volver */}
        <button
          onClick={() => navigate('/login')}
          className="btn btn-sm btn-link position-absolute top-0 start-0 m-3"
        >
          <BsArrowLeft size={20} className="me-2" />
          Volver
        </button>

        <div className="text-center mb-4">
          <img src={logo} alt="Logo" style={{ width: 180 }} className="mb-3" />
          <h4 className="fw-bold mb-1">Recuperar contraseña</h4>
          <p className="text-muted">Ingresa tu correo para enviarte instrucciones</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Enviar enlace
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
