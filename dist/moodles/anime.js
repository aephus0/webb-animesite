import pkg from "mongoose";
const { Schema, model } = pkg;
const animeSchema = new Schema({
    aniId: String,
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
export const Anime = model("Anime", animeSchema, "animes");
//module.exports = mongoose.model("Anime", animeSchema, "animes");
