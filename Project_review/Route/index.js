const express = require('express')
const router = express.Router()

const api = process.env.BASE_URL
const authRoute = require("./api/index")

router.use(api, authRoute);

module.exports = router