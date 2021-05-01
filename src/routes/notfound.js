const express = require("express");
const router = express.Router();

const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");

router.all("/", async (req, res) => {
  return res.json(new ErrorRes("Not found"));
});

module.exports = router;
