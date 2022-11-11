const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

module.exports = {
    async query(text, params) {
        return pool.query(text, params)
    },
}

