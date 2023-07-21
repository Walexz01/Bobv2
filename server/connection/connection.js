const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: process.env.MYSQL_USER,
  host: process.env.HOST,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = connection;
