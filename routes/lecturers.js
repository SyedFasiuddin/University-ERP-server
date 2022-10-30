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
const { authenticateUser } = require("../middleware/authenticateUser")

const router = new Router()

router.get("/", getAllLecturers)
router.post("/", addLecturer)

router.get("/:id", authenticateUser, getLecturerById)
router.delete("/:id", deleteLecturerById)

router.get("/:id/leave", getLecturerLeaveById)
router.post("/:id/leave", addLecturerLeaveById)

router.get("/:id/attendance",authenticateUser, getLecturerAttendanceById)
router.post("/:id/attendance", addLecturerAttendanceById)

module.exports = router

