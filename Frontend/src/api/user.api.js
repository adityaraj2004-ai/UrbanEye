import axiosInstance from "./axios.js";

export const userApi = {
  getMyProfile: async () => {
    const response = await axiosInstance.get("/users/me/profile");
    return response.data;
  },

  getUserById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.patch("/users/me/profile", data);
    return response.data;
  },

  uploadAvatar: async (formData) => {
    const response = await axiosInstance.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  changePassword: async (data) => {
    const response = await axiosInstance.patch(
      "/users/me/change-password",
      data
    );
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.delete("/users/me/account");
    return response.data;
  },
};