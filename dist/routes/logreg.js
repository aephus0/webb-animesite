var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const router = express.Router();
const User = require("../moodles/user.js");
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");
const usrvalidator = require("../validators/uservalidator.js");
const loginuser = require("../validators/loginuser.js");
const validateBearer = require("../validators/bearervalidator.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const generate = require("../randomID.js");
require("dotenv").config();
router.use((req, res, next) => {
    console.log("Time: ", Date.now(), "request-type: ", req.method);
    next();
});
router.post("/register", usrvalidator, (req, res) => __awaiter(this, void 0, void 0, function* () {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(new FailRes(errors));
    }
    try {
        var exuser = yield User.findOne({
            email: req.body.email,
        });
        if (exuser !== null) {
            return res.json(new ErrorRes("User with that email already exists"));
        }
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            id: generate(6),
        });
        res.json(new SuccessRes({
            username: req.body.username,
            email: req.body.email,
        }));
    }
    catch (err) {
        console.log("Failed to register user", err);
        return res.json(new ErrorRes("Something went horribly wrong, try again later"));
    }
}));
router.post("/login", loginuser, (req, res) => __awaiter(this, void 0, void 0, function* () {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(new FailRes(errors));
    }
    try {
        var usr = yield User.findOne({
            email: req.body.email,
        });
        if (usr === null) {
            return res.json(new FailRes({
                email: "email not found",
            }));
        }
        var validPassword = bcrypt.compareSync(req.body.password, usr.password);
        if (!validPassword) {
            return res.json(new FailRes({
                password: "invalid password",
            }));
        }
        var accesstoken = jwt.sign({ id: usr._id }, process.env.SECRET, {
            expiresIn: 86400,
        });
        res.json(new SuccessRes({ accesstoken }));
    }
    catch (err) {
        console.log("Error loggin in", err);
        return res.json(new ErrorRes("Something went horribly wrong, please try again later"));
    }
}));
module.exports = router;
