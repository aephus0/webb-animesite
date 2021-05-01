const mongoose = require("mongoose");
require("dotenv").config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DATABASE_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connetion to MongoDB failed", err);
  }
};

module.exports = { connect };
