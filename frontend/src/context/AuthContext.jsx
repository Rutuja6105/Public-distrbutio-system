/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Export the context for direct access if needed
export { AuthContext };

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const loading = false;

  const login = async (email, password) => {
    if (!password) {
      throw new Error('Password is required');
    }

    const normalizedEmail = email.toLowerCase();
    let role = 'panchayat';

    if (normalizedEmail.includes('cardholder') || normalizedEmail.includes('beneficiary') || normalizedEmail.includes('benificiary')) {
      role = 'cardholder';
    } else if (normalizedEmail.includes('shop') || normalizedEmail.includes('owner')) {
      role = 'shopowner';
    } else if (normalizedEmail.includes('panchayat') || normalizedEmail.includes('sarpanch')) {
      role = 'panchayat';
    }

    const mockUser = {
      id: '1',
      email,
      name: 'User Name',
      role
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const register = async (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'cardholder'
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
