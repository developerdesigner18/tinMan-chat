import mongoose from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Chat } from "../Chat/chat.model.js";
import { Message } from "./message.model.js";
import { io } from "../../main.js";

const getMessages = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const { personId } = req.params;

   if (!mongoose.isValidObjectId(personId)) {
      throw new ApiError(404, `Chat not found`);
   }

   const chat = await Chat.findOne({ members: { $all: [userId, personId] } });

   if (!chat) {
      return res.status(200).json(
         new ApiResponse(200, { messages: [] }, "All messages fetched successfully")
      )
   }

   const messages = (await Message.find({ chat: chat._id }).populate("sender").sort({ createdAt: -1 })).reverse()

   return res.status(200).json(
      new ApiResponse(200, { messages }, "All messages fetched successfully")
   )
})

const sendMessage = asyncHandler(async (req, res) => {
   const userId = req.user._id;
   const { personId } = req.params;
   const { text } = req.body;

   if (!text || !text.trim()) {
      throw new ApiError(400, `message cannot be empty`);
   }

   if (!mongoose.isValidObjectId(personId)) {
      throw new ApiError(404, `Chat not found`);
   }

   let chat = await Chat.findOne({ members: { $all: [userId, personId] } });

   if (!chat) {
      const members = [userId, personId];
      chat = await Chat.create({ members });
   }

   const newMessage = await Message.create({
      text,
      chat: chat._id,
      sender: userId,
      reciever: personId
   })

   if (!newMessage) {
      throw new ApiError(500, `Unable to send message`);
   }

   const message = await newMessage.populate("sender");

   if (!message) {
      throw new ApiError(500, `Unable to send message`);
   }

   chat.members.forEach((member) => {
      io.to(member.toString()).emit("new-message", { message, chat });
   })

   return res.status(201).json(
      new ApiResponse(201, { chat, message }, "Message sent successfully")
   )
})

export {
   getMessages,
   sendMessage,
}