import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Clock, CheckCircle2, Users, TrendingUp } from "lucide-react";
import { analyticsApi } from "../../api/analytics.api.js";
import StatsCard from "../../components/dashboard/StatsCard.jsx";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart.jsx";
import RealtimeFeed from "../../components/dashboard/RealtimeFeed.jsx";
import Loader from "../../components/common/Loader.jsx";

export default function AdminDashboard() {
  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ["analytics-overview"],
    queryFn: () => analyticsApi.getOverview(),
    select: (res) => res.data,
  });

  const { data: trend, isLoading: loadingTrend } = useQuery({
    queryKey: ["analytics-trend"],
    queryFn: () => analyticsApi.getTrend(),
    select: (res) => res.data,
  });

  const { data: byCategory, isLoading: loadingCategory } = useQuery({
    queryKey: ["analytics-category"],
    queryFn: () => analyticsApi.getByCategory(),
    select: (res) => res.data,
  });

  if (loadingOverview) {
    return (
      <div className="min-h-screen" style={{ background: "#0B0B0B" }}>
        <Loader fullScreen text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Overview of platform activity and incident statistics.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard
            icon={AlertCircle}
            label="Total Incidents"
            value={overview?.totalIncidents}
            accent
          />
          <StatsCard
            icon={Clock}
            label="Pending"
            value={overview?.pendingIncidents}
          />
          <StatsCard
            icon={CheckCircle2}
            label="Resolved"
            value={overview?.resolvedIncidents}
          />
          <StatsCard
            icon={Users}
            label="Total Users"
            value={overview?.totalUsers}
          />
          <StatsCard
            icon={TrendingUp}
            label="Resolution Rate"
            value={`${overview?.resolutionRate ?? 0}%`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsChart
              title="Incidents — Last 7 Days"
              type="line"
              data={trend || []}
              dataKey="count"
              nameKey="date"
            />
            <AnalyticsChart
              title="Incidents by Category"
              type="bar"
              data={byCategory || []}
              dataKey="count"
              nameKey="category"
            />
          </div>

          <div>
            <RealtimeFeed />
          </div>
        </div>
      </div>
    </div>
  );
}