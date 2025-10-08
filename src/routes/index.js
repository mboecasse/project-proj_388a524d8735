// File: src/routes/index.js
// Generated: 2025-10-08 11:36:02 UTC
// Project ID: proj_388a524d8735
// Task ID: task_0qawjdnvh84e


const express = require('express');


const logger = require('../utils/logger');


const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  logger.info('Health check endpoint accessed');
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    },
    message: 'Service is running'
  });
});

// API documentation endpoint
router.get('/', (req, res) => {
  logger.info('API documentation endpoint accessed');
  res.status(200).json({
    success: true,
    data: {
      name: 'Simple REST API',
      version: '1.0.0',
      description: 'Simple REST API for smoke testing',
      endpoints: {
        health: {
          method: 'GET',
          path: '/api/health',
          description: 'Health check endpoint'
        },
        documentation: {
          method: 'GET',
          path: '/api',
          description: 'API documentation'
        }
      }
    },
    message: 'API documentation retrieved successfully'
  });
});

// 404 handler for undefined API routes
router.use((req, res) => {
  logger.warn('Route not found', {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

module.exports = router;
