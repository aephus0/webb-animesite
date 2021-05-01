const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  });
  console.log("Connected to MongoDB");
};

module.exports = { connect };
