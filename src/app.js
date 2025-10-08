// File: src/app.js
// Generated: 2025-10-08 11:36:32 UTC
// Project ID: proj_388a524d8735
// Task ID: task_xed7mm9wkw11


const compression = require('compression');


const errorHandler = require('./middleware/errorHandler');


const express = require('express');


const helmet = require('helmet');


const logger = require('./utils/logger');


const rateLimiter = require('./middleware/rateLimiter');


const routes = require('./routes');


const securityMiddleware = require('./middleware/security');


const app = express();

// Trust proxy - required for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(securityMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// HTTP request logging
app.use(logger);

// Rate limiting
app.use(rateLimiter);

// Health check endpoint (before routes, no rate limiting)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    message: 'Service is running'
  });
});

// API routes
app.use('/api', routes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
