const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://megaadmin:Ntiuser123@cluster0.b9g4b.mongodb.net/test"
);
const app = express();

app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
app.get("/request-type", (req, res, next) => {
  console.log("Request type: ", req.method);
  next();
});
app.get("/", (req, res) => {
  res.send("Response successful!");
});
app.listen(5500, () => console.log("Nu flyger vi!"));
