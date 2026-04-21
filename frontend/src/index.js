// src/main.jsx or src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import all global CSS files
import './styles/globals.css';
import './styles/components.css';
import './styles/auth.css';
import './styles/dashboard.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);