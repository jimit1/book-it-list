const mysql = require("mysql");
const password = require("./pw");
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "y88kyd2v2ldv4xen",
  });
}

module.exports = connection;
