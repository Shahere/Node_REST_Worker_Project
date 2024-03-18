const express = require('express')
const router = express.Router()
const workersController = require('../controllers/workers.controller')

router.get('/', workersController.getWorkers)
router.post('/',workersController.addWorker )

module.exports = router