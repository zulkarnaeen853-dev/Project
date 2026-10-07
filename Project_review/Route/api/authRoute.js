const express = require('express')
const router = express.Router()

const authController = require('../../Controller/authController')

router.use("/register", authController.regisController)

module.exports = router