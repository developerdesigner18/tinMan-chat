import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
   nickname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
   }
}, { timestamps: true })

userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      { _id: this._id, nickname: this.nickname },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

export const User = mongoose.model("User", userSchema);