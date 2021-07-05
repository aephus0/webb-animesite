import express from "express";
import connect from "./dbconnect.js";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import aniroute from "./routes/aniroute.js";
import logreg from "./routes/logreg.js";
import notfound from "./routes/notfound.js";
dotenv.config();
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
    app.use("/anime", aniroute);
    app.use("/user/", logreg);
    //app.use("/user/avatar", require("./routes/imgroute.js"));
    app.use("*", notfound);
    app.listen(process.env.PORT || 3000, () => console.log("Nu flyger vi!"));
};
start();
