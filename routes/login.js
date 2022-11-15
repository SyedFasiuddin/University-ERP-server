const { Router } = require("express")
const { login, whoIs } = require("../controller/login")

const router = new Router()

router.post("/", login)
router.post("/whois", whoIs)

module.exports = router

