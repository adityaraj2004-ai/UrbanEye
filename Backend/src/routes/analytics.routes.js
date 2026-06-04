import express from "express";
import {
  getOverviewStats,
  getIncidentsByCategory,
  getIncidentsBySeverity,
  getIncidentsTrend,
  getIncidentsByStatus,
  getTopReporters,
  getDangerousZones,
} from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";

const router = express.Router();

// All analytics routes require admin login
router.use(protect);
router.use(restrictTo("admin"));

router.get("/overview", getOverviewStats);
router.get("/by-category", getIncidentsByCategory);
router.get("/by-severity", getIncidentsBySeverity);
router.get("/by-status", getIncidentsByStatus);
router.get("/trend", getIncidentsTrend);
router.get("/top-reporters", getTopReporters);
router.get("/dangerous-zones", getDangerousZones);

export default router;