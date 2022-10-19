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

const router = new Router()

router.get("/", getAllStudents)
router.post("/", addStudent)

router.get("/:id", getStudentById)
router.delete("/:id", deleteStudentById)

router.get("/:id/leave", getStudentLeaveById)
router.post("/:id/leave", addStudentLeaveById)

router.get("/:id/attendance", getStudentAttendanceById)
router.post("/:id/attendance", addStudentAttendanceById)

router.get("/:id/marks", getStudentMarksForAllSubjects)

router.put("/:id", (req, res) => {
    res.send({
        "msg": req.params.id + " put"
    })
})

module.exports = router

