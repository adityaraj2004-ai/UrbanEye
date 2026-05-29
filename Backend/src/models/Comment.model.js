import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      minlength: [1, "Comment cannot be empty"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },

    isActive: {
      type: Boolean,
      default: true, // soft delete - admin can hide comments
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast comment fetching by incident
commentSchema.index({ incident: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;