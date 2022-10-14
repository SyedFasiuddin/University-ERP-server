const express = require("express")
const { getAllStudents, getStudentById, deleteStudentById, addStudent } = require("../controller/students")
const router = express.Router()
const db = require("../db")

router.get("/", getAllStudents)
router.get("/:id", getStudentById)
router.post("/:id", addStudent)
router.delete("/:id", deleteStudentById)

router.put("/:id", (req, res) => {
    res.send({
        "msg": req.params.id + " put"
    })
})

module.exports = router

