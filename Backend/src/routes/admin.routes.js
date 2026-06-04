import express from "express";
import {
  getAllIncidents,
  updateIncidentStatus,
  hardDeleteIncident,
  getAllUsers,
  toggleUserStatus,
  changeUserRole,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";

const router = express.Router();

// All admin routes require admin login
router.use(protect);
router.use(restrictTo("admin"));

// Incident management
router.get("/incidents", getAllIncidents);
router.patch("/incidents/:id/status", updateIncidentStatus);
router.delete("/incidents/:id", hardDeleteIncident);

// User management
router.get("/users", getAllUsers);
router.patch("/users/:id/toggle-status", toggleUserStatus);
router.patch("/users/:id/role", changeUserRole);

export default router;