const { body } = require("express-validator");

const loginuser = [
  body("email")
    .exists()
    .withMessage("No email was provided")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password").exists().withMessage("No password was provided"),
];

module.exports = loginuser;
