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
<<<<<<< HEAD
    password: "1F@ptoyournan",
=======
    password: "password",
>>>>>>> 771231122bca4db2055f6726165025ee514f66a2
    database: "todo_db",
  });
}

module.exports = connection;
