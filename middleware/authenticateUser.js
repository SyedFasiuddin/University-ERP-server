const jwt = require("jsonwebtoken")
const db = require("../db")

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(403).end()
        return
    }

    let id
    const token = authHeader.split(" ")[1]
    try {
        id = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        console.log(e)
        res.status(400).end()
        return
    }

    if (id == req.params.id) next()
    else {
        res.status(403).end()
        return
    }
}

const authSubjectLecturer = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(403).end()
        return
    }

    let id
    const token = authHeader.split(" ")[1]
    try {
        id = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        console.log(e)
        res.status(400).end()
        return
    }

    const queryRes = db.query(`SELECT taught_by FROM subjects
        WHERE subject_code = $1`, [req.params.subject_code])

    if (id == queryRes.rows[0].taught_by) next()
    else {
        res.status(403).end()
        return
    }
}

const authHOD = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(403).end()
        return
    }

    let id
    const token = authHeader.split(" ")[1]
    try {
        id = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        console.log(e)
        res.status(400).end()
        return
    }

    let queryRes
    try {
        queryRes = await db.query(`
        SELECT hod_lecturer_id
          FROM departments
         WHERE short_code = $1 `, [req.params.id])
    } catch (e) {
        console.log(e)
        res.status(500).end()
        return
    }

    if (id == queryRes.rows[0].hod_lecturer_id) next()
    else {
        res.status(403).end()
        return
    }
}

module.exports = {
    authenticateUser,
    authSubjectLecturer,
    authHOD,
}

