const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//localhost:3000
router.get("/", (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.redirect("/home");
  }
  //register for new non-existing account
  res.sendFile(path.join(__dirname, "../client/signup.html"));
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

router.get("/home", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/home.html"));
});

router.get("/newpost", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/newpost.html"));
});

// router.get("/delete", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/delete.html"));
// });

module.exports = router;
