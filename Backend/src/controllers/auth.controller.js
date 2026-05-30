import * as authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

// Cookie options — same for all routes
const cookieOptions = {
  httpOnly: true,   // JS cannot access this cookie — XSS protection
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};


// Register User
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const user = await authService.registerUser({ fullName, email, password, phone });

    res.status(201).json(
      new ApiResponse(201, { user }, "Account created successfully")
    );
  } catch (error) {
    next(error);
  }
};


// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginUser({
      email,
      password,
    });

    // Refresh token goes in httpOnly cookie
    // Access token goes in response body — frontend stores in memory
    res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, { user, accessToken }, "Logged in successfully")
      );
  } catch (error) {
    next(error);
  }
};


// Logout User
export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, {}, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};


// Refresh Access Token
export const refreshToken = async (req, res, next) => {
  try {
    // Refresh token comes from cookie automatically
    const incomingRefreshToken = req.cookies.refreshToken;

    const { accessToken, user } = await authService.refreshAccessToken(
      incomingRefreshToken
    );

    res.status(200).json(
      new ApiResponse(200, { accessToken, user }, "Token refreshed")
    );
  } catch (error) {
    next(error);
  }
};


// Get Current User
export const getMe = async (req, res, next) => {
  try {
    // req.user is already attached by protect middleware
    res.status(200).json(
      new ApiResponse(200, { user: req.user }, "User fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};



// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await authService.forgotPassword(email);

    res.status(200).json(new ApiResponse(200, result, result.message));
  } catch (error) {
    next(error);
  }
};


// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    // Token comes from URL params: /reset-password/:token
    const { token } = req.params;
    const { password } = req.body;

    const result = await authService.resetPassword(token, password);

    res.status(200).json(new ApiResponse(200, result, result.message));
  } catch (error) {
    next(error);
  }
};