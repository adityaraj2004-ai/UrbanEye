import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";

// Protect Middleware

export const protect = async (req, res, next) => {
  try {
    // Token comes in Authorization header as: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Access denied. Please login"));
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Get fresh user from DB
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return next(new ApiError(401, "User not found or deactivated"));
    }

    // Attach user to request — available in all downstream middleware/controllers
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Access token expired"));
    }
    return next(new ApiError(401, "Invalid access token"));
  }
};