import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CardholderDashboardPage from './pages/CardholderDashboardPage';
import ShopOwnerDashboardPage from './pages/ShopOwnerDashboardPage';
import PanchayatDashboardPage from './pages/PanchayatDashboardPage';
import './styles/globals.css';
import './styles/auth.css';
import './styles/components.css';
import './styles/dashboard.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route
                path="/cardholder-dashboard"
                element={
                  <PrivateRoute role="cardholder">
                    <CardholderDashboardPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/shop-owner-dashboard"
                element={
                  <PrivateRoute role="shopowner">
                    <ShopOwnerDashboardPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/panchayat-dashboard"
                element={
                  <PrivateRoute role="panchayat">
                    <PanchayatDashboardPage />
                  </PrivateRoute>
                }
              />
              
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
