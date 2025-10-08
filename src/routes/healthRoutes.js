// File: src/routes/healthRoutes.js
// Generated: 2025-10-08 11:36:04 UTC
// Project ID: proj_388a524d8735
// Task ID: task_g5taxghybvjn


const express = require('express');


const logger = require('../utils/logger');


const router = express.Router();

/**
 * GET /health
 * Basic health check endpoint
 * Returns 200 if service is running
 */
router.get('/', (req, res) => {
  try {
    const healthCheck = {
      success: true,
      data: {
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      },
      message: 'Service is healthy'
    };

    logger.info('Health check performed', {
      status: 'healthy',
      uptime: process.uptime()
    });

    res.status(200).json(healthCheck);
  } catch (error) {
    logger.error('Health check failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(503).json({
      success: false,
      error: 'Service unavailable'
    });
  }
});

/**
 * GET /health/ready
 * Readiness check endpoint
 * Returns 200 if service is ready to accept traffic
 */
router.get('/ready', (req, res) => {
  try {
    const readinessCheck = {
      success: true,
      data: {
        status: 'ready',
        timestamp: new Date().toISOString()
      },
      message: 'Service is ready'
    };

    logger.info('Readiness check performed', { status: 'ready' });

    res.status(200).json(readinessCheck);
  } catch (error) {
    logger.error('Readiness check failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(503).json({
      success: false,
      error: 'Service not ready'
    });
  }
});

/**
 * GET /health/live
 * Liveness check endpoint
 * Returns 200 if service is alive
 */
router.get('/live', (req, res) => {
  try {
    const livenessCheck = {
      success: true,
      data: {
        status: 'alive',
        timestamp: new Date().toISOString()
      },
      message: 'Service is alive'
    };

    logger.info('Liveness check performed', { status: 'alive' });

    res.status(200).json(livenessCheck);
  } catch (error) {
    logger.error('Liveness check failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(503).json({
      success: false,
      error: 'Service not alive'
    });
  }
});

module.exports = router;
