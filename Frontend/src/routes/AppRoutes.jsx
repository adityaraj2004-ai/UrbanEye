import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

// Public pages
import LandingPage from "../pages/public/LandingPage.jsx";
import NotFoundPage from "../pages/public/NotFoundPage.jsx";

// Auth pages
import LoginPage from "../pages/auth/LoginPage.jsx";
import SignupPage from "../pages/auth/SignupPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";

// Citizen pages
import HomePage from "../pages/citizen/HomePage.jsx";
import ExploreMapPage from "../pages/citizen/ExploreMapPage.jsx";
import ReportIncidentPage from "../pages/citizen/ReportIncidentPage.jsx";
import IncidentDetailsPage from "../pages/citizen/IncidentDetailsPage.jsx";
import NearbyIncidentsPage from "../pages/citizen/NearbyIncidentsPage.jsx";
import MyReportsPage from "../pages/citizen/MyReportsPage.jsx";
import ProfilePage from "../pages/citizen/ProfilePage.jsx";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import IncidentModerationPage from "../pages/admin/IncidentModerationPage.jsx";
import AnalyticsPage from "../pages/admin/AnalyticsPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Protected citizen routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<ExploreMapPage />} />
          <Route path="/report" element={<ReportIncidentPage />} />
          <Route path="/incidents/:id" element={<IncidentDetailsPage />} />
          <Route path="/nearby" element={<NearbyIncidentsPage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Admin only routes */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/incidents" element={<IncidentModerationPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
