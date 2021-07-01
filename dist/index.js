var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { connect } from "./dbconnect";
require("dotenv").config();
import * as helmet from "helmet";
import * as cors from "cors";
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connect();
    // Handles error thrown by JSON.parse() when the json is illegal
    const jsonErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(500).send({ error: "Error parsing JSON" });
    });
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
});
start();
