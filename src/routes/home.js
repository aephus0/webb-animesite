const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now(), "request-type: ", req.method);
  next();
});

router.get("/", (req, res) => {
  res.send("Response successful!");
});

module.exports = router;
