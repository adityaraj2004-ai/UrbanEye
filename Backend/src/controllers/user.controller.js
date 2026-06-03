import * as userService from "../services/user.service.js";
import ApiResponse from "../utils/ApiResponse.js";

// -------------------------------------------------------
// GET MY PROFILE
// Returns currently logged in user's full profile
// -------------------------------------------------------
export const getMyProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user._id);
    res.status(200).json(
      new ApiResponse(200, { user }, "Profile fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------
// GET USER BY ID
// Public profile — anyone can view
// -------------------------------------------------------
export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.params.id);
    res.status(200).json(
      new ApiResponse(200, { user }, "User profile fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------
// UPDATE MY PROFILE
// -------------------------------------------------------
export const updateMyProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile({
      userId: req.user._id,
      body: req.body,
    });
    res.status(200).json(
      new ApiResponse(200, { user }, "Profile updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------
// UPLOAD AVATAR
// -------------------------------------------------------
export const uploadAvatar = async (req, res, next) => {
  try {
    const result = await userService.uploadAvatar({
      userId: req.user._id,
      file: req.file, // single file from multer
    });
    res.status(200).json(
      new ApiResponse(200, result, "Avatar uploaded successfully")
    );
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------
// CHANGE PASSWORD
// -------------------------------------------------------
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const result = await userService.changePassword({
      userId: req.user._id,
      currentPassword,
      newPassword,
    });

    res.status(200).json(new ApiResponse(200, result, result.message));
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------
// DELETE MY ACCOUNT
// -------------------------------------------------------
export const deleteMyAccount = async (req, res, next) => {
  try {
    const result = await userService.deleteAccount(req.user._id);

    // Clear refresh token cookie on account deletion
    res
      .status(200)
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, result, result.message));
  } catch (error) {
    next(error);
  }
};