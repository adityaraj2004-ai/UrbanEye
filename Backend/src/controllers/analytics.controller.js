import * as analyticsService from "../services/analytics.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getOverviewStats = async (req, res, next) => {
  try {
    const stats = await analyticsService.getOverviewStats();
    res.status(200).json(
      new ApiResponse(200, stats, "Overview stats fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getIncidentsByCategory = async (req, res, next) => {
  try {
    const data = await analyticsService.getIncidentsByCategory();
    res.status(200).json(
      new ApiResponse(200, data, "Category analytics fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const getIncidentsBySeverity = async (req, res, next) => {
  try {
    const data = await analyticsService.getIncidentsBySeverity();
    res.status(200).json(
      new ApiResponse(200, data, "Severity analytics fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};
