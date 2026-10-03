const express = require('express')
const router = express.Router()

const api = process.env.BASE_URL
const indexapi = require("./api/index")

router.use(api, indexapi);

module.exports = router