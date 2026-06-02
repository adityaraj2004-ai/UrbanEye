import express from "express";
import {
  createIncident,
  getAllIncidents,
  getIncidentById,
  getMyIncidents,
  updateIncident,
  deleteIncident,
  toggleUpvote,
  getNearbyIncidents,
  getMapIncidents,
} from "../controllers/incident.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  createIncidentValidator,
  nearbyIncidentsValidator,
} from "../validators/incident.validator.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public routes — no login required
router.get("/", getAllIncidents);
router.get("/nearby", nearbyIncidentsValidator, validate, getNearbyIncidents);
router.get("/map", getMapIncidents);
router.get("/:id", getIncidentById);

// Protected routes — login required
router.use(protect); // all routes below this line require login

router.post(
  "/",
  upload.array("images", 4),       // handle image uploads
  createIncidentValidator,
  validate,
  createIncident
);

router.get("/user/my-reports", getMyIncidents);
router.patch("/:id", updateIncident);
router.delete("/:id", deleteIncident);
router.post("/:id/upvote", toggleUpvote);

export default router;