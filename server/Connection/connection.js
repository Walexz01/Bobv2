const mysql2 = require('mysql2');
require('dotenv').config()
const dotenv = require('dotenv');
dotenv.config()


const pool = mysql2.createPool({

    host: process.env.HOST ,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()




module.exports = pool;