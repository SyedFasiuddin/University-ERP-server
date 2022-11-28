const {
    getAllLecturers,
    getLecturerById,
    deleteLecturerById,
    addLecturer,
    getLecturerLeaveById,
    addLecturerLeaveById,
    getLecturerAttendanceById,
    addLecturerAttendanceById
} = require("../controller/lecturers")
const { Router } = require("express")
const { authenticateUser, authAdmin } = require("../middleware/authenticateUser")

const router = new Router()

router.get("/", getAllLecturers)
router.post("/", authAdmin, addLecturer)

router.get("/:id", authenticateUser, getLecturerById)
router.delete("/:id", authAdmin, deleteLecturerById)

router.get("/:id/leave", authenticateUser, getLecturerLeaveById)
router.post("/:id/leave", authenticateUser, addLecturerLeaveById)

router.get("/:id/attendance",authenticateUser, getLecturerAttendanceById)
router.post("/:id/attendance", addLecturerAttendanceById)

module.exports = router

