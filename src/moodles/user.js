const mongoose = require("mongoose");

const { Schema } = mongoose;

const userShchema = new Schema({
  username: String,
  email: String,
});

module.exports = mongoose.model("User", userShchema);
