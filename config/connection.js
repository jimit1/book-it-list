const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Booyah5%",
  database: "todo_db",
});

module.exports = connection;
