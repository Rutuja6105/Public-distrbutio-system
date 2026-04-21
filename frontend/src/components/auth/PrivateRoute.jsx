import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Redirect to appropriate dashboard based on user role
    const dashboardMap = {
      cardholder: '/cardholder-dashboard',
      shopowner: '/shop-owner-dashboard',
      panchayat: '/panchayat-dashboard'
    };
    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  return children;
};

export default PrivateRoute;