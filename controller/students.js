const db = require("../db")

const getAllStudents = async (_req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM students")
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const getStudentById = async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM students WHERE usn = $1", [req.params.id])
        if (queryRes.rows.length > 0)
            res.status(200).send({ ...queryRes.rows })
        else
            res.status(400).send({
                "message": "Cannot find student with id " + req.params.id
            })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const deleteStudentById = async (req, res) => {
    try {
        const queryRes = await db.query("DELETE FROM students WHERE usn = $1", [req.params.id])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const addStudent = async (req, res) => {
    const query = {
        text: `INSERT INTO students (
                    usn,
                    name,
                    fathers_name,
                    mothers_name,
                    dob,
                    address,
                    phone_num,
                    email,
                    department,
                    last_qualification,
                    qualified_from,
                    passing_year,
                    marks_scored,
                    percentage,
                    cet_rank,
                    neet_rank,
                    aadhar_number,
                    bank_account_number )
                VALUES (
                  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
                )
                 RETURNING *`,
        values: [
            req.body.usn,
            req.body.name,
            req.body.fathers_name,
            req.body.mothers_name,
            req.body.dob,
            req.body.address,
            req.body.phone_num,
            req.body.email,
            req.body.department,
            req.body.last_qualification,
            req.body.qualified_from,
            req.body.passing_year,
            req.body.marks_scored,
            req.body.percentage,
            req.body.cet_rank,
            req.body.neet_rank,
            req.body.aadhar_number,
            req.body.bank_account_number
        ],
    }

    try {
        const queryRes = await db.query(query)
        res.status(200).send({ queryRes })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const getStudentLeaveById = async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM student_leave WHERE usn = $1", [req.params.id])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const addStudentLeaveById = async (req, res) => {
    try {
        const departmentId = await db.query("SELECT department FROM students WHERE usn = $1", [req.params.id])
        const queryRes = await db.query(`INSERT INTO student_leave(department, usn, date)
            VALUES($1, $2, $3) RETURNING *`,
            [departmentId.rows[0].department, req.params.id, req.body.date])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
}

const getStudentAttendanceById = async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM student_attendance WHERE usn = $1",
            [req.params.id])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e.stack)
        res.status(500).end()
    }
}

const addStudentAttendanceById = async (req, res) => {
    try {
        const queryRes = await db.query(`INSERT INTO student_attendance(usn, absent_date)
            VALUES($1, $2) RETURNING *`,
            [req.params.id, req.body.absent_date])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        if (parseInt(e.code) === 23505)
            res.status(400).send({ "error": "Already exists" })
        else res.status(500).end()
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    deleteStudentById,
    addStudent,
    getStudentLeaveById,
    addStudentLeaveById,
    getStudentAttendanceById,
    addStudentAttendanceById,
}

