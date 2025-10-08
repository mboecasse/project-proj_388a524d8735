// File: src/controllers/healthController.js
// Generated: 2025-10-08 11:36:21 UTC
// Project ID: proj_388a524d8735
// Task ID: task_i03c5v2fd9va


const logger = require('../utils/logger');

const { formatSuccess } = require('../utils/responseFormatter');

/**
 * Health check endpoint
 * Returns basic health status of the application
 * @route GET /health
 */
exports.healthCheck = async (req, res, next) => {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    };

    logger.info('Health check performed', {
      ip: req.ip,
      userAgent: req.get('user-agent')
    });

    res.status(200).json(formatSuccess(healthData, 'Service is healthy'));
  } catch (error) {
    logger.error('Health check failed', {
      error: error.message,
      stack: error.stack
    });
    next(error);
  }
};

/**
 * Detailed health check endpoint
 * Returns comprehensive health information including memory and system stats
 * @route GET /health/detailed
 */
exports.detailedHealthCheck = async (req, res, next) => {
  try {
    const memoryUsage = process.memoryUsage();

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        pid: process.pid,
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
        }
      }
    };

    logger.info('Detailed health check performed', {
      ip: req.ip,
      userAgent: req.get('user-agent')
    });

    res.status(200).json(formatSuccess(healthData, 'Detailed health information retrieved'));
  } catch (error) {
    logger.error('Detailed health check failed', {
      error: error.message,
      stack: error.stack
    });
    next(error);
  }
};

/**
 * Readiness probe endpoint
 * Checks if the application is ready to accept traffic
 * @route GET /health/ready
 */
exports.readinessCheck = async (req, res, next) => {
  try {
    const isReady = true;

    const readinessData = {
      ready: isReady,
      timestamp: new Date().toISOString(),
      checks: {
        server: 'ok'
      }
    };

    if (isReady) {
      logger.debug('Readiness check passed', { ip: req.ip });
      res.status(200).json(formatSuccess(readinessData, 'Service is ready'));
    } else {
      logger.warn('Readiness check failed', { ip: req.ip });
      res.status(503).json({
        success: false,
        error: 'Service not ready',
        data: readinessData
      });
    }
  } catch (error) {
    logger.error('Readiness check error', {
      error: error.message,
      stack: error.stack
    });
    next(error);
  }
};

/**
 * Liveness probe endpoint
 * Checks if the application is alive and should not be restarted
 * @route GET /health/live
 */
exports.livenessCheck = async (req, res, next) => {
  try {
    const livenessData = {
      alive: true,
      timestamp: new Date().toISOString(),
      pid: process.pid
    };

    logger.debug('Liveness check passed', { ip: req.ip });
    res.status(200).json(formatSuccess(livenessData, 'Service is alive'));
  } catch (error) {
    logger.error('Liveness check error', {
      error: error.message,
      stack: error.stack
    });
    next(error);
  }
};
