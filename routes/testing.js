const express = require('express')
const testingController = require('../controllers/testing')
const router = express.Router()

router.use('/', testingController.testApi)


module.exports = router