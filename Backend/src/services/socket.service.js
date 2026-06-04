import { io } from "../server.js";

// EMIT NEW INCIDENT
// Called after incident is created
// Sends to ALL connected users
// Every open map will show the new marker instantly
export const emitNewIncident = (incident) => {
  try {
    io.emit("new_incident", {
      _id: incident._id,
      title: incident.title,
      category: incident.category,
      severity: incident.severity,
      status: incident.status,
      location: incident.location,
      images: incident.images,
      reportedBy: incident.reportedBy,
      upvoteCount: incident.upvoteCount,
      createdAt: incident.createdAt,
    });
  } catch (error) {
    console.error("Socket emit error (new_incident):", error.message);
  }
};

// EMIT INCIDENT STATUS UPDATED
// Called when admin updates incident status
// Users watching that incident get live update
export const emitIncidentUpdated = (incident) => {
  try {
    io.emit("incident_updated", {
      _id: incident._id,
      status: incident.status,
      adminNote: incident.adminNote,
      severity: incident.severity,
      reviewedBy: incident.reviewedBy,
    });
  } catch (error) {
    console.error("Socket emit error (incident_updated):", error.message);
  }
};

// EMIT INCIDENT DELETED
// Called when incident is soft deleted
// Frontend removes marker from map
export const emitIncidentDeleted = (incidentId) => {
  try {
    io.emit("incident_deleted", { incidentId });
  } catch (error) {
    console.error("Socket emit error (incident_deleted):", error.message);
  }
};

// EMIT UPVOTE UPDATE
// Called when someone upvotes an incident
// Updates upvote count live on all clients
export const emitUpvoteUpdated = (incidentId, upvoteCount) => {
  try {
    io.emit("upvote_updated", { incidentId, upvoteCount });
  } catch (error) {
    console.error("Socket emit error (upvote_updated):", error.message);
  }
};