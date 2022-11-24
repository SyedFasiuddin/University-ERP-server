const { Router } = require("express")
const {
    getAllDepartments,
    addDepartment,
    getAllLecturersByDepartment
} = require("../controller/departments")

const router = new Router()

router.get("/", getAllDepartments)
router.post("/", addDepartment) // is this required?

router.get("/lecturers", getAllLecturersByDepartment)

module.exports = router

