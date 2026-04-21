// backend/src/server.js
// Server Entry Point

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Start the server
const server = app.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(50));
  console.log('🚀 PDS Backend Server Started Successfully!');
  console.log('='.repeat(50));
  console.log(`📍 Server URL: http://${HOST}:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log('='.repeat(50));
  console.log('');
  console.log('Available Endpoints:');
  console.log(`  - GET  http://${HOST}:${PORT}/`);
  console.log(`  - GET  http://${HOST}:${PORT}/api/health`);
  console.log(`  - POST http://${HOST}:${PORT}/api/auth/login`);
  console.log(`  - POST http://${HOST}:${PORT}/api/auth/register`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('='.repeat(50));
  console.log('');
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('');
    console.error('❌ ERROR: Port is already in use!');
    console.error(`   Port ${PORT} is being used by another application.`);
    console.error('');
    console.error('Solutions:');
    console.error('   1. Stop the other application using this port');
    console.error('   2. Change PORT in your .env file');
    console.error(`   3. Kill the process: netstat -ano | findstr ${PORT}`);
    console.error('');
    process.exit(1);
  } else if (error.code === 'EACCES') {
    console.error('');
    console.error('❌ ERROR: Permission denied!');
    console.error(`   You don't have permission to use port ${PORT}`);
    console.error('   Try using a port number above 1024');
    console.error('');
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});

// Graceful shutdown handlers
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown(signal) {
  console.log('');
  console.log(`\n${signal} signal received: closing HTTP server gracefully`);
  
  server.close(() => {
    console.log('✅ HTTP server closed');
    console.log('👋 Goodbye!');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('⚠️  Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

module.exports = server;