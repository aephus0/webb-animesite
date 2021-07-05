import { Model, Document } from "mongoose";
import pkg from "mongoose";
const { Schema, model } = pkg;

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  id: string;
  _id: string;
}

const userShchema = new Schema({
  username: String,
  email: String,
  password: String,
  isVerified: Boolean,
  id: String,
});

export const User: Model<IUser> = model("User", userShchema, "users");
