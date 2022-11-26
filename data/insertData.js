const axios = require("axios")

const lecData = require("./lecData.json")
const studData = require("./studData.json")
const subData = require("./subjectsData.json")
const deptData = require("./departmentData.json")

const insertData = (data, path) => {
    for (let i = 0; i < data.length; i++) {
        axios({
            method: "post",
            url: `http://localhost:8000/${path}`,
            data: data[i]
        })
            .then(res => {
                if (res.status != 200)
                    console.log(res)
            })
    }
}

insertData(deptData, "departments")
insertData(lecData, "lecturers")
insertData(studData, "students")
insertData(subData, "subjects")

