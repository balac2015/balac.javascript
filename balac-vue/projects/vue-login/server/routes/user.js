const express = require('express')
const UserController = require('../controller/user')
const router = express.Router()

UserController(router)

module.exports = router