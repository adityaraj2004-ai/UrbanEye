import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { adminApi } from "../../api/admin.api.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select.jsx";
import { Button } from "../../components/ui/button.jsx";
import SeverityBadge from "../../components/incidents/SeverityBadge.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { INCIDENT_STATUS } from "../../utils/constants.js";
import { formatRelativeTime } from "../../utils/formatDate.js";
import { Inbox } from "lucide-react";

const STATUS_OPTIONS = Object.values(INCIDENT_STATUS).map((v) => ({
  value: v,
  label: v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
}));

export default function IncidentModerationPage() {
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-incidents", page],
    queryFn: () => adminApi.getAllIncidents({ page, limit: 10 }),
    select: (res) => res.data,
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }) =>
      adminApi.updateIncidentStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-incidents"] });
    },
  });

  const { mutate: deleteIncident, isPending: deleting } = useMutation({
    mutationFn: (id) => adminApi.deleteIncident(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-incidents"] });
      setDeleteTarget(null);
    },
  });

  const incidents = data?.incidents || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Incident Moderation
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Review, verify and manage reported incidents.
          </p>
        </header>

        {isLoading ? (
          <Loader text="Loading incidents..." />
        ) : incidents.length === 0 ? (
          <EmptyState icon={Inbox} title="No incidents to moderate" />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-left text-neutral-500">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Reporter</th>
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Reported</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr
                    key={incident._id}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 text-white max-w-xs truncate">
                      {incident.title}
                    </td>
                    <td className="px-4 py-3 text-neutral-400">
                      {incident.reportedBy?.fullName || "Unknown"}
                    </td>
                    <td className="px-4 py-3">
                      <SeverityBadge severity={incident.severity} />
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={incident.status}
                        onValueChange={(status) =>
                          updateStatus({ id: incident._id, status })
                        }
                      >
                        <SelectTrigger className="h-8 w-36 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 text-xs">
                      {formatRelativeTime(incident.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(incident._id)}
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#111111] p-5">
            <h3 className="text-base font-medium text-white">
              Permanently delete this incident?
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              This action cannot be undone. Images will also be removed.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                loading={deleting}
                onClick={() => deleteIncident(deleteTarget)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}