const express = require('express')
const router = express.Router()

const authController = require('../../Controller/authController')

router.use("/register", authController.regisController)
router.use("/unlock", authController.unlockController)

module.exports = router