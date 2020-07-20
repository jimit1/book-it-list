const express = require("express");
const router = express.Router();
const db = require("../models");

// add a new user
// /api/users/new
router.post("/new", (req, res) => {
  db.User.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => res.status(401).json(err));
});

// get a list of all users, their settings, and their posts
// /api/users/all
router.get("/all", (req, res) => {
  db.User.findAll({
    include: [db.Settings, db.Post],
  }).then((allUsers) => {
    res.send(allUsers);
  });
});

module.exports = router;
