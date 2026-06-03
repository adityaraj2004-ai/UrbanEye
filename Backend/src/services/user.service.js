import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage, deleteImage } from "./cloudinary.service.js";

// -------------------------------------------------------
// GET USER PROFILE
// Returns public profile of any user by their ID
// -------------------------------------------------------
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select(
    "-resetPasswordToken -resetPasswordExpires"
  );

  if (!user || !user.isActive) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

// -------------------------------------------------------
// UPDATE PROFILE
// Only fullName and phone can be updated here
// Email update requires separate verification flow (v2)
// -------------------------------------------------------
export const updateProfile = async ({ userId, body }) => {
  const { fullName, phone } = body;

  // Build update object with only provided fields
  const updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (phone !== undefined) updateData.phone = phone;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    {
      new: true,           // return updated document
      runValidators: true, // run schema validators on update
    }
  ).select("-resetPasswordToken -resetPasswordExpires");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

// -------------------------------------------------------
// UPLOAD AVATAR
// Uploads new avatar to cloudinary
// Deletes old avatar from cloudinary if exists
// -------------------------------------------------------
export const uploadAvatar = async ({ userId, file }) => {
  if (!file) {
    throw new ApiError(400, "No image file provided");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Delete old avatar from cloudinary if it exists
  // Extract publicId from old avatar url
  if (user.avatar) {
    try {
      // Cloudinary public IDs are in format: urbaneye/avatars/filename
      const urlParts = user.avatar.split("/");
      const publicIdWithExtension = urlParts.slice(-2).join("/");
      const publicId = publicIdWithExtension.split(".")[0];
      await deleteImage(publicId);
    } catch (error) {
      // Don't block avatar update if old deletion fails
      console.error("Old avatar deletion failed:", error.message);
    }
  }

  // Upload new avatar to cloudinary
  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;

  const { default: cloudinary } = await import("../config/cloudinary.js");

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataUri,
      {
        folder: "urbaneye/avatars",
        resource_type: "image",
        transformation: [
          { width: 300, height: 300, crop: "fill", gravity: "face" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) reject(new ApiError(500, "Avatar upload failed"));
        else resolve(result);
      }
    );
  });

  // Save new avatar url to user
  user.avatar = result.secure_url;
  await user.save({ validateBeforeSave: false });

  return { avatar: user.avatar };
};

// -------------------------------------------------------
// CHANGE PASSWORD
// Requires current password verification first
// -------------------------------------------------------
export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  // select("+password") because password is select:false in schema
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Verify current password before allowing change
  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordCorrect) {
    throw new ApiError(400, "Current password is incorrect");
  }

  // Prevent using same password
  const isSamePassword = await user.comparePassword(newPassword);
  if (isSamePassword) {
    throw new ApiError(400, "New password cannot be same as current password");
  }

  // Pre-save hook will hash the new password automatically
  user.password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

// -------------------------------------------------------
// DELETE ACCOUNT (soft delete)
// User can delete their own account
// Data is preserved for analytics
// -------------------------------------------------------
export const deleteAccount = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isActive = false;
  await user.save({ validateBeforeSave: false });

  return { message: "Account deleted successfully" };
};