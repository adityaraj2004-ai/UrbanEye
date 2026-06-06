import axiosInstance from "./axios.js";

export const analyticsApi = {
  getOverview: async () => {
    const response = await axiosInstance.get("/analytics/overview");
    return response.data;
  },

  getByCategory: async () => {
    const response = await axiosInstance.get("/analytics/by-category");
    return response.data;
  },

  getBySeverity: async () => {
    const response = await axiosInstance.get("/analytics/by-severity");
    return response.data;
  },

  getByStatus: async () => {
    const response = await axiosInstance.get("/analytics/by-status");
    return response.data;
  },

  getTrend: async () => {
    const response = await axiosInstance.get("/analytics/trend");
    return response.data;
  },

  getTopReporters: async () => {
    const response = await axiosInstance.get("/analytics/top-reporters");
    return response.data;
  },

  getDangerousZones: async () => {
    const response = await axiosInstance.get("/analytics/dangerous-zones");
    return response.data;
  },
};