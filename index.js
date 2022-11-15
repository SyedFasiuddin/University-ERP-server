const express = require("express")
const studentsRoute = require("./routes/students")
const lecturersRoute = require("./routes/lecturers")
const subjectsRoute = require("./routes/subjects")
const departmentsRoute = require("./routes/departments")
const loginRoute = require("./routes/login")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (_, res) => {
    res.header({
        "Access-Control-Allow-Origin":"*"
    })
    .send({
        "msg": "index.html"
    })
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

app.use("/students", studentsRoute)
app.use("/lecturers", lecturersRoute)
app.use("/subjects", subjectsRoute)
app.use("/departments", departmentsRoute)
app.use("/login", loginRoute)

