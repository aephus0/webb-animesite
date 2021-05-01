const { body } = require("express-validator");

const newanimeitem = [
  body("title")
    .exists()
    .withMessage("No title was provided")
    .isLength({ min: 3, max: 32 })
    .withMessage("Illegal title length (Min: 3, Max: 32"),
];

module.exports = newanimeitem;
