const express = require("express");
const db = require("./dbconnect");
require("dotenv").config();
const helmet = require("helmet");
const start = async () => {
  await db.connect();
  const jsonErrorHandler = async (err, req, res, next) => {
    res.status(500).send({ error: "Error parsing JSON" });
  };

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(jsonErrorHandler);
  app.use("/anime", require("./routes/aniroute.js"));
  app.use("/user/", require("./routes/logreg.js"));
  app.use("*", require("./routes/notfound.js"));
  app.listen(process.env.PORT, () => console.log("Nu flyger vi!"));
};

start();
