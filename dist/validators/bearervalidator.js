var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require("jsonwebtoken");
const User = require("../moodles/user.js");
require("dotenv").config();
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");
const validateBearer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const bearHeader = req.headers["authorization"];
    try {
        if (bearHeader) {
            const token = bearHeader.split(" ")[1];
            console.log(token);
            try {
                const legittoken = jwt.verify(token, process.env.SECRET);
                const user = yield User.findOne({
                    _id: legittoken.id,
                });
                if (user === null)
                    return res.json(new ErrorRes("Illegal user"));
            }
            catch (err) {
                console.log("error verifying JWT", err);
                return res.json(new ErrorRes("Invalid token: ", token));
            }
            req.token = token;
            next();
            return;
        }
        res.json(new FailRes({
            authorization: "No bearer was provided",
        }));
    }
    catch (err) {
        console.log("error during authorization", err);
        return res.json(new ErrorRes("Something went horribly wrong, please try again later"));
    }
});
module.exports = validateBearer;
