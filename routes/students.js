const {
    getAllStudents,
    getStudentById,
    deleteStudentById,
    addStudent,
    getStudentLeaveById,
    addStudentLeaveById,
    getStudentAttendanceById,
    addStudentAttendanceById,
    getStudentMarksForAllSubjects
} = require("../controller/students")
const { Router } = require("express")
const {
    authenticateUser, authSubjectLecturer
} = require("../middleware/authenticateUser")

const router = new Router()

router.get("/", getAllStudents)
router.post("/", addStudent)

router.get("/:id", authenticateUser, getStudentById)
router.delete("/:id", deleteStudentById)
// does university ever require to delete a student

router.get("/:id/leave", authenticateUser, getStudentLeaveById)
router.post("/:id/leave", authenticateUser, addStudentLeaveById)

router.get("/:id/attendance",authenticateUser, getStudentAttendanceById)
router.post("/:id/attendance",authSubjectLecturer, addStudentAttendanceById)

router.get("/:id/marks",authenticateUser, getStudentMarksForAllSubjects)

// router.put("/:id", (req, res) => {
//     res.send({
//         "msg": req.params.id + " put"
//     })
// })
// is this required?

module.exports = router

