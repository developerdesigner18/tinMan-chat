import mongoose, { Schema, Types } from "mongoose";

const chatSchema = new Schema({
   members: {
      type: [Types.ObjectId],
      ref: "User",
   }
}, { timestamps: true })

export const Chat = mongoose.model("Chat", chatSchema);