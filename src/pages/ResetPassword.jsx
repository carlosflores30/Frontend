import { useState } from 'react';
import api from '../api/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo-smartstock.png';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await api.post('/Auth/reset-password', {
        token,
        newPassword
      });
      setSuccess('Contraseña restablecida correctamente.');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Error al restablecer la contraseña. Token inválido o expirado.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" style={{ width: 180 }} className="mb-3" />
          <h4 className="fw-bold">Nueva contraseña</h4>
          <p className="text-muted">Ingresa una nueva contraseña segura</p>
        </div>

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label>Nueva contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirmar contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Restablecer contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
