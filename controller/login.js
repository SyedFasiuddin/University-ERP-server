const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { id, password } = req.body
        if (!id || !password) {
            res.status(400).send({ "message": "id or password missing" })
            return
        }

        const queryRes = await db.query(`
            SELECT id, password
              FROM passwords
             WHERE id = $1`, [id])

        if (queryRes.rows.length < 1) {
            res.status(400).send({ "message": "user does not exists" })
            return
        }

        if (await bcrypt.compare(password, queryRes.rows[0].password)) {
            const token = jwt.sign(id, process.env.JWT_SECRET)
            res.status(200).send({ token })
            return
        }

        res.status(400).send({ "message": "wrong password" })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const whoIs = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(400).send({ "message": "no id available" })
            return
        }

        const queryRes = await db.query(`
            SELECT lecturer_id
              FROM lecturers
             WHERE lecturer_id = $1`, [id])

        if (queryRes.rows.length == 1)
            res.status(200).send({
                "lecturer": true,
                "student": false
            })
        else
            res.status(200).send({
                "lecturer": false,
                "student": true
            })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    login,
    whoIs,
}

