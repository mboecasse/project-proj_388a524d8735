// File: src/middleware/rateLimiter.js
// Generated: 2025-10-08 11:36:02 UTC
// Project ID: proj_388a524d8735
// Task ID: task_jotmbug7lgl6


const logger = require('../utils/logger');


const rateLimit = require('express-rate-limit');


const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000,
    max = 100,
    message = 'Too many requests from this IP, please try again later.',
    standardHeaders = true,
    legacyHeaders = false,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    keyGenerator = (req) => req.ip,
    handler = (req, res) => {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        path: req.path,
        method: req.method,
        userAgent: req.get('user-agent')
      });
      res.status(429).json({
        success: false,
        error: message
      });
    }
  } = options;

  return rateLimit({
    windowMs,
    max,
    message,
    standardHeaders,
    legacyHeaders,
    skipSuccessfulRequests,
    skipFailedRequests,
    keyGenerator,
    handler
  });
};


const strictRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many requests, please slow down.'
});


const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true
});


const apiRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'API rate limit exceeded, please try again later.'
});


const createRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many resources created, please try again later.'
});

module.exports = {
  createRateLimiter,
  strictRateLimiter,
  authRateLimiter,
  apiRateLimiter,
  createRateLimiter
};
