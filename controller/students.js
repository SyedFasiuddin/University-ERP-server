const db = require("../db")

const getAllStudents = async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM students")
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.statusCode(500)
        res.send({ "message": "something went wrong" })
    }
}

const getStudentById = async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM students WHERE usn = $1", [req.params.id])
        if (queryRes.rows.length > 0 )
            res.send({ ...queryRes.rows })
        else
            res.send({
                "message": "Cannot find student with id " + req.params.id
            })
    } catch (e) {
        console.error(e.stack)
        res.statusCode(500)
        res.send({ "message": "something went wrong" })
    }
}

const deleteStudentById = async (req, res) => {
    try {
        const queryRes = await db.query("DELETE FROM students WHERE usn = $1", [req.params.id])
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.statusCode(500)
        res.send({ "message": "something went wrong" })
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
        res.send({ queryRes })
    } catch (e) {
        console.error(e.stack)
        res.status(400)
        res.send(e)
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    deleteStudentById,
    addStudent,
}

