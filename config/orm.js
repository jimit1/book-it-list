connection = require("./connection");

// Object Reference Module

connection.connect((err) => {
  if (err) throw err;
});

const seeAllTodos = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todos", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

const showTodo = (todoID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM todos WHERE ?",
      { id: todoID },
      (err, data) => {
        err ? reject(err) : resolve(data);
      }
    );
  });
};

const addTodo = (userText) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO todos SET ?", [{ text: userText }], (err) => {
      err ? reject(err) : resolve("Success");
    });
  });
};

const deleteTodo = (todoID) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM todos WHERE ?", [{ id: todoID }], (err) => {
      err ? reject(err) : resolve("Deleted!");
    });
  });
};

const editTodo = (obj) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE todos SET ? WHERE ?",
      [
        { text: obj.todoText, completed: obj.todoCompleted },
        { id: obj.todoId },
      ],
      (err) => {
        err ? reject(err) : resolve("Success");
      }
    );
  });
};

module.exports = { seeAllTodos, showTodo, addTodo, deleteTodo, editTodo };
