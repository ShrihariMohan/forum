const Mongoose = require("mongoose");

var User = Mongoose.model("User", {
  name: String,
  email: String,
  picture: String,
  about: String,
  followers: [String],
});

module.exports = { User };
