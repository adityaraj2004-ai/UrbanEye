import { io } from "socket.io-client";


// SINGLE SOCKET INSTANCE
// Created once, shared across entire app via SocketContext
// autoConnect false — we connect manually after login

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,           // auto reconnect if connection drops
  reconnectionAttempts: 5,      // try 5 times before giving up
  reconnectionDelay: 1000,      // wait 1 second between attempts
});

// Debug socket events in development
if (import.meta.env.DEV) {
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });
}

export default socket;