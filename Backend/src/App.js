import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
// import analyticsRoutes from "./routes/analytics.routes.js";
// import adminRoutes from "./routes/admin.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter.middleware.js";


const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true, // needed for cookies (refresh token)
}));

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/users", apiLimiter, userRoutes);
app.use("/api/v1/incidents", apiLimiter, incidentRoutes);
// app.use("/api/v1/analytics", apiLimiter, analyticsRoutes);
// app.use("/api/v1/admin", apiLimiter, adminRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "UrbanEye API is running" });
});

// Global error handler - must be last
app.use(errorHandler);

export default app;