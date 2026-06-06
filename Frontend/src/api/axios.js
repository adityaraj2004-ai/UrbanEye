import axios from "axios";

// -------------------------------------------------------
// BASE AXIOS INSTANCE
// All API calls go through this instance
// Never use plain axios directly anywhere else
// -------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends cookies automatically (refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------------------------------------
// REQUEST INTERCEPTOR
// Runs before every single API request
// Attaches access token from memory to Authorization header
// -------------------------------------------------------
axiosInstance.interceptors.request.use(
  (config) => {
    // Get access token from memory
    // We store it in a module-level variable (not localStorage)
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------------------------------------
// RESPONSE INTERCEPTOR
// Runs after every single API response
// If we get 401 (token expired) → silently refresh token
// Then retry the original failed request
// User never notices their token expired
// -------------------------------------------------------
let isRefreshing = false;
// Queue of failed requests waiting for token refresh
let failedRequestsQueue = [];

axiosInstance.interceptors.response.use(
  // If response is successful just return it
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If error is 401 AND we haven't already tried refreshing
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token") &&
      !originalRequest.url.includes("/auth/login")
    ) {
      // Mark this request as retried to prevent infinite loop
      originalRequest._retry = true;

      // If already refreshing — queue this request
      // Wait for refresh to complete then retry
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Call refresh token endpoint
        // Refresh token comes from httpOnly cookie automatically
        const response = await axiosInstance.post("/auth/refresh-token");
        const newAccessToken = response.data.data.accessToken;

        // Store new access token
        setAccessToken(newAccessToken);

        // Retry all queued requests with new token
        failedRequestsQueue.forEach(({ resolve }) => resolve(newAccessToken));
        failedRequestsQueue = [];

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed — user needs to login again
        failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
        failedRequestsQueue = [];

        // Clear token and redirect to login
        setAccessToken(null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// -------------------------------------------------------
// TOKEN STORAGE
// Store in module memory — NOT localStorage
// localStorage is vulnerable to XSS attacks
// Memory is cleared on page refresh (by design)
// Refresh token in httpOnly cookie handles re-authentication
// -------------------------------------------------------
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export default axiosInstance;