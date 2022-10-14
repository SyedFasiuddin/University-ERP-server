const express = require("express")
const { getAllLecturers, getLecturerById, deleteLecturerById, addLecturer } = require("../controller/lecturers")
const router = express.Router()

router.get("/", getAllLecturers)
router.get("/:id", getLecturerById)
router.post("/:id", addLecturer)
router.delete("/:id", deleteLecturerById)

module.exports = router

