const express = require('express')
const router = express.Router()

const authController = require('../../Controller/authController')

router.post("/register", authController.regisController)
router.post("/unlock", authController.unlockController)

module.exports = router