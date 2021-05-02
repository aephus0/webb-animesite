const mongoose = require("mongoose");

const { Schema } = mongoose;

const userShchema = new Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userShchema, "users");
