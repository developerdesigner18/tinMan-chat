import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import http from 'http';
import { Server } from 'socket.io';
import jwt from "jsonwebtoken";
import { User } from "./modules/User/user.model.js";

const app = express();

app.use(cookieParser())

app.use(cors({
   origin: true,
   credentials: true
}))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: '*',
      methods: ["GET", "POST"],
   }
})

io.on("connection", async (socket) => {

   const { token } = socket.handshake.query;

   try {

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!decodedToken?._id) {
         throw new Error("Invalid token")
      }

      const user = await User.findById(decodedToken._id);

      if (!user) {
         throw new Error("Something went wrong")
      }

      socket.join(decodedToken._id);

   } catch (error) {
      socket.emit("unauthorized")
   }

   socket.on("disconnect", async () => {
      console.log("user disconnected");
   })
})

// routes import
import userRouter from "./modules/User/user.route.js";
import messageRouter from "./modules/Message/message.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);


// error middleware
app.use(errorMiddleware)

export { io, server };