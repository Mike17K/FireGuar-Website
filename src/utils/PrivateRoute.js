import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return !!currentUser ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
