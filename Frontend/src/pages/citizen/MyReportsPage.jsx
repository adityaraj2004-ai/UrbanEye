import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { useMyIncidents } from "../../hooks/useIncidents.js";
import IncidentFeed from "../../components/incidents/IncidentFeed.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { INCIDENT_STATUS } from "../../utils/constants.js";

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: INCIDENT_STATUS.PENDING, label: "Pending" },
  { value: INCIDENT_STATUS.VERIFIED, label: "Verified" },
  { value: INCIDENT_STATUS.IN_PROGRESS, label: "In Progress" },
  { value: INCIDENT_STATUS.RESOLVED, label: "Resolved" },
  { value: INCIDENT_STATUS.REJECTED, label: "Rejected" },
];

export default function MyReportsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const queryParams = {
    ...(statusFilter ? { status: statusFilter } : {}),
    page,
    limit: 12,
  };

  const { data, isLoading } = useMyIncidents(queryParams);

  const incidents = data?.incidents || data?.results || [];
  const totalPages = data?.totalPages || data?.pagination?.totalPages || 1;
  const currentPage = data?.currentPage || data?.pagination?.currentPage || page;

  const isCompletelyEmpty = !isLoading && !statusFilter && incidents.length === 0;

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            My Reports
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Track the status of incidents you've reported.
          </p>
        </header>

        <div className="mb-8 -mx-1 px-1 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {STATUS_TABS.map((tab) => {
              const active = statusFilter === tab.value;
              return (
                <button
                  key={tab.value || "all"}
                  onClick={() => {
                    setStatusFilter(tab.value);
                    setPage(1);
                  }}
                  className={`h-9 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-[#F5E9D7] text-[#0B0B0B]"
                      : "bg-[#111111] text-neutral-300 border border-white/[0.08] hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {isCompletelyEmpty ? (
          <EmptyState
            icon={FileText}
            title="No reports yet"
            description="You haven't reported any incidents. Help your community by reporting the first one."
            actionLabel="Report your first incident"
            onAction={() => navigate("/report")}
          />
        ) : (
          <>
            <IncidentFeed
              incidents={incidents}
              isLoading={isLoading}
              emptyTitle="No matching reports"
              emptyDescription="No reports match the selected status filter."
            />

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}