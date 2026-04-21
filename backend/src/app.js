// backend/src/app.js
// Main Express Application Configuration

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================

// Enable CORS for frontend communication
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ==========================================
// BASIC ROUTES
// ==========================================

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'PDS Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      cardholders: '/api/cardholders',
      shops: '/api/shops',
      distributions: '/api/distributions',
      notifications: '/api/notifications'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// API ROUTES
// ==========================================

// Authentication routes
app.use('/api/auth', require('./routes/authRoutes'));

// Cardholder routes
app.use('/api/cardholders', require('./routes/cardholderRoutes'));

// Shop Owner routes
app.use('/api/shops', require('./routes/shopOwnerRoutes'));

// Gram Panchayat routes
app.use('/api/panchayat', require('./routes/panchayatRoutes'));

// Distribution routes
app.use('/api/distributions', require('./routes/distributionRoutes'));

// Notification routes
app.use('/api/notifications', require('./routes/notificationRoutes'));

// ==========================================
// ERROR HANDLING MIDDLEWARE
// ==========================================

// 404 Handler - Route not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid or missing token'
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Export the app
module.exports = app;