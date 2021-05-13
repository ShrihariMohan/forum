const Mongoose = require("mongoose");

const Post = Mongoose.model("Post", {
  content: String,
  createdBy: String,
  createdOn: Date,
  name: String,
  picture: String,
});

module.exports = { Post };
