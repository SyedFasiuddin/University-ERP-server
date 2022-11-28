const db = require("../db")
const bcrypt = require("bcrypt")

const getAllLecturers = async (_req, res) => {
    try {
        const queryRes = await db.query(`
            SELECT name, lecturer_id, department
              FROM lecturers`)
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const getLecturerById = async (req, res) => {
    try {
        const queryRes = await db.query(
            "SELECT * FROM lecturers WHERE lecturer_id = $1", [req.params.id])
        if (queryRes.rows.length > 0)
            res.status(200).send({ ...queryRes.rows })
        else
            res.status(400).send({
                "message": "Cannot find lecturer with id " + req.params.id
            })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const deleteLecturerById = async (req, res) => {
    try {
        await db.query("DELETE FROM lecturers WHERE lecturer_id = $1",
            [req.params.id])
        res.status(200).send({ "message": "done" })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const addLecturer = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.lecturer_id, 10)

    const query = {
        text: `INSERT INTO lecturers (
                    lecturer_id,
                    name,
                    fathers_name,
                    spouse_name,
                    phone_num,
                    dob,
                    email,
                    address,
                    qualification,
                    subject_expertise,
                    department,
                    experience,
                    aadhar_number,
                    pan_number,
                    bank_account_number,
                    pay_scale,
                    basic_pay,
                    gross_salary,
                    deduction,
                    net_salary )
                VALUES (
                  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
                )
                 RETURNING *`,
        values: [
            req.body.lecturer_id,
            req.body.name,
            req.body.fathers_name,
            req.body.spouse_name,
            req.body.phone_num,
            req.body.dob,
            req.body.email,
            req.body.address,
            req.body.qualification,
            req.body.subject_expertise,
            req.body.department,
            req.body.experience,
            req.body.aadhar_number,
            req.body.pan_number,
            req.body.bank_account_number,
            req.body.pay_scale,
            req.body.basic_pay,
            req.body.gross_salary,
            req.body.deduction,
            req.body.net_salary
        ],
    }

    try {
        await db.query(query)
        await db.query("INSERT INTO passwords (id, password) VALUES ( $1, $2 )",
            [req.body.lecturer_id, hashedPassword])
        res.status(200).send({ "message": "done" })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const getLecturerLeaveById = async (req, res) => {
    try {
        const queryRes = await db.query(`
            SELECT lecturer_id AS id, date, assigned
              FROM lecturer_leave
             WHERE lecturer_id = $1`, [req.params.id])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.status(500).end()
    }
}

const addLecturerLeaveById = async (req, res) => {
    // expected format: "MM/DD/YYYY"
    const date = req.body.date
    if (new Date() > new Date(date)) {
        res.status(400)
            .send({ "message": "Cannot request leave for previous dates" })
        return
    }

    try {
        const departmentId = await db.query(
            "SELECT department FROM lecturers WHERE lecturer_id = $1",
            [req.params.id])
        await db.query(`
            INSERT INTO lecturer_leave(department, lecturer_id, date)
                 VALUES ($1, $2, $3)`,
            [departmentId.rows[0].department, req.params.id, date])
        res.status(200).send({ "message": "done" })
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
}

const getLecturerAttendanceById = async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM lecturer_attendance WHERE lecturer_id = $1",
            [req.params.id])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e.stack)
        res.status(500).end()
    }
}

const addLecturerAttendanceById = async (req, res) => {
    try {
        const queryRes = await db.query(`INSERT INTO lecturer_attendance(lecturer_id, absent_date)
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
    getAllLecturers,
    getLecturerById,
    deleteLecturerById,
    addLecturer,
    getLecturerLeaveById,
    addLecturerLeaveById,
    getLecturerAttendanceById,
    addLecturerAttendanceById,
}

