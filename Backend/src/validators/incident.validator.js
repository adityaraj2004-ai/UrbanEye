import { body, query } from "express-validator";
import { INCIDENT_CATEGORIES, SEVERITY_LEVELS } from "../utils/constants.js";

export const createIncidentValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 5, max: 100 }).withMessage("Title must be 5-100 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10, max: 1000 }).withMessage("Description must be 10-1000 characters"),

  body("category")
    .notEmpty().withMessage("Category is required")
    .isIn(INCIDENT_CATEGORIES).withMessage("Invalid category"),

  body("severity")
    .notEmpty().withMessage("Severity is required")
    .isIn(Object.values(SEVERITY_LEVELS)).withMessage("Invalid severity"),

  body("longitude")
    .notEmpty().withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),

  body("latitude")
    .notEmpty().withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage("Address cannot exceed 200 characters"),
];

export const nearbyIncidentsValidator = [
  query("longitude")
    .notEmpty().withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude"),

  query("latitude")
    .notEmpty().withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),

  query("radius")
    .optional()
    .isFloat({ min: 0.1, max: 50 }).withMessage("Radius must be between 0.1 and 50 km"),
];