// File: src/validators/testEntityValidator.js
// Generated: 2025-10-08 11:36:07 UTC
// Project ID: proj_388a524d8735
// Task ID: task_dswdnz19nxa1


const { body, param, query } = require('express-validator');


const createTestEntityValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage('Name can only contain letters, numbers, spaces, hyphens, and underscores'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'pending'])
    .withMessage('Status must be one of: active, inactive, pending'),

  body('value')
    .optional()
    .isNumeric()
    .withMessage('Value must be a number')
    .isFloat({ min: 0 })
    .withMessage('Value must be a positive number'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags.length > 10) {
        throw new Error('Cannot have more than 10 tags');
      }
      return tags.every(tag => typeof tag === 'string' && tag.length <= 50);
    })
    .withMessage('Each tag must be a string with maximum 50 characters'),

  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object')
];


const updateTestEntityValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .isMongoId()
    .withMessage('Invalid ID format'),

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage('Name can only contain letters, numbers, spaces, hyphens, and underscores'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'pending'])
    .withMessage('Status must be one of: active, inactive, pending'),

  body('value')
    .optional()
    .isNumeric()
    .withMessage('Value must be a number')
    .isFloat({ min: 0 })
    .withMessage('Value must be a positive number'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags.length > 10) {
        throw new Error('Cannot have more than 10 tags');
      }
      return tags.every(tag => typeof tag === 'string' && tag.length <= 50);
    })
    .withMessage('Each tag must be a string with maximum 50 characters'),

  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object')
];


const getTestEntityValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .isMongoId()
    .withMessage('Invalid ID format')
];


const deleteTestEntityValidation = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .isMongoId()
    .withMessage('Invalid ID format')
];


const listTestEntitiesValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),

  query('status')
    .optional()
    .trim()
    .isIn(['active', 'inactive', 'pending'])
    .withMessage('Status must be one of: active, inactive, pending'),

  query('sortBy')
    .optional()
    .trim()
    .isIn(['name', 'createdAt', 'updatedAt', 'value', 'status'])
    .withMessage('Invalid sort field'),

  query('sortOrder')
    .optional()
    .trim()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),

  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query cannot exceed 100 characters')
];

module.exports = {
  createTestEntityValidation,
  updateTestEntityValidation,
  getTestEntityValidation,
  deleteTestEntityValidation,
  listTestEntitiesValidation
};
