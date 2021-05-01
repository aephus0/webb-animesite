const { body } = require("express-validator");

const updateanime = [
  body("aniId")
    .exists()
    .withMessage("ID was not provided")
    .isNumeric()
    .withMessage("ID is not a number")
    .isLength({ min: 5, max: 5 })
    .withMessage("Illegal length of ID"),
  body("title")
    .isString()
    .withMessage("Title is not a string")
    .isLength({ min: 3, max: 32 })
    .withMessage("Illegal title length (Min: 3, Max: 32"),

  body("description")
    .isLength({ min: 50, max: 250 })
    .withMessage("Illegal description length (Min: 50, Max: 250")
    .isString()
    .withMessage("Description is not a string"),
];

module.exports = updateanime;
