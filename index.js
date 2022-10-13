const express = require("express")
const db = require("./db")
const dotenv = require("dotenv")
dotenv.config()

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.send({
        "msg": "index.html"
    })
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

app.get("/students", async (_, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM students")
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
    } finally {
        // client.release()
    }
})

app.get("/students/:id", async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM students WHERE usn = $1", [req.params.id])
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
    } finally {
        // client.release()
    }
})

app.post("/students/:id", async (req, res) => {
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
        res.send(e.details)
    } finally {
        // client.release()
    }
})

app.put("/students/:id", (req, res) => {
    res.send({
        "msg": req.params.id + " put"
    })
})

app.delete("/students/:id", async (req, res) => {
    try {
        const queryRes = await db.query("DELETE FROM students WHERE usn = $1", [req.params.id])
        res.send({ ...queryRes.rows })
    } catch (e) {
        console.error(e.stack)
    } finally {
        // client.release()
    }
})

