const { Router } = require("express")
const {
    getAllSubjects,
    getSubjectsByDepartment,
    addSubject,
    addSubjectMarksPerStudentForIA1,
    addSubjectMarksPerStudentForIA2,
    addSubjectMarksPerStudentForIA3,
    addSubjectMarksPerSubjectForExternal,
    getSubjectMarksForStudentById,
    getSubjectMarksForAllStudents,
} = require("../controller/subjects")
const { authSubjectLecturer } = require("../middleware/authenticateUser")

const router = new Router()

router.get("/", getAllSubjects)
router.post("/", addSubject) // is this really required?

router.get("/:department", getSubjectsByDepartment)

router.post("/:subject_code/IA1",authSubjectLecturer, addSubjectMarksPerStudentForIA1)
router.post("/:subject_code/IA2",authSubjectLecturer, addSubjectMarksPerStudentForIA2)
router.post("/:subject_code/IA3",authSubjectLecturer, addSubjectMarksPerStudentForIA3)
router.post("/:subject_code/external",authSubjectLecturer, addSubjectMarksPerSubjectForExternal)

router.get("/:subject_code/:id", getSubjectMarksForStudentById)
router.get("/:subject_code/all",authSubjectLecturer, getSubjectMarksForAllStudents)

module.exports = router

