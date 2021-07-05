import { body } from "express-validator";

const loginuser = [
  body("email")
    .exists()
    .withMessage("No email was provided")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password").exists().withMessage("No password was provided"),
];

export default loginuser;
