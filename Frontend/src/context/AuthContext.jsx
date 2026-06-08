import { createContext, useState, useEffect, useCallback } from "react";
import { authApi } from "../api/auth.api.js";
import { setAccessToken } from "../api/axios.js";
import socket from "../services/socket.service.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // checking auth on startup

  // -------------------------------------------------------
  // CHECK AUTH ON APP STARTUP
  // Try to refresh token silently when app loads
  // If refresh token cookie exists → user stays logged in
  // If not → user needs to login
  // -------------------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.refreshToken();
        const { accessToken, user } = response.data;

        setAccessToken(accessToken);
        setUser(user);

        // Connect socket after confirming user is logged in
        socket.connect();
      } catch (error) {
        // No valid refresh token — user not logged in
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // -------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------
  const login = useCallback(async (credentials) => {
    const response = await authApi.login(credentials);
    const { accessToken, user } = response.data;

    setAccessToken(accessToken);
    setUser(user);

    // Connect socket after login
    socket.connect();

    return user;
  }, []);

  // -------------------------------------------------------
  // LOGOUT
  // -------------------------------------------------------
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Even if API call fails, clear local state
      console.error("Logout error:", error);
    } finally {
      setAccessToken(null);
      setUser(null);

      // Disconnect socket on logout
      socket.disconnect();
    }
  }, []);

  // -------------------------------------------------------
  // UPDATE USER
  // Called after profile updates so UI reflects changes
  // -------------------------------------------------------
  const updateUser = useCallback((updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};