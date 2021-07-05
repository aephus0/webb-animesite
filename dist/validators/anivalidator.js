import { body } from "express-validator";
const newanimeitem = [
    body("title")
        .exists()
        .withMessage("No title was provided")
        .isString()
        .withMessage("Title is not a string")
        .isLength({ min: 3, max: 50 })
        .withMessage("Illegal title length (Min: 3, Max: 32"),
    body("description")
        .optional()
        .isLength({ min: 50, max: 250 })
        .withMessage("Illegal description length (Min: 50, Max: 250")
        .isString()
        .withMessage("Description is not a string"),
];
export default newanimeitem;
