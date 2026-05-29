import dotenv from "dotenv";
dotenv.config();

import "./config/env.js"; // validate env vars first
import http from "http";
import { Server } from "socket.io";
import app from "./App.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Socket.IO setup - we'll fill this in Phase 7
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Start server only after DB connects
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`UrbanEye server running on port ${PORT}`);
  });
});