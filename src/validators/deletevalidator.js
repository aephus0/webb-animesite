const { body } = require("express-validator");

const deletevalidator = [
  body("aniId")
    .exists()
    .withMessage("ID was not provided")
    .isNumeric()
    .withMessage("ID is not a number")
    .isLength({ min: 5, max: 5 })
    .withMessage("Illegal length of ID"),
];

module.exports = deletevalidator;
