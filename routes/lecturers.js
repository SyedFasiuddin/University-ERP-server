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

const router = new Router()

router.get("/", getAllLecturers)
router.post("/", addLecturer)

router.get("/:id", getLecturerById)
router.delete("/:id", deleteLecturerById)

router.get("/:id/leave", getLecturerLeaveById)
router.post("/:id/leave", addLecturerLeaveById)

router.get("/:id/attendance", getLecturerAttendanceById)
router.post("/:id/attendance", addLecturerAttendanceById)

module.exports = router

