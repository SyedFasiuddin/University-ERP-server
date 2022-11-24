const db = require("../db")

const getAllSubjects = async (_req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM subjects")
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const addSubject = async (req, res) => {
    try {
        const queryRes = await db.query(`INSERT INTO subjects
        (subject_code, subject_name, taught_by, department)
        VALUES ($1, $2, $3, $4) RETURNING *`,
            [req.params.subject_code, req.params.subject_name,
            req.params.taught_by, req.params.department])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const getSubjectsByDepartment = async (req, res) => {
    try {
        const queryRes = await db.query("SELECT * FROM subjects WHERE subject_code = $1",
            [req.params.department])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const addSubjectMarksPerStudentForIA1 = async (req, res) => {
    try {
        for (let key in req.body) {
            const queryRes = await db.query(`SELECT "IA1" FROM students_subjects_marks
            WHERE usn = $1 AND subject_code = $2`,
                [key, req.params.subject_code])
            if (parseInt(queryRes.rows[0].IA1) == -1) {
                await db.query(`UPDATE students_subjects_marks set
                "IA1" = $1 WHERE usn = $2 AND subject_code = $3`,
                    [parseInt(req.body[key]), key, req.params.subject_code])
            } else
                res.status(400).send({ "message": "You can't update marks, ask Admin for it" })
        }
        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const addSubjectMarksPerStudentForIA2 = async (req, res) => {
    try {
        for (let key in req.body) {
            const queryRes = await db.query(`SELECT "IA2" FROM students_subjects_marks
            WHERE usn = $1 AND subject_code = $2`,
                [key, req.params.subject_code])
            if (parseInt(queryRes.rows[0].IA2) == -1) {
                await db.query(`UPDATE students_subjects_marks set
                "IA2" = $1 WHERE usn = $2 AND subject_code = $3`,
                    [parseInt(req.body[key]), key, req.params.subject_code])
            } else
                res.status(400).send({ "message": "You can't update marks, ask Admin for it" })
        }
        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const addSubjectMarksPerStudentForIA3 = async (req, res) => {
    try {
        for (let key in req.body) {
            const queryRes = await db.query(`SELECT "IA3" FROM students_subjects_marks
            WHERE usn = $1 AND subject_code = $2`,
                [key, req.params.subject_code])
            if (parseInt(queryRes.rows[0].IA3) == -1) {
                await db.query(`UPDATE students_subjects_marks set
                "IA3" = $1 WHERE usn = $2 AND subject_code = $3`,
                    [parseInt(req.body[key]), key, req.params.subject_code])
            } else
                res.status(400).send({ "message": "You can't update marks, ask Admin for it" })
        }
        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const addSubjectMarksPerSubjectForExternal = async (req, res) => {
    try {
        for (let key in req.body) {
            const queryRes = await db.query(`SELECT external FROM students_subjects_marks
            WHERE usn = $1 AND subject_code = $2`,
                [key, req.params.subject_code])

            if (parseInt(queryRes.rows[0].external) == -1) {
                await db.query(`UPDATE students_subjects_marks SET external = $1
                WHERE usn = $2 AND subject_code = $3`,
                    [parseInt(req.body[key]), key, req.params.subject_code])
            } else
                res.status(400).send({ "message": "You can't update marks, ask Admin for it" })

            const iaMarks = await db.query(`SELECT "IA1", "IA2", "IA3" FROM
            students_subjects_marks WHERE usn = $1 AND subject_code = $2`,
                [key, req.params.subject_code])

            const IA1 = parseInt(iaMarks.rows[0].IA1)
            const IA2 = parseInt(iaMarks.rows[0].IA2)
            const IA3 = parseInt(iaMarks.rows[0].IA3)
            const IA_average = Math.round((IA1 + IA2 + IA3 - Math.min(IA1, IA2, IA3)) / 2)

            await db.query("UPDATE students_subjects_marks SET \"IA_average\" = $1",
                [IA_average])

            if (IA_average + req.body[key] > 35)
                await db.query("UPDATE students_subjects_marks SET pass = true")

        }
        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const getSubjectMarksForStudentById = async (req, res) => {
    try {
        const queryRes = await db.query(`
            SELECT *
              FROM students_subjects_marks
             WHERE usn = $1
               AND subject_code = $2`,
            [req.params.id, req.params.subject_code])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const getSubjectMarksForAllStudents = async (req, res) => {
    try {
        const queryRes = await db.query(`
                SELECT m.usn, s.name, m."IA_average", m.external
                  FROM students_subjects_marks AS m
             LEFT JOIN students AS s
                 USING (usn)
                 WHERE subject_code = $1`,
            [req.params.subject_code])
        res.status(200).send({ ...queryRes.rows })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

const getSubjectsTaughtByLecturerHavingId = async (req, res) => {
    try {
        const queryRes = await db.query(`
                SELECT s.subject_code
                  FROM subjects AS s
                 WHERE taught_by = $1
            `, [req.params.id])
        res.status(200).send( queryRes.rows )
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    getAllSubjects,
    getSubjectsByDepartment,
    addSubject,
    addSubjectMarksPerStudentForIA1,
    addSubjectMarksPerStudentForIA2,
    addSubjectMarksPerStudentForIA3,
    addSubjectMarksPerSubjectForExternal,
    getSubjectMarksForStudentById,
    getSubjectMarksForAllStudents,
    getSubjectsTaughtByLecturerHavingId,
}

