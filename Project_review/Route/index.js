const express = require('express')
const router = express.Router()
const apiRoute = require('./api')
const api = process.env.BASE_URL || '/api/v1'

router.use(api, apiRoute)

module.exports = router