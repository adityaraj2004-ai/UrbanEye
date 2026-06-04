import dotenv from "dotenv";
dotenv.config();

import "./config/env.js";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import { registerIncidentSocketHandlers } from "./sockets/incident.socket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// SOCKET.IO SERVER SETUP
// Exported so socket.service.js can import and use io
// to emit events from anywhere in the backend
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  // How long to wait before giving up on reconnection
  pingTimeout: 60000,
});

// SOCKET CONNECTION HANDLER
// Runs every time a new user connects
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Register all incident related socket handlers
  registerIncidentSocketHandlers(io, socket);

  // DISCONNECT
  // Runs when user closes tab or loses connection
  // Socket.IO handles cleanup automatically  
  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id} | Reason: ${reason}`);
  });
});

// Start server after DB connects
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`UrbanEye server running on port ${PORT}`);
    console.log(`Socket.IO ready`);
  });
});