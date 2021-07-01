const mongoose = require("mongoose");
const { animeSchema } = require("./anime.js");
const { Schema } = mongoose;
const anilistSchema = new Schema({
    title: String,
});
module.exports = mongoose.model("AniList", anilistSchema, "animelist");
