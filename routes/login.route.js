const express = require("express");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const loginRouter = express.Router();
const userModel = require(path.join(__dirname, "..", "models/user.model"));

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function verify(username, password, cb) {
      const userDatabase = await userModel.check(username);
      if (!userDatabase) {
        return cb(null, false);
      }
      bcrypt.compare(password, userDatabase.password, function (error, result) {
        if (error) return cb(err);
        if (!result) {
          return cb(null, false);
        }
        return cb(null, userDatabase);
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

loginRouter.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "public/index.html"));
});

loginRouter.post("/", passport.authenticate("local"), (request, response) => {
  const user = request.body;

  request.session.user = user.email;

  request.session.save((err) => {
    if (err) {
      return response.status(404).json({
        message: "An error ocurred",
      });
    }

    response.status(200).json({
      message: "Login successful",
    });
  });
});

loginRouter.get("/user", (request, response) => {
  response.status(200).json({
    message: "User found!",
    user: request.session.user,
  });
});

module.exports = loginRouter;
