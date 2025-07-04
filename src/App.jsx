import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './pages/Dashboard';
import RegisterBusiness from './pages/RegisterBusiness';
import PrivateRoute from './components/PrivateRoute';
import Clientes from './pages/dashboard/Clientes';
import Productos from './pages/dashboard/Productos';
import Proveedores from './pages/dashboard/Proveedores';
import Ventas from './pages/dashboard/Ventas';
import Notificaciones from './pages/dashboard/Notificaciones';
import Reportes from './pages/dashboard/Reportes';
import Configuracion from './pages/dashboard/Configuracion';
import MovimientosInventario from './pages/dashboard/MovimientosInventario';
import FormularioProducto from './pages/dashboard/FormularioProducto';
import CrearCategoria from './pages/dashboard/CrearCategoria';
import Categorias from './pages/dashboard/Categorias';

const App = () => {
  return (
      <Routes>
        {/* 🌐 Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Rutas protegidas */}
        <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
        >
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route path="categorias/crear" element={<CrearCategoria />} />
          <Route path="productos/crear" element={<FormularioProducto />} />
          <Route path="productos/editar" element={<FormularioProducto />} />
          <Route path="movimientos" element={<MovimientosInventario />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="categorias" element={<Categorias />} />
        </Route>

        <Route
            path="/negocio/registrar"
            element={
              <PrivateRoute>
                <RegisterBusiness />
              </PrivateRoute>
            }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default App;
