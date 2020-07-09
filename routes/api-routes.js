const express = require("express");
const router = express.Router();
const {
  seeAllTodos,
  showTodo,
  addTodo,
  deleteTodo,
  editTodo,
} = require("../config/orm");

// see all todos
router.get("/api", (req, res) => {
  seeAllTodos()
    .then((allTodos) => res.json(allTodos))
    .catch((err) => res.json(err));
});

// search single todo by ID
router.get("/api/find/:id", (req, res) => {
  showTodo(parseInt(req.params.id))
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});

// create a new todo
router.post("/api", (req, res) => {
  addTodo(req.body.text)
    .then((submitResult) => res.json(submitResult))
    .catch((err) => res.json(err));
});

// delete a todo
router.delete("/api/delete/:id", (req, res) => {
  deleteTodo(parseInt(req.params.id))
    .then((delRes) => res.json(delRes))
    .catch((err) => res.json(err));
});

// edit a todo
router.patch("/api", (req, res) => {
  editTodo({
    todoText: req.body.todoText,
    todoId: parseInt(req.body.todoId),
    todoCompleted: req.body.todoCompleted === "false" ? false : true,
  })
    .then((editRes) => res.json(editRes))
    .catch((err) => res.json(err));
});

module.exports = router;
