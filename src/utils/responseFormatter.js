// File: src/utils/responseFormatter.js
// Generated: 2025-10-08 11:36:06 UTC
// Project ID: proj_388a524d8735
// Task ID: task_zkrq7ssilnky

* @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Formatted success response
 */


const success = (data = null, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    data,
    message,
    statusCode
  };
};

/**
 * Format error API response
 * @param {string} error - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {Array} errors - Validation errors array (optional)
 * @returns {Object} Formatted error response
 */


const error = (error = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    error,
    statusCode
  };

  if (errors && Array.isArray(errors) && errors.length > 0) {
    response.errors = errors;
  }

  return response;
};

/**
 * Format paginated response
 * @param {Array} data - Array of items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @param {string} message - Success message
 * @returns {Object} Formatted paginated response
 */


const paginated = (data, page, limit, total, message = 'Success') => {
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    },
    message,
    statusCode: 200
  };
};

/**
 * Format validation error response
 * @param {Array} validationErrors - Array of validation error objects
 * @returns {Object} Formatted validation error response
 */


const validationError = (validationErrors) => {
  const formattedErrors = validationErrors.map(err => ({
    field: err.path || err.param,
    message: err.msg || err.message
  }));

  return {
    success: false,
    error: 'Validation failed',
    errors: formattedErrors,
    statusCode: 400
  };
};

/**
 * Format not found response
 * @param {string} resource - Resource name that was not found
 * @returns {Object} Formatted not found response
 */


const notFound = (resource = 'Resource') => {
  return {
    success: false,
    error: `${resource} not found`,
    statusCode: 404
  };
};

/**
 * Format unauthorized response
 * @param {string} message - Unauthorized message
 * @returns {Object} Formatted unauthorized response
 */


const unauthorized = (message = 'Unauthorized access') => {
  return {
    success: false,
    error: message,
    statusCode: 401
  };
};

/**
 * Format forbidden response
 * @param {string} message - Forbidden message
 * @returns {Object} Formatted forbidden response
 */


const forbidden = (message = 'Access forbidden') => {
  return {
    success: false,
    error: message,
    statusCode: 403
  };
};

/**
 * Send formatted response
 * @param {Object} res - Express response object
 * @param {Object} responseData - Formatted response data
 */


const send = (res, responseData) => {
  const statusCode = responseData.statusCode || 200;
  delete responseData.statusCode;
  res.status(statusCode).json(responseData);
};

module.exports = {
  success,
  error,
  paginated,
  validationError,
  notFound,
  unauthorized,
  forbidden,
  send
};
