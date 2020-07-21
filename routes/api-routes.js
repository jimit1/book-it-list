const express = require("express");
const router = express.Router();
const passport = require("../config/passport.js");
const axios = require("axios");
require("dotenv").config();

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  userId = parseInt(req.user.id);
  res.json({ email: req.user.email, id: req.user.id });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// returns information from the session about the current user
router.get("/api/user_data", (req, res) => {
  !req.user
    ? res.json({ message: "No user Present" })
    : res.json({
        email: req.user.email,
        id: req.user.id,
        userName: req.user.userName,
      });
});

// OMDB axios request for newpost.js
router.get("/api/omdb/:title", (req, res) => {
  axios
    .get(
      `https://www.omdbapi.com/?t=${req.params.title}&apikey=${process.env.OMDB_API}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => res.json(err));
});

// Picture search for newpost.js
router.get("/api/unsplash/:title", (req, res) => {
  axios
    .get(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.unsplashApi}&query=${req.params.title}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
