const jwt = require("jsonwebtoken")
const db = require("../db")

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(403).end()
        return
    }

    const token = authHeader.split(" ")[1]
    const id = jwt.verify(token, process.env.JWT_SECRET)

    if (id == req.params.id) next()
    else {
        res.status(403).end()
        return
    }
}

const authSubjectLecturer = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        res.status(403).end()
        return
    }

    const token = authHeader.split(" ")[1]
    const id = jwt.verify(token, process.env.JWT_SECRET)

    const queryRes = db.query(`SELECT taught_by FROM subjects
        WHERE subject_code = $1`, [req.params.subject_code])

    if (id == queryRes.rows[0].taught_by) next()
    else {
        res.status(403).end()
        return
    }
}

module.exports = {
    authenticateUser,
    authSubjectLecturer,
}

