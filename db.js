const { Pool } = require('pg')

const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: "database"
})

module.exports = pool;
