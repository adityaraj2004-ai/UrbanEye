import axiosInstance from "./axios.js";

export const authApi = {
  register: async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  refreshToken: async () => {
    const response = await axiosInstance.post("/auth/refresh-token");
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  },

  resetPassword: async (token, data) => {
    const response = await axiosInstance.post(
      `/auth/reset-password/${token}`,
      data
    );
    return response.data;
  },
};