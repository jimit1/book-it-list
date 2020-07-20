const express = require("express");
const router = express.Router();
const db = require("../models");

// creates a new settings for a given userId
// /api/settings/new
router.post("/new", (req, res) => {
  db.Settings.create({
    view: req.body.view,
    font: req.body.font,
    mode: req.body.mode,
    profileUrl: req.body.profileUrl,
    UserId: req.body.userId,
  }).then((newProfile) => {
    res.send(newProfile);
  });
});

// get a user's settings by their id
// /api/settings/find/:id
router.get("/find/:id", (req, res) => {
  db.Settings.findAll({
    where: { UserId: req.params.id },
    include: [db.User],
  }).then((settings) => {
    res.send(settings);
  });
});

// update a user's Settings
// /api/settings/update
router.patch("/update", (req, res) => {
  db.Settings.update(
    {
      view: req.body.view,
      font: req.body.font,
      mode: req.body.mode,
      profileUrl: req.body.profileUrl,
    },
    { where: { id: req.body.id } }
  ).then((settings) => {
    res.send(settings);
  });
});

module.exports = router;
