const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  id: String,
  url: String,
});

module.exports = mongoose.model("Image", imageSchema, "images");