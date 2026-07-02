import axiosInstance from "./axios.js";

export const adminApi = {
  getAllIncidents: async (params = {}) => {
    const response = await axiosInstance.get("/admin/incidents", { params });
    return response.data;
  },

  updateIncidentStatus: async (id, data) => {
    const response = await axiosInstance.patch(
      `/admin/incidents/${id}/status`,
      data
    );
    return response.data;
  },

  deleteIncident: async (id) => {
    const response = await axiosInstance.delete(`/admin/incidents/${id}`);
    return response.data;
  },

  getAllUsers: async (params = {}) => {
    const response = await axiosInstance.get("/admin/users", { params });
    return response.data;
  },

  toggleUserStatus: async (id) => {
    const response = await axiosInstance.patch(
      `/admin/users/${id}/toggle-status`
    );
    return response.data;
  },

  changeUserRole: async (id, role) => {
    const response = await axiosInstance.patch(`/admin/users/${id}/role`, {
      role,
    });
    return response.data;
  },
};