import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export default function PublicRoute() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return null;
  }
  if (user) {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
}