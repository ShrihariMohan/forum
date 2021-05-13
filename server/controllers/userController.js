const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { User } = require("../models/users");
console.log(ObjectId);

router.get("/", async (req, res) => {
  const data = await User.find({ _id: { $ne: req.userId } });
  res.send(data);
});

router.get("/follower/:id", async (req, res) => {
  console.log(req.params);
  User.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.sendStatus(401);
    }
  });
  res.send(data);
});

router.get("/me", async (req, res) => {
  const data = req.user._json;
  const user = await User.findOne({ email: data.email }).exec();
  console.log(user);
  res.send(user);
});

router.put("/update", async (req, res) => {
  const data = req.body;
  const user = await User.updateOne(
    { _id: req.userId },
    { about: data.about }
  ).exec();
  console.log("Updated", user);
  res.send(user);
});

router.put("/follower", async (req, res) => {
  const data = req.body;
  const user = await User.findById(req.userId);
  user.followers.addToSet(data.followerId);
  await user.save();
  console.log("Updated", user);
  res.send(user);
});

router.delete("/follower/:id", async (req, res) => {
  const user = await User.findById(req.userId);
  user.followers.pull(req.params.id);
  user.save();
  console.log("Updated", user);
  res.send(user);
});

module.exports = router;
