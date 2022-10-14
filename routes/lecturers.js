const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", async (_, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM lecturers")
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.statusCode(500)
        res.send({ "message": "something went wrong" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM lecturers WHERE lecturer_id = $1", [req.params.id])
        if (queryRes.rows.length > 0 )
            res.send({ ...queryRes.rows })
        else
            res.send({
                "message": "Cannot find lecturer with id " + req.params.id
            })
    } catch (e) {
        console.error(e.stack)
        res.statusCode(500)
        res.send({ "message": "something went wrong" })
    }
})

router.post("/:id", async (req, res) => {
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
        ]
    }

    try {
        const queryRes = await db.query(query)
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.status(400)
        res.send(e.details)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const queryRes = await db.query("DELETE FROM lecturers WHERE lecturer_id = $1", [req.params.id])
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
        res.statusCode(500)
        res.send({ "message": "something went wrong" })
    }
})

module.exports = router

