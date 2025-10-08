// File: src/middleware/validator.js
// Generated: 2025-10-08 11:36:02 UTC
// Project ID: proj_388a524d8735
// Task ID: task_jncqhnppgnqx


const logger = require('../utils/logger');

const { validationResult } = require('express-validator');

/**
 * Middleware to validate request using express-validator
 * Checks validation results and returns errors if validation fails
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object|void} Returns error response or calls next()
 */


const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => ({
        field: error.path || error.param,
        message: error.msg,
        value: error.value
      }));

      logger.warn('Validation failed', {
        path: req.path,
        method: req.method,
        errors: errorMessages,
        ip: req.ip
      });

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errorMessages
      });
    }

    next();
  } catch (error) {
    logger.error('Validation middleware error', {
      error: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method
    });
    next(error);
  }
};

/**
 * Creates a validation middleware chain
 * Accepts an array of express-validator validation chains
 *
 * @param {Array} validations - Array of express-validator validation chains
 * @returns {Array} Array of middleware functions
 */


const createValidationChain = (validations) => {
  return [
    ...validations,
    validate
  ];
};

module.exports = {
  validate,
  createValidationChain
};
