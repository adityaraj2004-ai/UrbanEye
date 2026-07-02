import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card.jsx";
import SeverityBadge from "../incidents/SeverityBadge.jsx";
import useSocket from "../../hooks/useSocket.js";
import { formatRelativeTime } from "../../utils/formatDate.js";

const RealtimeFeed = () => {
  const { socket } = useSocket();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const addEvent = (type, incident) => {
      setEvents((prev) =>
        [
          {
            id: `${incident._id}-${Date.now()}`,
            type,
            title: incident.title,
            severity: incident.severity,
            time: new Date(),
          },
          ...prev,
        ].slice(0, 10)
      );
    };

    const onNew = (incident) => addEvent("new", incident);
    const onUpdated = (incident) => addEvent("updated", incident);

    socket.on("new_incident", onNew);
    socket.on("incident_updated", onUpdated);

    return () => {
      socket.off("new_incident", onNew);
      socket.off("incident_updated", onUpdated);
    };
  }, [socket]);

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <h3 className="text-sm font-medium text-white">Live Activity</h3>
        </div>

        {events.length === 0 ? (
          <p className="text-xs text-neutral-500 py-6 text-center">
            Waiting for activity...
          </p>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {events.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between gap-2 text-sm pb-3 border-b border-white/[0.06] last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-white truncate">{e.title}</p>
                  <p className="text-xs text-neutral-500">
                    {e.type === "new" ? "New report" : "Status updated"} ·{" "}
                    {formatRelativeTime(e.time)}
                  </p>
                </div>
                <SeverityBadge severity={e.severity} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealtimeFeed;