const express = require('express');
const devicesController = require('../controllers/devicesController');

const router = express.Router();

router.get('/', devicesController.getAllDevices);

router.get('/:id', devicesController.getDeviceById);

router.post('/', devicesController.addDevice);

router.delete('/:id', devicesController.deleteDevice);

module.exports = router;