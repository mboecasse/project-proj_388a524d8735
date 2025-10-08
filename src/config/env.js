// File: src/config/env.js
// Generated: 2025-10-08 11:36:02 UTC
// Project ID: proj_388a524d8735
// Task ID: task_bwkwvr2ifzyi


const dotenv = require('dotenv');


const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Environment configuration object
 * Validates and provides access to environment variables
 */


const env = {
  // Application
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  HOST: process.env.HOST || '0.0.0.0',

  // API
  API_VERSION: process.env.API_VERSION || 'v1',
  API_PREFIX: process.env.API_PREFIX || '/api',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FORMAT: process.env.LOG_FORMAT || 'combined',

  // Security
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,

  // Helper methods
  isDevelopment() {
    return this.NODE_ENV === 'development';
  },

  isProduction() {
    return this.NODE_ENV === 'production';
  },

  isTest() {
    return this.NODE_ENV === 'test';
  },

  /**
   * Validates required environment variables
   * @throws {Error} If required variables are missing
   */
  validate() {
    const required = ['NODE_ENV', 'PORT'];
    const missing = [];

    for (const key of required) {
      if (!this[key]) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Validate PORT is a valid number
    if (isNaN(this.PORT) || this.PORT < 1 || this.PORT > 65535) {
      throw new Error('PORT must be a valid number between 1 and 65535');
    }

    // Validate NODE_ENV
    const validEnvironments = ['development', 'production', 'test'];
    if (!validEnvironments.includes(this.NODE_ENV)) {
      throw new Error(`NODE_ENV must be one of: ${validEnvironments.join(', ')}`);
    }

    // Validate LOG_LEVEL
    const validLogLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
    if (!validLogLevels.includes(this.LOG_LEVEL)) {
      throw new Error(`LOG_LEVEL must be one of: ${validLogLevels.join(', ')}`);
    }

    return true;
  },

  /**
   * Gets all configuration as object
   * @returns {Object} Configuration object
   */
  getAll() {
    return {
      NODE_ENV: this.NODE_ENV,
      PORT: this.PORT,
      HOST: this.HOST,
      API_VERSION: this.API_VERSION,
      API_PREFIX: this.API_PREFIX,
      LOG_LEVEL: this.LOG_LEVEL,
      LOG_FORMAT: this.LOG_FORMAT,
      CORS_ORIGIN: this.CORS_ORIGIN,
      RATE_LIMIT_WINDOW_MS: this.RATE_LIMIT_WINDOW_MS,
      RATE_LIMIT_MAX_REQUESTS: this.RATE_LIMIT_MAX_REQUESTS
    };
  }
};

// Validate configuration on load
try {
  env.validate();
} catch (error) {
  console.error('Environment configuration validation failed:', error.message);
  process.exit(1);
}

module.exports = env;
