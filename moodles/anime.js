const mongoose = require("mongoose");

const { Schema } = mongoose;

const animeSchema = new Schema({
  title: String,
  description: String,
  date: { type: date, default: Date.now },
  watched: Boolean,
  meta: {
    reviews: Number,
    favs: Number,
  },
});

module.exports = mongoose.model("Anime", animeSchema);
