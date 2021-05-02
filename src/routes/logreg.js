const express = require("express");
const router = express.Router();
const User = require("../moodles/user.js");
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");
const usrvalidator = require("../validators/uservalidator.js");
const loginuser = require("../validators/loginuser.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();

router.post("/register", usrvalidator, async (req, res) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new FailRes(errors));
  }
  try {
    var exuser = await User.findOne({
      email: req.body.email,
    });
    if (exuser !== null) {
      return res.json(new ErrorRes("User with that email already exists"));
    }

    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    res.json(
      new SuccessRes({
        username: req.body.username,
        email: req.body.email,
      })
    );
  } catch (err) {
    console.log("Failed to register user", err);
    return res.json(
      new ErrorRes("Something went horribly wrong, try again later")
    );
  }
});

router.post("/login", loginuser, async (req, res) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new FailRes(errors));
  }
  try {
    var usr = await User.findOne({
      email: req.body.email,
    });
    if (usr === null) {
      return res.json(
        new FailRes({
          email: "email not found",
        })
      );
    }
    var validPassword = bcrypt.compareSync(req.body.password, usr.password);
    if (!validPassword) {
      return res.json(
        new FailRes({
          password: "invalid password",
        })
      );
    }
    var accesstoken = jwt.sign({ id: usr._id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    res.json(
      new SuccessRes({
        email: usr.email,
        username: usr.username,
        token: accesstoken,
      })
    );
  } catch (err) {
    console.log("Error loggin in", err);
    return res.json(
      new ErrorRes("Something went horribly wrong, please try again later")
    );
  }
});

module.exports = router;
