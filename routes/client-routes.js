const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

//localhost:3000 page
router.get("/", (req, res) => {
  // if user exists, send to feed page
  if (req.user) {
    res.redirect("/feed");
  }
  //if user does NOT exist, redirect to signup page
  res.sendFile(path.join(__dirname, "../client/signup.html"));
});
// Log In page
router.get("/login", (req, res) => {
  if (req.user) {
    // if logged in redirect to feed page
    res.redirect("/feed");
  }
  // if NOT logged in redirect to signup page
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

// Sign Up page
router.get("/signup", (req, res) => {
  if (req.user) {
    // if logged in redirect to feed page
    res.redirect("/feed");
  }
  // if NOT logged in redirect to signup page
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

// FEED page
router.get("/feed", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/feed.html"));
});

router.get("/newpost", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/newpost.html"));
});

// router.get("/delete", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/delete.html"));
// });

module.exports = router;
