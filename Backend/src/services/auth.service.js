import crypto from "crypto";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

// Register User
export const registerUser = async ({ fullName, email, password, phone }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  // Create user — password hashing happens automatically
  // via the pre-save middleware we wrote in User.model.js
  const user = await User.create({
    fullName,
    email,
    password,
    phone: phone || "",
  });

  // Return user without password
  const createdUser = await User.findById(user._id);
  return createdUser;
};

// Login User
export const loginUser = async ({ email, password }) => {
  // select("+password") because password has select:false in schema
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account has been deactivated");
  }

  // Use the comparePassword method we wrote in User model
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Update last login time
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Generate both tokens
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  // Return user without password
  const loggedInUser = await User.findById(user._id);
  return { user: loggedInUser, accessToken, refreshToken };
};


// Refresh Access Token
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  try {
    const jwt = await import("jsonwebtoken");
    const decoded = jwt.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user._id, user.role);
    return { accessToken: newAccessToken, user };
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};


// Forgot Password
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  // Always return same message even if user not found
  // This prevents email enumeration attacks
  if (!user) {
    return { message: "If this email exists, a reset link has been sent" };
  }

  // Generate raw token (sent to user)
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash it before storing (so DB leak doesn't expose tokens)
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save({ validateBeforeSave: false });

  // In production: send email with resetToken
  // For MVP: return token directly so you can test with Postman
  // Later replace this with nodemailer
  return {
    message: "Password reset token generated",
    resetToken, // REMOVE this in production - only for development testing
  };
};


// Reset Password
export const resetPassword = async (resetToken, password) => {
  // Hash the incoming token to compare with stored hash
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find user with matching token that hasn't expired
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }, // token must not be expired
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) {
    throw new ApiError(400, "Reset token is invalid or has expired");
  }

  // Update password — pre-save hook will hash it automatically
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: "Password reset successful" };
};