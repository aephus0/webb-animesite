const { body } = require("express-validator");
const user = [
    body("email")
        .exists()
        .withMessage("No email was provided")
        .isEmail()
        .withMessage("Must be a valid email"),
    body("username")
        .exists()
        .withMessage("No username was provided")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 4, max: 12 })
        .withMessage("Username is too short (min: 4, max: 12)"),
    body("password")
        .exists()
        .withMessage("No password was provided")
        .isLength({ min: 6 })
        .withMessage("Password is too short (min: 6)"),
];
module.exports = user;
