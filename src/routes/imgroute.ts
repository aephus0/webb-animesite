/*const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");
const Image = require("../moodles/images.js");
const multer = require("multer");
const { model } = require("mongoose");
const upload = multer({ dest: "../public/img" });
router.get("/upload", (req, res, next) => {
  console.log("its working");
});
router.post("/upload", upload.single("avatar"), (req, res, next) => {
  console.log(req.file.filename);
  console.log(req.file.size);
});

module.exports = router;
*/
