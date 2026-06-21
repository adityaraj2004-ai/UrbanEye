import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import MainMap from "../../components/maps/MainMap.jsx";
import UserLocation from "../../components/maps/UserLocation.jsx";
import Loader from "../../components/common/Loader.jsx";
import useGeoLocation from "../../hooks/useGeoLocation.js";
import useSocket from "../../hooks/useSocket.js";
import { incidentApi } from "../../api/incident.api.js";
import { getSeverityColor, getSeverityLabel } from "../../utils/severityColor.js";

const tempMarkerIcon = L.divIcon({
  className: "temp-pick-marker",
  html: `<div style="width:18px;height:18px;border-radius:9999px;background:#F3E7D3;border:2px solid #0B0B0B;box-shadow:0 0 0 2px rgba(243,231,211,0.4);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -9],
});

const SEVERITIES = ["low", "medium", "high", "critical"];

export default function ExploreMapPage() {
  const { location, isLoading: locLoading } = useGeoLocation();
  const { socket } = useSocket();

  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedLocation, setClickedLocation] = useState(null);

  // Initial fetch
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await incidentApi.getAll({ limit: 100 });
        const list = res?.data?.incidents || res?.incidents || res?.data || [];
        if (active) setIncidents(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Failed to fetch incidents:", err);
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Socket subscriptions
  useEffect(() => {
    if (!socket) return;

    socket.emit("join_map");

    const onNew = (incident) => {
      if (!incident?._id) return;
      setIncidents((prev) =>
        prev.some((i) => i._id === incident._id) ? prev : [incident, ...prev]
      );
    };

    const onDeleted = (payload) => {
      const id = payload?.incidentId || payload?._id || payload;
      setIncidents((prev) => prev.filter((i) => i._id !== id));
    };

    const onUpdated = (incident) => {
      if (!incident?._id) return;
      setIncidents((prev) =>
        prev.map((i) => (i._id === incident._id ? { ...i, ...incident } : i))
      );
    };

    const onUpvote = (payload) => {
      const id = payload?.incidentId || payload?._id;
      const upvoteCount = payload?.upvoteCount;
      if (!id) return;
      setIncidents((prev) =>
        prev.map((i) => (i._id === id ? { ...i, upvoteCount } : i))
      );
    };

    socket.on("new_incident", onNew);
    socket.on("incident_deleted", onDeleted);
    socket.on("incident_updated", onUpdated);
    socket.on("upvote_updated", onUpvote);

    return () => {
      socket.emit("leave_map");
      socket.off("new_incident", onNew);
      socket.off("incident_deleted", onDeleted);
      socket.off("incident_updated", onUpdated);
      socket.off("upvote_updated", onUpvote);
    };
  }, [socket]);

  const center =
    location.latitude && location.longitude
      ? [location.latitude, location.longitude]
      : [20.5937, 78.9629];

  if (isLoading || locLoading) {
    return (
      <div className="h-[calc(100vh-64px)] w-full" style={{ background: "#0B0B0B" }}>
        <Loader fullScreen={false} text="Loading map..." />
      </div>
    );
  }

  return (
    <div
      className="relative h-[calc(100vh-64px)] w-full overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      <MainMap
        incidents={incidents}
        center={center}
        zoom={13}
        onMapClick={(latlng) => setClickedLocation(latlng)}
      >
        {location.latitude && location.longitude && (
          <UserLocation
            latitude={location.latitude}
            longitude={location.longitude}
          />
        )}

        {clickedLocation && (
          <Marker
            position={[clickedLocation.lat, clickedLocation.lng]}
            icon={tempMarkerIcon}
          >
            <Popup>
              <div className="text-xs text-neutral-100" style={{ minWidth: 180 }}>
                <p className="mb-2">Report an incident here?</p>
                <Link
                  to={`/report?lat=${clickedLocation.lat}&lng=${clickedLocation.lng}`}
                  className="font-medium text-[#F3E7D3] hover:underline"
                >
                  Start Report →
                </Link>
              </div>
            </Popup>
          </Marker>
        )}
      </MainMap>

      {/* Legend */}
      <div className="pointer-events-none absolute right-4 top-4 z-[1000]">
        <div className="pointer-events-auto rounded-lg border border-white/[0.08] bg-[#111111]/95 p-3 shadow-2xl backdrop-blur">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            Severity
          </p>
          <ul className="space-y-1.5">
            {SEVERITIES.map((s) => (
              <li key={s} className="flex items-center gap-2 text-xs text-neutral-200">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: getSeverityColor(s) }}
                />
                {getSeverityLabel(s)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}