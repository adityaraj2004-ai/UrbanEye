import dotenv from "dotenv";
dotenv.config();

import "./config/env.js";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import { registerIncidentSocketHandlers } from "./sockets/incident.socket.js";
import { setIO } from "./services/socket.service.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  pingTimeout: 60000,
});

// Give socket.service.js access to io without it importing server.js
setIO(io);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  registerIncidentSocketHandlers(io, socket);

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id} | Reason: ${reason}`);
  });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`UrbanEye server running on port ${PORT}`);
    console.log(`Socket.IO ready`);
  });
});