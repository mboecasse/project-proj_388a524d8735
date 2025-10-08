// File: src/controllers/testEntityController.js
// Generated: 2025-10-08 11:36:20 UTC
// Project ID: proj_388a524d8735
// Task ID: task_vkss4vssqp7a


const TestEntity = require('../models/testEntity');


const logger = require('../utils/logger');

const { formatSuccess, formatError } = require('../utils/responseFormatter');

exports.getAll = async (req, res, next) => {
  try {
    logger.info('Fetching all test entities');
    const entities = await TestEntity.findAll();
    logger.info('Successfully retrieved test entities', { count: entities.length });
    res.json(formatSuccess(entities, 'Test entities retrieved successfully'));
  } catch (error) {
    logger.error('Failed to fetch test entities', { error: error.message, stack: error.stack });
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info('Fetching test entity by ID', { id });

    const entity = await TestEntity.findById(id);

    if (!entity) {
      logger.warn('Test entity not found', { id });
      return res.status(404).json(formatError('Test entity not found'));
    }

    logger.info('Successfully retrieved test entity', { id });
    res.json(formatSuccess(entity, 'Test entity retrieved successfully'));
  } catch (error) {
    logger.error('Failed to fetch test entity', { id: req.params.id, error: error.message, stack: error.stack });
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const entityData = req.body;
    logger.info('Creating new test entity', { data: entityData });

    const newEntity = await TestEntity.create(entityData);

    logger.info('Successfully created test entity', { id: newEntity.id });
    res.status(201).json(formatSuccess(newEntity, 'Test entity created successfully'));
  } catch (error) {
    logger.error('Failed to create test entity', { data: req.body, error: error.message, stack: error.stack });
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    logger.info('Updating test entity', { id, data: updateData });

    const updatedEntity = await TestEntity.update(id, updateData);

    if (!updatedEntity) {
      logger.warn('Test entity not found for update', { id });
      return res.status(404).json(formatError('Test entity not found'));
    }

    logger.info('Successfully updated test entity', { id });
    res.json(formatSuccess(updatedEntity, 'Test entity updated successfully'));
  } catch (error) {
    logger.error('Failed to update test entity', { id: req.params.id, data: req.body, error: error.message, stack: error.stack });
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info('Deleting test entity', { id });

    const deleted = await TestEntity.delete(id);

    if (!deleted) {
      logger.warn('Test entity not found for deletion', { id });
      return res.status(404).json(formatError('Test entity not found'));
    }

    logger.info('Successfully deleted test entity', { id });
    res.json(formatSuccess(null, 'Test entity deleted successfully'));
  } catch (error) {
    logger.error('Failed to delete test entity', { id: req.params.id, error: error.message, stack: error.stack });
    next(error);
  }
};
