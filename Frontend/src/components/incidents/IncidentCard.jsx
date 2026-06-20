import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  MapPin,
  Clock,
  AlertTriangle,
  Construction,
  TrafficCone,
  Zap,
  Droplets,
  AlertOctagon,
  CircleDot,
} from "lucide-react";
import Card from "../ui/Card.jsx";
import SeverityBadge from "./SeverityBadge.jsx";
import { formatRelativeTime } from "../../utils/formatDate.js";

const CATEGORY_ICONS = {
  accident: AlertTriangle,
  pothole: Construction,
  road_blockage: TrafficCone,
  traffic_signal_failure: Zap,
  waterlogging: Droplets,
  dangerous_road: AlertOctagon,
  other: CircleDot,
};

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  verified: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  in_progress: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  resolved: "bg-green-500/10 text-green-400 border border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const formatStatus = (status) =>
  status ? status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Unknown";

const IncidentCard = ({ incident }) => {
  const navigate = useNavigate();
  const CategoryIcon = CATEGORY_ICONS[incident?.category] || CircleDot;
  const firstImage = Array.isArray(incident?.images) && incident.images.length > 0
    ? (incident.images[0]?.url || incident.images[0])
    : null;

  const handleClick = () => navigate(`/incidents/${incident._id || incident.id}`);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card padding="sm" hover className="overflow-hidden">
        {firstImage && (
          <div className="-mx-4 -mt-4 mb-4 h-40 overflow-hidden bg-black">
            <img
              src={firstImage}
              alt={incident.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex items-start gap-3 mb-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/[0.08]">
            <CategoryIcon size={16} className="text-[#F5E9D7]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white truncate">
              {incident?.title || "Untitled incident"}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <SeverityBadge severity={incident?.severity} />
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  STATUS_STYLES[incident?.status] ||
                  "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20"
                }`}
              >
                {formatStatus(incident?.status)}
              </span>
            </div>
          </div>
        </div>

        {incident?.location?.address && (
          <p className="flex items-start gap-1.5 text-xs text-neutral-400 mb-2 line-clamp-2">
            <MapPin size={12} className="mt-0.5 shrink-0" />
            <span className="truncate">{incident.location.address}</span>
          </p>
        )}

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06]">
          <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
            <Clock size={12} />
            {formatRelativeTime(incident?.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
            <ThumbsUp size={12} />
            {incident?.upvoteCount ?? incident?.upvotes?.length ?? 0}
          </span>
        </div>

        {typeof incident?.distanceKm === "number" && (
          <div className="mt-2 text-xs text-[#F5E9D7]">
            {incident.distanceKm.toFixed(1)} km away
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default IncidentCard;