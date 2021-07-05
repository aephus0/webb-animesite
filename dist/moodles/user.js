import pkg from "mongoose";
const { Schema, model } = pkg;
const userShchema = new Schema({
    username: String,
    email: String,
    password: String,
    isVerified: Boolean,
    id: String,
});
export const User = model("User", userShchema, "users");
