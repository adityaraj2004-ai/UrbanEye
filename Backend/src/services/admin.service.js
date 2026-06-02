import Incident from "../models/Incident.model.js";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { deleteMultipleImages } from "./cloudinary.service.js";

// GET ALL INCIDENTS FOR ADMIN
// Admin sees everything including rejected/inactive
// More filters than public incident feed
export const adminGetAllIncidents = async (query) => {
  const {
    page = 1,
    limit = 10,
    category,
    severity,
    status,
    sortBy = "createdAt",
    order = "desc",
    search,
  } = query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Admin sees all incidents including inactive
  const filter = {};
  if (category) filter.category = category;
  if (severity) filter.severity = severity;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;

  const [incidents, total] = await Promise.all([
    Incident.find(filter)
      .populate("reportedBy", "fullName email avatar")
      .populate("reviewedBy", "fullName")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit)),

    Incident.countDocuments(filter),
  ]);

  return {
    incidents,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
      hasPrevPage: parseInt(page) > 1,
    },
  };
};

// UPDATE INCIDENT STATUS
// Core admin moderation action
// pending → verified → in_progress → resolved
// OR pending → rejected
export const updateIncidentStatus = async ({
  incidentId,
  status,
  adminNote,
  adminId,
}) => {
  const incident = await Incident.findById(incidentId);

  if (!incident) {
    throw new ApiError(404, "Incident not found");
  }

  const validStatuses = [
    "pending",
    "verified",
    "in_progress",
    "resolved",
    "rejected",
  ];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  incident.status = status;
  incident.reviewedBy = adminId;

  if (adminNote) {
    incident.adminNote = adminNote;
  }

  // If admin rejects — soft delete it
  if (status === "rejected") {
    incident.isActive = false;
  }

  await incident.save();
  await incident.populate("reportedBy", "fullName email avatar");
  await incident.populate("reviewedBy", "fullName");

  return incident;
};

// HARD DELETE INCIDENT (admin only)
// Permanently removes incident + cloudinary images
