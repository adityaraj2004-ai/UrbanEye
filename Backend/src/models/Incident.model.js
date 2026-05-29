import mongoose from "mongoose";
import {
  INCIDENT_CATEGORIES,
  INCIDENT_STATUS,
  SEVERITY_LEVELS,
} from "../utils/constants.js";

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: INCIDENT_CATEGORIES,
    },

    severity: {
      type: String,
      required: [true, "Severity is required"],
      enum: Object.values(SEVERITY_LEVELS),
      default: SEVERITY_LEVELS.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(INCIDENT_STATUS),
      default: INCIDENT_STATUS.PENDING,
    },

    // -------------------------------------------------------
    // GEOSPATIAL FIELD - most important part of this model
    // GeoJSON Point format required by MongoDB
    // coordinates: [longitude, latitude] — NOTE: lng first, then lat
    // This is opposite of what most people expect — don't mix them up
    // -------------------------------------------------------
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: [true, "Location coordinates are required"],
        validate: {
          validator: function (coords) {
            // longitude: -180 to 180, latitude: -90 to 90
            return (
              coords.length === 2 &&
              coords[0] >= -180 &&
              coords[0] <= 180 &&
              coords[1] >= -90 &&
              coords[1] <= 90
            );
          },
          message: "Invalid coordinates",
        },
      },
    },

    // Human readable address (optional, from reverse geocoding later)
    address: {
      type: String,
      default: "",
      trim: true,
    },

    // Images array - cloudinary urls stored here
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true }, // needed to delete from cloudinary
      },
    ],

    // Who reported this incident
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Admin who reviewed it
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Admin notes when resolving/rejecting
    adminNote: {
      type: String,
      default: "",
      maxlength: [500, "Admin note cannot exceed 500 characters"],
    },

    // How many users upvoted this incident (confirms it's real)
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    upvoteCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// -------------------------------------------------------
// GEOSPATIAL INDEX — this is what makes nearby queries possible
// Without this index, MongoDB cannot do location-based searches
// 2dsphere = works on a spherical earth (accurate distances)
// -------------------------------------------------------
incidentSchema.index({ location: "2dsphere" });

// Other useful indexes for filtering and sorting
incidentSchema.index({ status: 1 });
incidentSchema.index({ category: 1 });
incidentSchema.index({ severity: 1 });
incidentSchema.index({ reportedBy: 1 });
incidentSchema.index({ createdAt: -1 }); // -1 = descending (newest first)

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;