const { Router } = require("express");
const {
    getAllSubjects,
    getSubjectsByDepartment,
    addSubject,
    addSubjectMarksPerStudentForIA1,
    addSubjectMarksPerStudentForIA2,
    addSubjectMarksPerStudentForIA3,
    addSubjectMarksPerSubjectForExternal,
    getSubjectMarksForStudentById,
} = require("../controller/subjects");

const router = new Router()

router.get("/", getAllSubjects)
router.post("/", addSubject) // is this really required?

router.get("/:department", getSubjectsByDepartment)

router.post("/:subject_code/IA1", addSubjectMarksPerStudentForIA1)
router.post("/:subject_code/IA2", addSubjectMarksPerStudentForIA2)
router.post("/:subject_code/IA3", addSubjectMarksPerStudentForIA3)
router.post("/:subject_code/external", addSubjectMarksPerSubjectForExternal)

router.get("/:subject_code/:id", getSubjectMarksForStudentById)

module.exports = router

