const { Router } = require("express")
const { login } = require("../controller/login")

const router = new Router()

router.use("/", login)

module.exports = router

