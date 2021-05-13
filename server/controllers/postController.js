const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { Post } = require("../models/posts");
var { User } = require("../models/users");

router.get("/", (req, res) => {
  Post.find({ createdBy: req.userId }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error", err);
    }
  });
});

router.get("/follower", async (req, res) => {
  const user = await User.findById(req.userId);
  user.followers = [...user.followers, req.userId];
  Post.find({ createdBy: { $in: user.followers } })
    .sort({ createdOn: -1 })
    .exec((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log("Error", err);
      }
    });
});

router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.createdBy == req.userId) {
    await Post.deleteOne({ _id: req.params.id });
  }
  return res.send();
});

router.post("/", (req, res) => {
  const obj = new Post({
    content: req.body.content,
    name: req.body.name,
    picture: req.body.picture,
    createdBy: req.userId,
    createdOn: new Date(),
  });
  obj.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error");
    }
  });
});

module.exports = router;
