// File: src/routes/testEntityRoutes.js
// Generated: 2025-10-08 11:36:08 UTC
// Project ID: proj_388a524d8735
// Task ID: task_kwws09c3i7qk


const express = require('express');


const testEntityController = require('../controllers/testEntityController');

const { validateTestEntity } = require('../middleware/validator');


const router = express.Router();

router.get('/', testEntityController.getAllTestEntities);

router.get('/:id', testEntityController.getTestEntityById);

router.post('/', validateTestEntity, testEntityController.createTestEntity);

router.put('/:id', validateTestEntity, testEntityController.updateTestEntity);

router.delete('/:id', testEntityController.deleteTestEntity);

module.exports = router;
