const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./dbconnect");

const start = async () => {
  await db.connect();

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/home", require("./routes/home.js"));
  app.use("/anime", require("./routes/aniroute.js"));
  app.listen(5500, () => console.log("Nu flyger vi!"));
};

start();
