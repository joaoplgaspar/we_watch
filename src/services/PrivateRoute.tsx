import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function PrivateRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;