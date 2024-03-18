const express = require('express')
const router = express.Router()
const workersController = require('../controllers/workers.controller')

router.get('/', workersController.getWorkers)
router.post('/',workersController.addWorker)
router.delete('/', workersController.deleteWorker )
router.patch('/', workersController.updateWorker)

module.exports = router