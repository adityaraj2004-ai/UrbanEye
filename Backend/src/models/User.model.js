import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "../utils/constants.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // never returned in queries by default - security
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CITIZEN,
    },

    avatar: {
      type: String,
      default: "", // cloudinary url will be stored here
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    // For forgot password flow
    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpires: {
      type: Date,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true, // admin can deactivate users
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
);

// -------------------------------------------------------
// MIDDLEWARE: Hash password before saving
// This runs automatically before every .save() call
// -------------------------------------------------------
userSchema.pre("save", async function (next) {
  // Only hash if password was actually changed
  // Prevents re-hashing on profile updates
  if (!this.isModified("password")) return next;

  this.password = await bcrypt.hash(this.password, 12);
  next;
});

// -------------------------------------------------------
// METHOD: Compare entered password with hashed password
// Called during login - returns true/false
// -------------------------------------------------------
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;