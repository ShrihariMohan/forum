const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

require("./passport-setup");
require("./db.js");
var { User } = require("./models/users");

const app = express();

app.use((req, res, next) => {
  console.log(req.method);
  if (req.headers.origin !== undefined) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

// parse application/x-wnpmww-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: "forum-session",
    keys: ["key1", "key2"],
  })
);

// Auth middleware that checks if the user is logged in
const isLoggedIn = async (req, res, next) => {
  if (req.user) {
    const userInfo = req.user._json;
    const user = await User.findOne({ email: userInfo.email }).exec();
    if (user) {
      req.userId = user._id;
    }
    next();
  } else {
    res.sendStatus(401);
  }
};

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get("/good", isLoggedIn, (req, res) => {
  res.send(`Welcome mr ${req.user.displayName}!`);
});

// Auth Routes
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  async function (req, res) {
    const userInfo = req.user._json;
    const user = await User.findOne({ email: userInfo.email }).exec();
    if (!user) {
      await new User({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      }).save();
    }
    res.redirect("http://localhost:4200");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("http://localhost:4200/login");
});

app.use("/api/users", isLoggedIn, userController);
app.use("/api/post", isLoggedIn, postController);

app.listen(3500, () => console.log(`Example app listening on port ${3500}!`));
