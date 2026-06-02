import Incident from "../models/Incident.model.js";
import User from "../models/User.model.js";

// OVERVIEW STATS
// The 4 stat cards on admin dashboard
// Total incidents, pending, resolved, total users
export const getOverviewStats = async () => {
  // Run all queries simultaneously — much faster than sequential
  const [
    totalIncidents,
    pendingIncidents,
    resolvedIncidents,
    rejectedIncidents,
    totalUsers,
    todayIncidents,
  ] = await Promise.all([
    Incident.countDocuments({ isActive: true }),

    Incident.countDocuments({ isActive: true, status: "pending" }),

    Incident.countDocuments({ isActive: true, status: "resolved" }),

    Incident.countDocuments({ isActive: true, status: "rejected" }),

    User.countDocuments({ isActive: true }),

    // Incidents reported today
    Incident.countDocuments({
      isActive: true,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)), // start of today
        $lte: new Date(new Date().setHours(23, 59, 59, 999)), // end of today
      },
    }),
  ]);

  const resolutionRate =
    totalIncidents > 0
      ? Math.round((resolvedIncidents / totalIncidents) * 100)
      : 0;

  return {
    totalIncidents,
    pendingIncidents,
    resolvedIncidents,
    rejectedIncidents,
    totalUsers,
    todayIncidents,
    resolutionRate,
  };
};

// INCIDENTS BY CATEGORY
// For pie/bar chart on dashboard
// Shows which category has most reports
export const getIncidentsByCategory = async () => {
  const data = await Incident.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        resolved: {
          $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
        },
      },
    },
    { $sort: { count: -1 } },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
        resolved: 1,
        pending: 1,
      },
    },
  ]);

  return data;
};

// INCIDENTS BY SEVERITY
// For chart showing severity distribution
export const getIncidentsBySeverity = async () => {
  const data = await Incident.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$severity",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    {
      $project: {
        _id: 0,
        severity: "$_id",
        count: 1,
      },
    },
  ]);

  return data;
};

// INCIDENTS TREND (last 7 days)
// Line chart showing daily incident counts
export const getIncidentsTrend = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const data = await Incident.aggregate([
    {
      $match: {
        isActive: true,
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      // Group by date (year + month + day)
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
        resolved: {
          $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] },
        },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    {
      $project: {
        _id: 0,
        date: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
          },
        },
        count: 1,
        resolved: 1,
      },
    },
  ]);

  return data;
};

// INCIDENTS BY STATUS
// For donut chart
export const getIncidentsByStatus = async () => {
  const data = await Incident.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);

  return data;
};

// TOP REPORTERS
// Users who have reported the most incidents
// Gamification element for the platform
export const getTopReporters = async () => {
  const data = await Incident.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$reportedBy",
        totalReports: { $sum: 1 },
        resolvedReports: {
          $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] },
        },
      },
    },
    { $sort: { totalReports: -1 } },
    { $limit: 5 },
    {
      // Join with users to get their names
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
        pipeline: [
          { $project: { fullName: 1, avatar: 1, email: 1 } },
        ],
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        user: 1,
        totalReports: 1,
        resolvedReports: 1,
      },
    },
  ]);

  return data;
};

// DANGEROUS ZONES (from geospatial service)
// Reused here for analytics dashboard
export const getDangerousZonesAnalytics = async () => {
  const { getDangerousZones } = await import("./geospatial.service.js");
  return await getDangerousZones();
};