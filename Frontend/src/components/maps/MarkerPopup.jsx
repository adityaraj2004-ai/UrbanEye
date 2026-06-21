import { Link } from "react-router-dom";
import SeverityBadge from "../incidents/SeverityBadge.jsx";

const MarkerPopup = ({ incident }) => {
  if (!incident) return null;

  const id = incident._id || incident.id;
  const thumb =
    Array.isArray(incident.images) && incident.images.length > 0
      ? typeof incident.images[0] === "string"
        ? incident.images[0]
        : incident.images[0]?.url
      : null;

  return (
    <div style={{ minWidth: 200 }} className="text-neutral-100">
      {thumb && (
        <img
          src={thumb}
          alt={incident.title}
          className="mb-2 h-24 w-full rounded-md object-cover"
          loading="lazy"
        />
      )}

      <h3 className="mb-1.5 text-sm font-medium text-white line-clamp-2">
        {incident.title || "Untitled incident"}
      </h3>

      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <SeverityBadge severity={incident.severity} />
        {incident.category && (
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] capitalize text-neutral-300">
            {incident.category}
          </span>
        )}
        {incident.status && (
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] capitalize text-neutral-300">
            {incident.status}
          </span>
        )}
      </div>

      {id && (
        <Link
          to={`/incidents/${id}`}
          className="inline-block text-xs font-medium text-[#F3E7D3] hover:underline"
        >
          View Details →
        </Link>
      )}
    </div>
  );
};

export default MarkerPopup;