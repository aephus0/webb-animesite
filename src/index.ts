declare function require(path: string): any;

import express from "express";
import { connect } from "./dbconnect";
require("dotenv").config();

import * as helmet from "helmet";
import * as cors from "cors";
import * as multer from "multer";

const start = async () => {
  await connect();
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
  app.listen(process.env.PORT || 3000, () => console.log("Nu flyger vi!"));
};

start();
