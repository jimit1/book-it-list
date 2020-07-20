const express = require("express");
const router = express.Router();
const db = require("../models");

// submit a new post
// /api/posts/new
router.post("/new", (req, res) => {
  db.Post.create({
    category: req.body.category,
    title: req.body.title,
    details: req.body.details,
    imageURL: req.body.imageURL,
    imptURL: req.body.imptURL,
    UserId: req.body.userId,
  }).then((newPost) => {
    res.send(newPost);
  });
});

// find all posts
// /api/posts/findall
router.get("/findall", (req, res) => {
  db.Post.findAll({
    include: [db.User],
  }).then((posts) => {
    res.send(posts);
  });
});

// find all posts by the user
// /api/posts/findbyuser/:id
router.get("/findbyuser/:id", (req, res) => {
  db.Post.findAll({
    where: { UserId: req.params.id },
    include: [db.User],
  }).then((posts) => {
    res.send(posts);
  });
});

// find one post by it's post id
// /api/posts/findpost/:id
router.get("/findpost/:id", (req, res) => {
  db.Post.findOne({
    where: { id: req.params.id },
    include: [db.User],
  }).then((posts) => {
    res.send(posts);
  });
});

// delete a post by it's id
// /api/posts/delete/:id
router.delete("/delete/:id", (req, res) => {
  db.Post.destroy({
    where: { id: req.params.id },
    include: [db.User],
  }).then(() => {
    res.send("deleted");
  });
});

// update a post by it's id
// /api/posts/update
router.patch("/update", (req, res) => {
  db.Post.update(
    {
      category: req.body.category,
      title: req.body.title,
      details: req.body.details,
      imageURL: req.body.imageURL,
      imptURL: req.body.imptURL,
    },
    { where: { id: req.body.id } }
  ).then(() => {
    res.send("Success");
  });
});

module.exports = router;
