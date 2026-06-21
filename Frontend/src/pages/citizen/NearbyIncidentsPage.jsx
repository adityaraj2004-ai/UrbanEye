import { useState } from "react";
import { MapPinOff } from "lucide-react";
import useGeoLocation from "../../hooks/useGeoLocation.js";
import { useNearbyIncidents } from "../../hooks/useIncidents.js";
import IncidentFeed from "../../components/incidents/IncidentFeed.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import {Select} from "../../components/ui/select.jsx";

const RADIUS_OPTIONS = [
  { value: "1", label: "1 km" },
  { value: "5", label: "5 km" },
  { value: "10", label: "10 km" },
  { value: "20", label: "20 km" },
];

export default function NearbyIncidentsPage() {
  const { location, error, isLoading: locLoading } = useGeoLocation();
  const [radius, setRadius] = useState("5");

  const queryParams =
    location.latitude && location.longitude
      ? {
          latitude: location.latitude,
          longitude: location.longitude,
          radius: Number(radius),
        }
      : null;

  const { data: incidents, isLoading } = useNearbyIncidents(queryParams);

  if (locLoading) {
    return (
      <div className="min-h-screen" style={{ background: "#0B0B0B" }}>
        <Loader size="lg" fullScreen text="Getting your location..." />
      </div>
    );
  }

  if (error && !location.latitude) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0B0B0B" }}>
        <EmptyState
          icon={MapPinOff}
          title="Location access needed"
          description="Please enable location permissions in your browser to see incidents near you."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
              Nearby Incidents
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              Incidents reported within {radius} km of your location.
            </p>
          </div>
          <div className="w-full md:w-48">
            <Select
              label="Search radius"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              options={RADIUS_OPTIONS}
              placeholder=""
            />
          </div>
        </header>

        <IncidentFeed
          incidents={incidents || []}
          isLoading={isLoading}
          emptyTitle="No incidents nearby"
          emptyDescription={`No incidents found within ${radius} km of your location.`}
        />
      </div>
    </div>
  );
}
