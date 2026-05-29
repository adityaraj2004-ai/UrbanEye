import rateLimit from "express-rate-limit";

// General API limiter — applied to all routes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 mins per IP
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for auth routes — prevents brute force attacks
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // only 10 login/register attempts per 15 mins
  message: {
    success: false,
    message: "Too many auth attempts, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});