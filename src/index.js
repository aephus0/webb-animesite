const express = require("express");
const db = require("./dbconnect");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
const start = async () => {
  await db.connect();
  // Handles error thrown by JSON.parse() when the json is illegal
  const jsonErrorHandler = async (err, req, res, next) => {
    res.status(500).send({ error: "Error parsing JSON" });
  };

  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(jsonErrorHandler);
  app.use("/anime", require("./routes/aniroute.js"));
  app.use("/user/", require("./routes/logreg.js"));
  //app.use("/user/avatar", require("./routes/imgroute.js"));
  app.use("*", require("./routes/notfound.js"));
  app.listen(process.env.PORT, () => console.log("Nu flyger vi!"));
};

start();
