import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token'); 
  const userRole = localStorage.getItem('role'); 

  
  if (!token) {
    return <Navigate to="/login" />;
  }

  
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  
  return children;
};

export default ProtectedRoute;
