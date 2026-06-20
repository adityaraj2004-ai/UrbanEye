import { Inbox } from "lucide-react";
import IncidentCard from "./IncidentCard.jsx";
import Loader from "../common/Loader.jsx";
import EmptyState from "../common/EmptyState.jsx";

const IncidentFeed = ({ incidents = [], isLoading = false, emptyTitle, emptyDescription }) => {
  if (isLoading) {
    return <Loader size="md" text="Loading incidents..." />;
  }

  if (!incidents || incidents.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title={emptyTitle || "No incidents found"}
        description={
          emptyDescription || "There are no incidents matching the current filters."
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {incidents.map((incident) => (
        <IncidentCard key={incident._id || incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentFeed;