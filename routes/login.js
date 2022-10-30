const { Router } = require("express")
const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { login } = require("../controller/login")

const router = new Router()

router.use("/", login)

module.exports = router

