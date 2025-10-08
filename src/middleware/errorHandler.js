// File: src/middleware/errorHandler.js
// Generated: 2025-10-08 11:36:08 UTC
// Project ID: proj_388a524d8735
// Task ID: task_iu6innpm2231


const logger = require('../utils/logger');


const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error('Error occurred', {
    message: err.message,
    stack: err.stack,
    statusCode,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userId: req.user?.id,
    timestamp: new Date().toISOString()
  });

  const errorResponse = {
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : message
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
    errorResponse.details = err.details || null;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
