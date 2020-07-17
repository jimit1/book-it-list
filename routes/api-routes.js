const express = require("express");
const router = express.Router();
const passport = require("../config/passport.js");
const db = require("../models");
const axios = require("axios");
require("dotenv").config();


router.post("/api/login", passport.authenticate("local"), (req, res) => {
  userId = parseInt(req.user.id);
  res.json({ email: req.user.email, id: req.user.id });
});

router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => res.status(401).json(err));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/user_data", (req, res) => {
  !req.user
    ? res.json({ message: "No user Present" })
    : res.json({ email: req.user.email, id: req.user.id });
});

const {
  seeAllPosts,
  userPost,
  userOnePost,
  addPost,
  deletePost,
  editPost,
} = require("../config/orm");

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

// see all todos--working, showing todos on web
router.get("/api/all", (req, res) => {
  seeAllPosts()
    .then((allPosts) => res.json(allPosts))
    .catch((err) => res.json(err));
});

// search single todo by user ID, working on web.
router.get("/api/find/", (req, res) => {
  userPost(userId)
    .then((userPosts) => res.json(userPosts))
    .catch((err) => res.json(err));
});

// search a single todo by its ID, working on web.
router.get("/api/findpost/:postId", (req, res) => {
  userOnePost(parseInt(req.params.postId))
    .then((userPosts) => res.json(userPosts))
    .catch((err) => res.json(err));
});

// create a new todo, shows all todos working on web.
router.post("/api/add", (req, res) => {
  let newPost = {
    userId: req.body.userId,
    category: req.body.category,
    title: req.body.title,
    details: req.body.details,
    imageURL: req.body.imageURL,
    imptURL: req.body.imptURL,
  };
  addPost(newPost)
    .then((submitResult) => res.json(submitResult))
    .catch((err) => res.json(err));
});

// delete a todo; works on postman, not on web.
router.delete("/api/delete", (req, res) => {
  deletePost(parseInt(req.body.postId))
    .then((delRes) => res.json(delRes))
    .catch((err) => res.json(err));
});

// edit a todo; works on postman, not on web.
router.patch("/api/update", (req, res) => {
  let updatedPost = {
    postId: req.body.postId,
    userId: req.body.userId,
    category: req.body.category,
    title: req.body.title,
    details: req.body.details,
    imageURL: req.body.imageURL,
    imptURL: req.body.imptURL,
  };
  editPost(updatedPost)
    .then((editRes) => res.json(editRes))
    .catch((err) => res.json(err));
});

module.exports = router;
