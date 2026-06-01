import Incident from "../models/Incident.model.js";

// -------------------------------------------------------
// GET NEARBY INCIDENTS
// Finds all incidents within X kilometers of a coordinate
//
// $geoNear aggregation pipeline stage:
// - near: the point to search from
// - distanceField: adds a "distance" field to each result
// - maxDistance: radius in METERS (5000 = 5km)
// - spherical: true = calculates on sphere (accurate)
// - query: filter active/verified incidents only
// -------------------------------------------------------
export const getNearbyIncidents = async ({
  longitude,
  latitude,
  radiusKm = 5,      // default 5km radius
  limit = 20,
  page = 1,
}) => {
  const radiusInMeters = radiusKm * 1000;
  const skip = (page - 1) * limit;

  const incidents = await Incident.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        distanceField: "distance", // adds distance in meters to each result
        maxDistance: radiusInMeters,
        spherical: true,
        query: {
          isActive: true,
          status: { $ne: "rejected" },
        },
      },
    },
    { $sort: { distance: 1 } }, // closest first
    { $skip: skip },
    { $limit: parseInt(limit) },
    {
      // Join with users collection to get reporter info
      $lookup: {
        from: "users",
        localField: "reportedBy",
        foreignField: "_id",
        as: "reportedBy",
        pipeline: [
          { $project: { fullName: 1, avatar: 1 } }, // only return these fields
        ],
      },
    },
    { $unwind: "$reportedBy" }, // convert array to object
    {
      // Add human readable distance in km
      $addFields: {
        distanceKm: {
          $round: [{ $divide: ["$distance", 1000] }, 2],
        },
      },
    },
  ]);

  return incidents;
};

// -------------------------------------------------------
// GET INCIDENTS WITHIN BOUNDING BOX
// Used when user moves/zooms the map
// More efficient than radius for map views
// -------------------------------------------------------
export const getIncidentsInBoundingBox = async ({
  northEastLat,
  northEastLng,
  southWestLat,
  southWestLng,
}) => {
  const incidents = await Incident.find({
    isActive: true,
    status: { $ne: "rejected" },
    location: {
      $geoWithin: {
        $box: [
          [parseFloat(southWestLng), parseFloat(southWestLat)], // bottom-left
          [parseFloat(northEastLng), parseFloat(northEastLat)], // top-right
        ],
      },
    },
  })
    .populate("reportedBy", "fullName avatar")
    .select("-adminNote -reviewedBy")
    .limit(100); // cap at 100 for map performance

  return incidents;
};

// -------------------------------------------------------
// GET DANGEROUS ZONES
// Groups incidents by location clusters
// Used in analytics dashboard
// -------------------------------------------------------
export const getDangerousZones = async () => {
  const zones = await Incident.aggregate([
    {
      $match: {
        isActive: true,
        severity: { $in: ["high", "critical"] },
        status: { $ne: "rejected" },
      },
    },
    {
      // Group nearby incidents using geospatial bucketing
      $group: {
        _id: {
          // Round coordinates to 3 decimal places to cluster nearby incidents
          // 3 decimal places ≈ 111 meter precision
          lng: { $round: [{ $arrayElemAt: ["$location.coordinates", 0] }, 3] },
          lat: { $round: [{ $arrayElemAt: ["$location.coordinates", 1] }, 3] },
        },
        count: { $sum: 1 },
        categories: { $addToSet: "$category" },
        avgSeverity: { $avg: { $cond: [
          { $eq: ["$severity", "critical"] }, 4,
          { $cond: [
            { $eq: ["$severity", "high"] }, 3,
            { $cond: [{ $eq: ["$severity", "medium"] }, 2, 1] }
          ]}
        ]}},
      },
    },
    { $match: { count: { $gte: 2 } } }, // only zones with 2+ incidents
    { $sort: { count: -1 } },
    { $limit: 10 }, // top 10 dangerous zones
  ]);

  return zones;
};