const express = require("express");
const router = express.Router();
const passport = require("../config/passport.js");
const db = require("../models");

// Log in Route using authenticate
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({
    email: req.user.email,
    id: req.user.id,
  });
});

// Sign Up Route
router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  })
    // if passed, then redirect to login
    .then(() => {
      // 307 is automatic redirection
      res.redirect(307, "/api/login");
    })
    // if NOT passed, disconnect err
    .catch((err) => res.status(401).json(err));
});
// Log OUT Route
router.get("/logout", (req, res) => {
  // to end session with user
  req.logout();
  // just enters "yes" if logout is complete
  res.send("yes");
  // to redirect session after logout
  res.redirect("/");
});

// FEED Route for indiv. user
router.get("/api/feed", (req, res) => {
  // if no existing user
  !req.user
    ? res.json({ message: "No user Present" })
    : // if new user
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username,
      });
});

// const {
//   seeAllTodos,
//   showTodo,
//   addTodo,
//   deleteTodo,
//   editTodo,
// } = require("../config/orm");

// // see all todos--working, showing todos on web
// router.get("/api", (req, res) => {
//   seeAllTodos()
//     .then((allTodos) => res.json(allTodos))
//     .catch((err) => res.json(err));
// });

// // search single todo by ID, working on web.
// router.get("/api/find/:id", (req, res) => {
//   showTodo(parseInt(req.params.id))
//     .then((todo) => res.json(todo))
//     .catch((err) => res.json(err));
// });

// // create a new todo, shows all todos working on web.
// router.post("/api", (req, res) => {
//   addTodo(req.body.text)
//     .then((submitResult) => res.json(submitResult))
//     .catch((err) => res.json(err));
// });

// // delete a todo; works on postman, not on web.
// router.delete("/api/delete/:id", (req, res) => {
//   deleteTodo(parseInt(req.params.id))
//     .then((delRes) => res.json(delRes))
//     .catch((err) => res.json(err));
// });

// // edit a todo; works on postman, not on web.
// router.patch("/api", (req, res) => {
//   editTodo({
//     todoText: req.body.todoText,
//     todoId: parseInt(req.body.todoId),
//     todoCompleted: req.body.todoCompleted === "false" ? false : true,
//   })
//     .then((editRes) => res.json(editRes))
//     .catch((err) => res.json(err));
// });

module.exports = router;
