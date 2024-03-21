const express = require('express')
const router = express.Router()
const workersController = require('../controllers/workers.controller')
const jwt = require('jsonwebtoken')

router.use(function (req, res, next) {
    console.log("Request time : " + Date.now())
    next()
})

router.use('/', function (req, res, next) {
    const authHeader = req.headers['authorization']

    if(!authHeader) {
        res.sendStatus(403)
    }

    const token = authHeader.split(' ')[1] || authHeader
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
})

router.get('/', workersController.getWorkers)
router.get('/:workerName', workersController.getWorker)
router.post('/', workersController.addWorker)
router.delete('/', workersController.deleteWorker)
router.patch('/', workersController.updateWorker)

module.exports = router