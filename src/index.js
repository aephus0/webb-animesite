const express = require("express");
const db = require("./dbconnect");
require("dotenv").config();
const start = async () => {
  await db.connect();

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("*", require("./routes/notfound.js"));
  app.use("/anime", require("./routes/aniroute.js"));
  app.listen(process.env.PORT, () => console.log("Nu flyger vi!"));
};

start();
