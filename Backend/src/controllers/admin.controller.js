import * as adminService from "../services/admin.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { emitIncidentUpdated } from "../services/socket.service.js";

export const getAllIncidents = async (req, res, next) => {
  try {
    const result = await adminService.adminGetAllIncidents(req.query);
    res.status(200).json(
      new ApiResponse(200, result, "All incidents fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const updateIncidentStatus = async (req, res, next) => {
  try {
    const { status, adminNote } = req.body;

    const incident = await adminService.updateIncidentStatus({
      incidentId: req.params.id,
      status,
      adminNote,
      adminId: req.user._id,
    });

    // Broadcast status change to all connected users
    // Incident cards on frontend update live
    emitIncidentUpdated(incident);

    res.status(200).json(
      new ApiResponse(
        200,
        { incident },
        "Incident status updated successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const hardDeleteIncident = async (req, res, next) => {
  try {
    const result = await adminService.hardDeleteIncident(req.params.id);
    res.status(200).json(new ApiResponse(200, result, result.message));
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const result = await adminService.adminGetAllUsers(req.query);
    res.status(200).json(
      new ApiResponse(200, result, "Users fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req, res, next) => {
  try {
    const result = await adminService.toggleUserStatus(req.params.id);
    res.status(200).json(new ApiResponse(200, result, result.message));
  } catch (error) {
    next(error);
  }
};

export const changeUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await adminService.changeUserRole({
      userId: req.params.id,
      role,
    });
    res.status(200).json(
      new ApiResponse(200, { user }, "User role updated successfully")
    );
  } catch (error) {
    next(error);
  }
};