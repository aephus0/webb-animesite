import express from "express";
const router = express.Router();
import { User } from "../moodles/user.js";
import { ErrorRes, SuccessRes, FailRes } from "../responses.js";
import usrvalidator from "../validators/uservalidator.js";
import loginuser from "../validators/loginuser.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generate from "../randomID.js";
import * as dotenv from "dotenv";
dotenv.config();
router.use((req, res, next) => {
    console.log("Time: ", Date.now(), "request-type: ", req.method);
    next();
});
router.post("/register", usrvalidator, async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(new FailRes("Fail", errors));
    }
    try {
        var exuser = await User.findOne({
            email: req.body.email,
        });
        if (exuser !== null) {
            return res.json(new ErrorRes("User with that email already exists"));
        }
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            id: generate(6),
        });
        res.json(new SuccessRes("Success", {
            username: user.username,
            email: user.email,
        }));
    }
    catch (err) {
        console.log("Failed to register user", err);
        return res.json(new ErrorRes("Something went horribly wrong, try again later"));
    }
});
router.post("/login", loginuser, async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(new FailRes("Fail", errors));
    }
    try {
        var usr = await User.findOne({
            email: req.body.email,
        });
        if (usr === null) {
            return res.json(new FailRes("Fail", {
                email: "email not found",
            }));
        }
        var validPassword = bcrypt.compareSync(req.body.password, usr.password);
        if (!validPassword) {
            return res.json(new FailRes("Fail", {
                password: "invalid password",
            }));
        }
        let accesstoken = jwt.sign({ id: usr._id }, process.env.SECRET, {
            expiresIn: 86400,
        });
        res.json(new SuccessRes("Success", { accesstoken }));
    }
    catch (err) {
        console.log("Error loggin in", err);
        return res.json(new ErrorRes("Something went horribly wrong, please try again later"));
    }
});
export default router;
