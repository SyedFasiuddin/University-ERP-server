const express = require("express")
const studentsRoute = require("./routes/students")
const lecturersRoute = require("./routes/lecturers")
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

app.use("/students", studentsRoute)
app.use("/lecturers", lecturersRoute)

