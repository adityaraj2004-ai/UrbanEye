import express from "express";
import {
  getMyProfile,
  getUserById,
  updateMyProfile,
  uploadAvatar,
  changePassword,
  deleteMyAccount,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  updateProfileValidator,
  changePasswordValidator,
} from "../validators/user.validator.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public route — view any user's profile
router.get("/:id", getUserById);

// All routes below require login
router.use(protect);

router.get("/me/profile", getMyProfile);
router.patch(
  "/me/profile",
  updateProfileValidator,
  validate,
  updateMyProfile
);
router.post(
  "/me/avatar",
  upload.single("avatar"), // single file upload
  uploadAvatar
);
router.patch(
  "/me/change-password",
  changePasswordValidator,
  validate,
  changePassword
);
router.delete("/me/account", deleteMyAccount);

export default router;