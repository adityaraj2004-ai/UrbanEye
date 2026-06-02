import * as incidentService from "../services/incident.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createIncident = async (req, res, next) => {
  try {
    const incident = await incidentService.createIncident({
      body: req.body,
      files: req.files,
      userId: req.user._id,
    });

    // After creating, emit socket event 
    // req.io.emit("new_incident", incident);

    res.status(201).json(
      new ApiResponse(201, { incident }, "Incident reported successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getAllIncidents = async (req, res, next) => {
  try {
    const result = await incidentService.getAllIncidents(req.query);
    res.status(200).json(
      new ApiResponse(200, result, "Incidents fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getIncidentById = async (req, res, next) => {
  try {
    const incident = await incidentService.getIncidentById(req.params.id);
    res.status(200).json(
      new ApiResponse(200, { incident }, "Incident fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getMyIncidents = async (req, res, next) => {
  try {
    const result = await incidentService.getMyIncidents({
      userId: req.user._id,
      query: req.query,
    });
    res.status(200).json(
      new ApiResponse(200, result, "Your incidents fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const updateIncident = async (req, res, next) => {
  try {
    const incident = await incidentService.updateIncident({
      incidentId: req.params.id,
      userId: req.user._id,
      body: req.body,
    });
    res.status(200).json(
      new ApiResponse(200, { incident }, "Incident updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const deleteIncident = async (req, res, next) => {
  try {
    const result = await incidentService.deleteIncident({
      incidentId: req.params.id,
      userId: req.user._id,
      userRole: req.user.role,
    });
    res.status(200).json(new ApiResponse(200, result, result.message));
  } catch (error) {
    next(error);
  }
};

export const toggleUpvote = async (req, res, next) => {
  try {
    const result = await incidentService.toggleUpvote({
      incidentId: req.params.id,
      userId: req.user._id,
    });
    res.status(200).json(
      new ApiResponse(200, result, "Upvote updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getNearbyIncidents = async (req, res, next) => {
  try {
    const { longitude, latitude, radius, limit, page } = req.query;
    const incidents = await incidentService.fetchNearbyIncidents({
      longitude,
      latitude,
      radiusKm: radius,
      limit,
      page,
    });
    res.status(200).json(
      new ApiResponse(200, { incidents }, "Nearby incidents fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getMapIncidents = async (req, res, next) => {
  try {
    const { northEastLat, northEastLng, southWestLat, southWestLng } = req.query;
    const incidents = await incidentService.fetchMapIncidents({
      northEastLat,
      northEastLng,
      southWestLat,
      southWestLng,
    });
    res.status(200).json(
      new ApiResponse(200, { incidents }, "Map incidents fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};