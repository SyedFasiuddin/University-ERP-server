const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { id, password } = req.body
        if (!id || !password) {
            res.send(400).send({ "message": "id or password missing" })
            return
        }

        const queryRes = await db.query(`
            SELECT id, password
              FROM passwords
             WHERE id = $1`, [id])

        if (queryRes.rows.length < 1) {
            res.status(400).send({ "error": "user does not exists" })
            return
        }

        if (await bcrypt.compare(password, queryRes.rows[0].password)) {
            const token = jwt.sign(id, process.env.JWT_SECRET)
            res.status(200).send({ token })
            return
        }

        res.status(400).send({ "error": "wrong password" })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    login,
}

