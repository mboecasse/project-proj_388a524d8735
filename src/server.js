// File: src/server.js
// Generated: 2025-10-08 11:36:44 UTC
// Project ID: proj_388a524d8735
// Task ID: task_fi4tmvyeb80j


const app = require('./app');


const config = require('./config/env');


const logger = require('./utils/logger');


const PORT = config.port;

let server;


function startServer() {
  try {
    server = app.listen(PORT, () => {
      logger.info(`Server started successfully`, {
        port: PORT,
        nodeEnv: config.nodeEnv,
        timestamp: new Date().toISOString()
      });
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use`, {
          error: error.message,
          port: PORT
        });
      } else {
        logger.error('Server error occurred', {
          error: error.message,
          stack: error.stack
        });
      }
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}


function gracefulShutdown(signal) {
  logger.info(`${signal} signal received, starting graceful shutdown`, {
    signal,
    timestamp: new Date().toISOString()
  });

  if (server) {
    server.close((error) => {
      if (error) {
        logger.error('Error during server shutdown', {
          error: error.message,
          stack: error.stack
        });
        process.exit(1);
      }

      logger.info('Server closed successfully', {
        signal,
        timestamp: new Date().toISOString()
      });
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Forced shutdown after timeout', {
        signal,
        timeout: 10000
      });
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', {
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled promise rejection', {
    reason: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : undefined,
    promise: promise,
    timestamp: new Date().toISOString()
  });
  gracefulShutdown('UNHANDLED_REJECTION');
});

startServer();

module.exports = server;
