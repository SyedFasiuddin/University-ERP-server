const { Router } = require("express")
const {
    getAllDepartments,
    addDepartment,
    getAllLecturersByDepartment,
    getAllLeaveForDepartment,
    assignLeaveForDeaprtmentStudentsAndLecturers
} = require("../controller/departments")
const { authHOD, authAdmin } = require("../middleware/authenticateUser")

const router = new Router()

router.get("/", getAllDepartments)
router.post("/", authAdmin, addDepartment)

router.get("/lecturers", getAllLecturersByDepartment)

router.get("/:id/leave", authHOD, getAllLeaveForDepartment)
router.post("/:id/leave", authHOD, assignLeaveForDeaprtmentStudentsAndLecturers)

module.exports = router

