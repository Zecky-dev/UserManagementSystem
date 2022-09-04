const mysql = require('mysql');

// Dotenv
require("dotenv").config();
const env = process.env;

// Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host:            env.DB_HOST,
    database:        env.DB_NAME,
    user:            env.DB_USERNAME,
    password:        env.DB_PASSWORD
});

// Connect DB
pool.getConnection(
    (err) => {
        if(err) {throw new Error(err.message);}
        else {console.log('Mysql connection created successfully');}
    }
);

module.exports = pool;