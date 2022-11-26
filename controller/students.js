const db = require("../db")
const bcrypt = require("bcrypt")

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
            res.status(200).send({ ...queryRes.rows[0] })
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
    const hashedPassword = await bcrypt.hash(req.body.usn, 10)

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
        // it is expected from the client that all of this information is present
        // in the request body, if this is not present then null will be added
        // in tables.
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
        await db.query(query)
        await db.query("INSERT INTO passwords (id, password) VALUES ( $1, $2 )",
            [req.body.usn, hashedPassword])
        res.status(200).send({ "message": "done" })
    } catch (e) {
        console.log(query)
        console.error(e)
        res.status(500).send({ "error": e.detail }) // 23505 error no.
    }
}

const getStudentLeaveById = async (req, res) => {
    try {
        const queryRes = await db.query(`
            SELECT usn AS id, date, assigned
              FROM student_leave
             WHERE usn = $1`, [req.params.id])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const addStudentLeaveById = async (req, res) => {
    // expected format: "MM/DD/YYYY"
    const date = req.body.date
    if (new Date() > new Date(date)) {
        res.status(400)
            .send({ "message": "Cannot request leave for previous dates" })
        return
    }

    try {
        const departmentId = await db.query(
            "SELECT department FROM students WHERE usn = $1", [req.params.id])
        await db.query(`
            INSERT INTO student_leave(department, usn, date)
                 VALUES ($1, $2, $3)`,
            [departmentId.rows[0].department, req.params.id, date])
        res.status(200).send({ "message": "done" })
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
        const queryRes = await db.query(`
            INSERT INTO student_attendance(usn, absent_date, subject_code)
                 VALUES ($1, $2, $3)
              RETURNING *`,
            [req.params.id, req.body.absent_date, req.params.subject_code])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        if (parseInt(e.code) === 23505)
            res.status(400).send({ "error": "Already exists" })
        else res.status(500).end()
    }
}

const getStudentMarksForAllSubjects = async (req, res) => {
    try {
        const queryRes = await db.query(`
                SELECT s.usn, s.name, m.subject_code, m."IA1", m."IA2", m."IA3",
                       m."IA_average", m.external
                  FROM students_subject_marks AS m
             LEFT JOIN students as s
                 USING (usn)
                 WHERE usn = $1`,
            [req.params.id])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
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
    getStudentMarksForAllSubjects,
}

