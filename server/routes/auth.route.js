const express = require('express')
const router = express.Router()
const workersController = require('../controllers/auth.controller')

router.post('/',workersController.getToken)

module.exports = router