import axiosInstance from "./axios.js";

export const incidentApi = {
  // Create incident with images (multipart form data)
  create: async (formData) => {
    const response = await axiosInstance.post("/incidents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get all incidents with filters
  getAll: async (params = {}) => {
    const response = await axiosInstance.get("/incidents", { params });
    return response.data;
  },

  // Get single incident
  getById: async (id) => {
    const response = await axiosInstance.get(`/incidents/${id}`);
    return response.data;
  },

  // Get my reported incidents
  getMyIncidents: async (params = {}) => {
    const response = await axiosInstance.get("/incidents/user/my-reports", {
      params,
    });
    return response.data;
  },

  // Get nearby incidents
  getNearby: async (params) => {
    const response = await axiosInstance.get("/incidents/nearby", { params });
    return response.data;
  },

  // Get incidents for map bounding box
  getMapIncidents: async (params) => {
    const response = await axiosInstance.get("/incidents/map", { params });
    return response.data;
  },

  // Update incident
  update: async (id, data) => {
    const response = await axiosInstance.patch(`/incidents/${id}`, data);
    return response.data;
  },

  // Delete incident
  delete: async (id) => {
    const response = await axiosInstance.delete(`/incidents/${id}`);
    return response.data;
  },

  // Toggle upvote
  toggleUpvote: async (id) => {
    const response = await axiosInstance.post(`/incidents/${id}/upvote`);
    return response.data;
  },
};