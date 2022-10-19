const { Router } = require("express");
const {
    getAllDepartments, addDepartment
} = require("../controller/departments");

const router = new Router()

router.get("/", getAllDepartments)
router.post("/", addDepartment) // is this required?

module.exports = router

