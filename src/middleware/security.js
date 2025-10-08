// File: src/middleware/security.js
// Generated: 2025-10-08 11:36:23 UTC
// Project ID: proj_388a524d8735
// Task ID: task_rcdwmhku5jb3


const config = require('../config/env');


const cors = require('cors');


const helmet = require('helmet');


const logger = require('../utils/logger');


const xss = require('xss-clean');


const configureSecurity = (app) => {
  try {
    // Helmet - Security headers
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      frameguard: {
        action: 'deny',
      },
      noSniff: true,
      xssFilter: true,
    }));

    // CORS configuration
    const corsOptions = {
      origin: (origin, callback) => {
        const allowedOrigins = config.corsOrigins || ['http://localhost:3000'];

        if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
          callback(null, true);
        } else {
          logger.warn('CORS blocked request', { origin });
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400,
    };

    app.use(cors(corsOptions));

    // XSS protection
    app.use(xss());

    // Additional security headers
    app.use((req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.removeHeader('X-Powered-By');
      next();
    });

    logger.info('Security middleware configured successfully');
  } catch (error) {
    logger.error('Failed to configure security middleware', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};


const rateLimitByIP = () => {
  const requests = new Map();
  const WINDOW_MS = 15 * 60 * 1000;
  const MAX_REQUESTS = 100;

  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requests.entries()) {
      if (now - data.resetTime > WINDOW_MS) {
        requests.delete(ip);
      }
    }
  }, 60000);

  return (req, res, next) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const now = Date.now();

      if (!requests.has(ip)) {
        requests.set(ip, {
          count: 1,
          resetTime: now,
        });
        return next();
      }

      const requestData = requests.get(ip);

      if (now - requestData.resetTime > WINDOW_MS) {
        requestData.count = 1;
        requestData.resetTime = now;
        return next();
      }

      if (requestData.count >= MAX_REQUESTS) {
        logger.warn('Rate limit exceeded', {
          ip,
          count: requestData.count,
          path: req.path
        });
        return res.status(429).json({
          success: false,
          error: 'Too many requests, please try again later',
        });
      }

      requestData.count += 1;
      next();
    } catch (error) {
      logger.error('Rate limiting error', {
        error: error.message,
        ip: req.ip
      });
      next();
    }
  };
};


const sanitizeInput = (req, res, next) => {
  try {
    const sanitizeObject = (obj) => {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      const sanitized = Array.isArray(obj) ? [] : {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (typeof value === 'string') {
            sanitized[key] = value
              .replace(/[<>]/g, '')
              .trim();
          } else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value);
          } else {
            sanitized[key] = value;
          }
        }
      }

      return sanitized;
    };

    if (req.body && typeof req.body === 'object') {
      req.body = sanitizeObject(req.body);
    }

    if (req.query && typeof req.query === 'object') {
      req.query = sanitizeObject(req.query);
    }

    if (req.params && typeof req.params === 'object') {
      req.params = sanitizeObject(req.params);
    }

    next();
  } catch (error) {
    logger.error('Input sanitization error', {
      error: error.message,
      path: req.path
    });
    next(error);
  }
};

module.exports = {
  configureSecurity,
  rateLimitByIP,
  sanitizeInput,
};
