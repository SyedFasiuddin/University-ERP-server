const { Pool } = require("pg")

const pool = new Pool({
  user: 'sf',
  host: '127.0.0.1',
  database: 'erp',
  password: 'sf',
  port: 5432,
});

module.exports = {
    async query(text, params) {
        return pool.query(text, params)
    },
}

