const mongoose = require("mongoose");

const { Schema } = mongoose;

const animeSchema = new Schema({
  aniId: Number,
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  finished: { type: Boolean, default: false },
  meta: {
    reviews: Number,
    favs: Number,
  },
});

module.exports = mongoose.model("Anime", animeSchema, "animelist");
