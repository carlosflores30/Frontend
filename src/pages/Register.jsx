import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import logo from '../assets/logo-smartstock.png';
import { BsArrowLeft } from 'react-icons/bs';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleId, setRoleId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/Roles');
        setRoles(response.data);
      } catch (err) {
        console.error('Error al obtener roles:', err);
      }
    };
    fetchRoles();
  }, []);

  // Validadores
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarPassword = (pass) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      setError('El correo electrónico no tiene un formato válido.');
      return;
    }

    if (!validarPassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
      return;
    }

    if (!/^\d{9}$/.test(phone)) {
      setError('El teléfono debe contener exactamente 9 dígitos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await api.post('/Auth/register', {
        firstName,
        lastName,
        email,
        phone,
        password,
        roleId: parseInt(roleId)
      });

      navigate('/login');
    } catch (err) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors.join('\n'));
      } else if (err.response?.data?.errores && Array.isArray(err.response.data.errores)) {
        setError(err.response.data.errores.join('\n'));
      } else {
        setError('Error al registrar usuario.');
      }

      setTimeout(() => setError(''), 7000);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', background: 'linear-gradient(to right, #e4f0ff, #f6faff)' }}
    >
      <div className="card shadow-lg rounded-4 d-flex flex-row flex-wrap p-4 position-relative fade-slide-in" style={{ maxWidth: '950px', width: '100%' }}>
        
        {/* Botón volver */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-sm btn-link position-absolute top-1 start-1 m-3"
        >
          <BsArrowLeft size={20} className="me-2" />
          Volver
        </button>

        {/* Lado izquierdo */}
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center px-4 py-5 d-none d-md-flex"
          style={{
            width: '40%',
            backgroundColor: '#dbeafe',
            borderRadius: '12px',
            color: '#1a1a1a',
            minHeight: '520px'
          }}
        >
          <img src={logo} alt="SmartStock AI" style={{ width: 300, height: 250 }} />
          <h5
            className="mt-4"
            style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: '#1f2937'
            }}
          >
            Crea tu cuenta en SmartStock AI
          </h5>
          <p
            className="px-3"
            style={{
              fontSize: '1.05rem',
              fontWeight: '400',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: '#4b5563'
            }}
          >
            Gestiona tu inventario de forma inteligente.
          </p>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="p-3" style={{ width: '60%' }}>
          <form onSubmit={handleRegister}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Nombre:</label>
                <input className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-2">
                <label>Apellido:</label>
                <input className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            <div className="mb-2">
              <label>Correo:</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="mb-2">
              <label>Teléfono:</label>
              <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="mb-2">
              <label>Rol:</label>
              <select className="form-select" value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
                <option value="">Seleccione un rol</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label>Contraseña:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label>Confirmar contraseña:</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            {error && (
              <div className="alert alert-danger text-start" style={{ whiteSpace: 'pre-line' }}>
                {error}
              </div>
            )}

            <button className="btn btn-primary w-100 mb-3" type="submit">
              Registrarse
            </button>

            <div className="text-center mt-2">
              <p className="text-muted" style={{ fontSize: '14px' }}>
                ¿Ya tienes cuenta?{' '}
                <span
                  onClick={() => navigate('/login')}
                  style={{ color: '#0d6efd', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Inicia sesión
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
