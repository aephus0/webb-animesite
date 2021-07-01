const mongoose = require("mongoose");
const { Schema } = mongoose;
const animeSchema = new Schema({
    aniId: Number,
    title: String,
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
    finished: { type: Boolean, default: false },
    meta: {
        reviews: { type: Number, default: 0 },
        favs: { type: Number, default: 0 },
    },
});
module.exports = mongoose.model("Anime", animeSchema, "animes");
