// File: src/utils/logger.js
// Generated: 2025-10-08 11:36:00 UTC
// Project ID: proj_388a524d8735
// Task ID: task_dnm7bnysne3j


const fs = require('fs');


const morgan = require('morgan');


const path = require('path');

// Ensure logs directory exists


const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create write stream for access logs


const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Custom token for response time in milliseconds
morgan.token('response-time-ms', (req, res) => {
  if (!req._startAt || !res._startAt) {
    return '';
  }
  const ms = (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6;
  return ms.toFixed(3);
});

// Custom token for timestamp
morgan.token('timestamp', () => {
  return new Date().toISOString();
});

// Custom format for detailed logging


const detailedFormat = ':timestamp :method :url :status :response-time-ms ms - :res[content-length] bytes';

// Create logger instance with custom format


const logger = morgan(detailedFormat, {
  stream: accessLogStream
});

// Console logger for development


const consoleLogger = morgan('dev');

// Logger object with methods for different log levels


const loggerUtil = {
  info: (message, meta = {}) => {
    const logEntry = {
      level: 'info',
      timestamp: new Date().toISOString(),
      message,
      ...meta
    };
    const logStream = fs.createWriteStream(
      path.join(logsDir, 'app.log'),
      { flags: 'a' }
    );
    logStream.write(JSON.stringify(logEntry) + '\n');
    logStream.end();
  },

  error: (message, meta = {}) => {
    const logEntry = {
      level: 'error',
      timestamp: new Date().toISOString(),
      message,
      ...meta
    };
    const logStream = fs.createWriteStream(
      path.join(logsDir, 'error.log'),
      { flags: 'a' }
    );
    logStream.write(JSON.stringify(logEntry) + '\n');
    logStream.end();
  },

  warn: (message, meta = {}) => {
    const logEntry = {
      level: 'warn',
      timestamp: new Date().toISOString(),
      message,
      ...meta
    };
    const logStream = fs.createWriteStream(
      path.join(logsDir, 'app.log'),
      { flags: 'a' }
    );
    logStream.write(JSON.stringify(logEntry) + '\n');
    logStream.end();
  },

  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      const logEntry = {
        level: 'debug',
        timestamp: new Date().toISOString(),
        message,
        ...meta
      };
      const logStream = fs.createWriteStream(
        path.join(logsDir, 'debug.log'),
        { flags: 'a' }
      );
      logStream.write(JSON.stringify(logEntry) + '\n');
      logStream.end();
    }
  },

  http: logger,
  httpConsole: consoleLogger
};

module.exports = loggerUtil;
