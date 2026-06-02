import Incident from "../models/Incident.model.js";
import ApiError from "../utils/ApiError.js";
import { uploadMultipleImages, deleteMultipleImages } from "./cloudinary.service.js";
import { getNearbyIncidents, getIncidentsInBoundingBox } from "./geospatial.service.js";


// CREATE INCIDENT

export const createIncident = async ({ body, files, userId }) => {
  const { title, description, category, severity, longitude, latitude, address } = body;

  // Upload images to cloudinary if any were attached
  let uploadedImages = [];
  if (files && files.length > 0) {
    uploadedImages = await uploadMultipleImages(files);
  }

  const incident = await Incident.create({
    title,
    description,
    category,
    severity,
    address: address || "",
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      // Note: MongoDB GeoJSON is [longitude, latitude] NOT [latitude, longitude]
    },
    images: uploadedImages,
    reportedBy: userId,
  });

  // Populate reporter info before returning
  await incident.populate("reportedBy", "fullName avatar");
  return incident;
};


// GET ALL INCIDENTS (with filtering + pagination)

export const getAllIncidents = async (query) => {
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

  // Build filter object dynamically
  // Only add filters that were actually provided
  const filter = { isActive: true };

  if (category) filter.category = category;
  if (severity) filter.severity = severity;
  if (status) filter.status = status;

  // Text search on title and description
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;

  // Run count and fetch simultaneously — faster than sequential
  const [incidents, total] = await Promise.all([
    Incident.find(filter)
      .populate("reportedBy", "fullName avatar")
      .select("-adminNote")
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

// GET SINGLE INCIDENT
export const getIncidentById = async (incidentId) => {
  const incident = await Incident.findOne({
    _id: incidentId,
    isActive: true,
  })
    .populate("reportedBy", "fullName avatar email")
    .populate("reviewedBy", "fullName");

  if (!incident) {
    throw new ApiError(404, "Incident not found");
  }

  return incident;
};

// GET MY INCIDENTS
// Returns incidents reported by logged in user
export const getMyIncidents = async ({ userId, query }) => {
  const { page = 1, limit = 10, status } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = { reportedBy: userId, isActive: true };
  if (status) filter.status = status;

  const [incidents, total] = await Promise.all([
    Incident.find(filter)
      .sort({ createdAt: -1 })
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
    },
  };
};

// UPDATE INCIDENT
// Only reporter can update, only if still pending
export const updateIncident = async ({ incidentId, userId, body }) => {
  const incident = await Incident.findOne({
    _id: incidentId,
    isActive: true,
  });

  if (!incident) {
    throw new ApiError(404, "Incident not found");
  }

  // Only the reporter can edit their incident
  if (incident.reportedBy.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only edit your own incidents");
  }

  // Can only edit if still pending — once verified/resolved, no edits
  if (incident.status !== "pending") {
    throw new ApiError(400, "Cannot edit incident after it has been reviewed");
  }

  const allowedUpdates = ["title", "description", "category", "severity", "address"];
  allowedUpdates.forEach((field) => {
    if (body[field] !== undefined) {
      incident[field] = body[field];
    }
  });

  await incident.save();
  await incident.populate("reportedBy", "fullName avatar");
  return incident;
};

// DELETE INCIDENT (soft delete)
export const deleteIncident = async ({ incidentId, userId, userRole }) => {
  const incident = await Incident.findOne({
    _id: incidentId,
    isActive: true,
  });

  if (!incident) {
    throw new ApiError(404, "Incident not found");
  }

  // Admin can delete any incident, citizen only their own
  if (
    userRole !== "admin" &&
    incident.reportedBy.toString() !== userId.toString()
  ) {
    throw new ApiError(403, "You can only delete your own incidents");
  }

  // Soft delete — keeps data for analytics
  incident.isActive = false;
  await incident.save();

  // Delete images from cloudinary
  if (incident.images.length > 0) {
    await deleteMultipleImages(incident.images);
  }

  return { message: "Incident deleted successfully" };
};

// UPVOTE INCIDENT
// Toggle upvote — if already upvoted, remove it
export const toggleUpvote = async ({ incidentId, userId }) => {
  const incident = await Incident.findOne({
    _id: incidentId,
    isActive: true,
  });

  if (!incident) {
    throw new ApiError(404, "Incident not found");
  }

  const alreadyUpvoted = incident.upvotes.includes(userId);

  if (alreadyUpvoted) {
    // Remove upvote
    incident.upvotes = incident.upvotes.filter(
      (id) => id.toString() !== userId.toString()
    );
    incident.upvoteCount = Math.max(0, incident.upvoteCount - 1);
  } else {
    // Add upvote
    incident.upvotes.push(userId);
    incident.upvoteCount += 1;
  }

  await incident.save();
  return {
    upvoteCount: incident.upvoteCount,
    isUpvoted: !alreadyUpvoted,
  };
};

// NEARBY INCIDENTS — delegates to geospatial service
export const fetchNearbyIncidents = async (params) => {
  return await getNearbyIncidents(params);
};

// MAP INCIDENTS — delegates to geospatial service
export const fetchMapIncidents = async (params) => {
  return await getIncidentsInBoundingBox(params);
};