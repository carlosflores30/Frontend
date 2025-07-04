import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import logo from '../assets/logo-smartstock.png';

const RegisterBusiness = () => {
  const [ruc, setRuc] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validarRUC = (ruc) => /^\d{11}$/.test(ruc);
  const validarRazonSocial = (text) => text.trim().length >= 3;
  const validarDireccion = (text) => text.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación frontend
    if (!validarRUC(ruc)) {
      setError('El RUC debe tener exactamente 11 dígitos numéricos.');
      return;
    }

    if (!validarRazonSocial(razonSocial)) {
      setError('La razón social debe tener al menos 3 letras.');
      return;
    }

    if (!validarDireccion(direccion)) {
      setError('La dirección no puede estar vacía.');
      return;
    }

    try {
      await api.post('/Negocios', {
  ruc,
  razonSocial,
  direccion
});

      const response = await api.get('/Negocios');
      const negocios = response.data;
  
      const user = JSON.parse(localStorage.getItem('user'));
      const miNegocio = negocios.find(n => n.idUsuario === user.id);
  
      if (miNegocio) {
        user.negocioId = miNegocio.id;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        navigate('/negocio/registrar');
      }

setTimeout(() => {
    navigate('/dashboard');
  }, 500); 


    } catch (err) {
        console.error('❌ Error al registrar negocio:', err.response?.data || err);
      
        if (err.response?.data?.errores && Array.isArray(err.response.data.errores)) {
          setError(err.response.data.errores.join('\n'));
        } else {
          setError('Error al registrar el negocio. Verifica los datos o tu sesión.');
        }
      
        setTimeout(() => setError(''), 6000);
      }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        <div className="text-center mb-4">
          <img src={logo} alt="SmartStock AI" style={{ width: 180 }} />
          <h4 className="fw-bold mt-3">Registra tu Negocio</h4>
          <p className="text-muted">Completa esta información para comenzar a usar la plataforma.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>RUC:</label>
            <input
              type="text"
              className="form-control"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Razón Social:</label>
            <input
              type="text"
              className="form-control"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Dirección:</label>
            <input
              type="text"
              className="form-control"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger text-start" style={{ whiteSpace: 'pre-line' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Registrar Negocio
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterBusiness;
