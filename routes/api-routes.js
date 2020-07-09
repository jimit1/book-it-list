const express = require("express");
const router = express.Router();
const passport = require("../config/passport.js");
const db = require("../models");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({ email: req.user.email, id: req.user.id });
});

router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => res.status(401).json(err));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("yes");
  // res.redirect("/");
});

router.get("api/user_data", (req, res) => {
  !req.user
    ? res.json({ message: "No user Present" })
    : res.json({ email: req.user.email, id: req.user.id });
});

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
