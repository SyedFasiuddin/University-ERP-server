const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const checkPasswordConstraints = (pass) => {
    if (pass.length < 12)
        throw new Error("Password length is less than 12 characters")

    if (pass.length > 40)
        throw new Error("Password length is more than 40 characters")

    const characters = pass.split("")

    let capitalLetters = 0
    let smallLetters = 0
    let numbers = 0
    let symbols = 0

    for (let char of characters) {
        if ( char >= "a" && char <= "z" ) smallLetters++
        else if ( char >= "A" && char <= "Z" ) capitalLetters++
        else if ( char >= "0" && char <= "9" ) numbers++
        else symbols++
    }

    if (capitalLetters > 0 && numbers > 3 && symbols > 0) return true
    else return false
}

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

        const lecRes = await db.query(`
            SELECT lecturer_id FROM lecturers WHERE lecturer_id = $1;
            `, [id])

        if (await bcrypt.compare(password, queryRes.rows[0].password)) {
            const token = jwt.sign(id, process.env.JWT_SECRET)
            if (lecRes.rows.length < 1)
                res.status(200).send({ token, "lecturer": false })
            else
                res.status(200).send({ token, "lecturer": true })
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

