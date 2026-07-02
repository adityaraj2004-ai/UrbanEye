import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../../api/analytics.api.js";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart.jsx";
import { Card, CardContent } from "../../components/ui/card.jsx";
import Loader from "../../components/common/Loader.jsx";
import { MapPin } from "lucide-react";

export default function AnalyticsPage() {
  const { data: byCategory, isLoading: l1 } = useQuery({
    queryKey: ["analytics-category"],
    queryFn: () => analyticsApi.getByCategory(),
    select: (res) => res.data,
  });

  const { data: bySeverity, isLoading: l2 } = useQuery({
    queryKey: ["analytics-severity"],
    queryFn: () => analyticsApi.getBySeverity(),
    select: (res) => res.data,
  });

  const { data: byStatus, isLoading: l3 } = useQuery({
    queryKey: ["analytics-status"],
    queryFn: () => analyticsApi.getByStatus(),
    select: (res) => res.data,
  });

  const { data: trend, isLoading: l4 } = useQuery({
    queryKey: ["analytics-trend"],
    queryFn: () => analyticsApi.getTrend(),
    select: (res) => res.data,
  });

  const { data: topReporters, isLoading: l5 } = useQuery({
    queryKey: ["analytics-top-reporters"],
    queryFn: () => analyticsApi.getTopReporters(),
    select: (res) => res.data,
  });

  const { data: dangerousZones, isLoading: l6 } = useQuery({
    queryKey: ["analytics-dangerous-zones"],
    queryFn: () => analyticsApi.getDangerousZones(),
    select: (res) => res.data,
  });

  const isLoading = l1 || l2 || l3 || l4 || l5 || l6;

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "#0B0B0B" }}>
        <Loader fullScreen text="Loading analytics..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Analytics
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Deep insights into incident patterns and platform usage.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            title="Incidents — Last 7 Days"
            type="line"
            data={trend || []}
            dataKey="count"
            nameKey="date"
          />
          <AnalyticsChart
            title="By Category"
            type="bar"
            data={byCategory || []}
            dataKey="count"
            nameKey="category"
          />
          <AnalyticsChart
            title="By Severity"
            type="pie"
            data={bySeverity || []}
            dataKey="count"
            nameKey="severity"
          />
          <AnalyticsChart
            title="By Status"
            type="pie"
            data={byStatus || []}
            dataKey="count"
            nameKey="status"
          />
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-medium text-white mb-4">
              Top Reporters
            </h3>
            {(!topReporters || topReporters.length === 0) ? (
              <p className="text-xs text-neutral-500 py-4 text-center">
                No data available
              </p>
            ) : (
              <div className="space-y-3">
                {topReporters.map((r, i) => (
                  <div
                    key={r.user?._id || i}
                    className="flex items-center justify-between text-sm pb-3 border-b border-white/[0.06] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-500 text-xs w-4">
                        #{i + 1}
                      </span>
                      <span className="text-white">
                        {r.user?.fullName || "Unknown"}
                      </span>
                    </div>
                    <span className="text-[#F5E9D7] text-xs">
                      {r.totalReports} reports
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
              <MapPin size={16} />
              Dangerous Zones
            </h3>
            {(!dangerousZones || dangerousZones.length === 0) ? (
              <p className="text-xs text-neutral-500 py-4 text-center">
                No dangerous zones identified
              </p>
            ) : (
              <div className="space-y-3">
                {dangerousZones.map((zone, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm pb-3 border-b border-white/[0.06] last:border-0"
                  >
                    <span className="text-neutral-400">
                      {zone._id?.lat?.toFixed(3)}, {zone._id?.lng?.toFixed(3)}
                    </span>
                    <span className="text-red-400 text-xs">
                      {zone.count} incidents
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}