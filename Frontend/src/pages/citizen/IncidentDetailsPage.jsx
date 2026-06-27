import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useIncident } from "../../hooks/useIncidents.js";
import useSocket from "../../hooks/useSocket.js";
import IncidentDetails from "../../components/incidents/IncidentDetails.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { Button } from "../../components/ui/button.jsx";
import { FileQuestion } from "lucide-react";

const IncidentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const { data: incident, isLoading, isError } = useIncident(id);

  useEffect(() => {
    if (!socket || !id) return;

    socket.emit("join_incident", id);

    const onUpdated = (updated) => {
      if (updated?._id !== id) return;
      queryClient.setQueryData(["incident", id], (old) => {
        if (!old) return old;
        return { ...old, data: { incident: { ...old.data.incident, ...updated } } };
      });
    };

    const onUpvote = (payload) => {
      if (payload?.incidentId !== id) return;
      queryClient.setQueryData(["incident", id], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            incident: {
              ...old.data.incident,
              upvoteCount: payload.upvoteCount,
            },
          },
        };
      });
    };

    socket.on("incident_updated", onUpdated);
    socket.on("upvote_updated", onUpvote);

    return () => {
      socket.emit("leave_incident", id);
      socket.off("incident_updated", onUpdated);
      socket.off("upvote_updated", onUpvote);
    };
  }, [socket, id, queryClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "#0B0B0B" }}>
        <Loader fullScreen text="Loading incident..." />
      </div>
    );
  }

  if (isError || !incident) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0B0B0B" }}>
        <EmptyState
          icon={FileQuestion}
          title="Incident not found"
          description="This incident may have been removed or doesn't exist."
          actionLabel="Go back"
          onAction={() => navigate("/home")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft size={14} />
          Back
        </Button>

        <IncidentDetails incident={incident} />
      </div>
    </div>
  );
};

export default IncidentDetailsPage;