const db = require("../db")

const getAllDepartments = async (_req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM departments")
        res.status(200).json({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const addDepartment = async (req, res) => {
    try {
        const queryRes = await db.query(`
            INSERT INTO departments (full_name, short_code)
                 VALUES ($1, $2)`,
            [req.body.full_name, req.body.short_code])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const getAllLecturersByDepartment = async (req, res) => {
    try {
        const queryRes = await db.query(`
            SELECT name, email, qualification, subject_expertise, experience
              FROM lecturers
             WHERE department = $1`,
            [req.query.departmentId])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const getAllLeaveForDepartment = async (req, res) => {
    try {
        const studentLeave = await db.query(`
            SELECT usn AS id, date
              FROM student_leave
             WHERE assigned = 'f'`)

        const lecturerLeave = await db.query(`
            SELECT lecturer_id AS id, date
              FROM lecturer_leave
             WHERE assigned = 'f'`)

        res.status(200).send({
            "students": { ...studentLeave.rows },
            "lecturers": { ...lecturerLeave.rows }
        })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const assignLeaveForDeaprtmentStudentsAndLecturers = async (req, res) => {
    try {
        for (let x of req.body.lecturers) {
            await db.query(`
      INSERT INTO lecturer_attendance
           VALUES ($1, $2)`, [x.id, new Date(x.date).toLocaleDateString()])
            await db.query(`
           UPDATE lecturer_leave
              SET assigned = 't'
            WHERE lecturer_id = $1`, [x.id])
        }
        res.status(200).send({ "message": "done" })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    getAllDepartments,
    addDepartment,
    getAllLecturersByDepartment,
    getAllLeaveForDepartment,
    assignLeaveForDeaprtmentStudentsAndLecturers,
}
