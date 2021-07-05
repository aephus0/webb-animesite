import { Model, Document } from "mongoose";
import pkg from "mongoose";
const { Schema, model } = pkg;

export interface IAnime extends Document {
  aniId: string;
  title: string;
  description: string;
  date?: Date;
  finished?: boolean;
  meta?: { reviews: number; favs: number };
}

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

export const Anime: Model<IAnime> = model("Anime", animeSchema, "animes");

//module.exports = mongoose.model("Anime", animeSchema, "animes");
