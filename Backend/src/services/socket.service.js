// Module-level variable holding the io instance
// Set once from server.js after Socket.IO initializes
// This avoids a circular import between server.js and this file
let ioInstance = null;

export const setIO = (io) => {
  ioInstance = io;
};

// EMIT NEW INCIDENT
// Called after incident is created
// Sends to ALL connected users
// Every open map will show the new marker instantly
export const emitNewIncident = (incident) => {
  try {
    if (!ioInstance) return;
    ioInstance.emit("new_incident", {
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
    if (!ioInstance) return;
    ioInstance.emit("incident_updated", {
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
    if (!ioInstance) return;
    ioInstance.emit("incident_deleted", { incidentId });
  } catch (error) {
    console.error("Socket emit error (incident_deleted):", error.message);
  }
};

// EMIT UPVOTE UPDATE
// Called when someone upvotes an incident
// Updates upvote count live on all clients
export const emitUpvoteUpdated = (incidentId, upvoteCount) => {
  try {
    if (!ioInstance) return;
    ioInstance.emit("upvote_updated", { incidentId, upvoteCount });
  } catch (error) {
    console.error("Socket emit error (upvote_updated):", error.message);
  }
};