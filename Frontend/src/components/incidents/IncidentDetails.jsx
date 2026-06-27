import { useState } from "react";
import { ChevronLeft, ChevronRight, ThumbsUp, MapPin, Clock, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import SeverityBadge from "./SeverityBadge.jsx";
import MainMap from "../maps/MainMap.jsx";
import useAuth from "../../hooks/useAuth.js";
import { useToggleUpvote, useDeleteIncident } from "../../hooks/useIncidents.js";
import { formatRelativeTime } from "../../utils/formatDate.js";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  verified: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  in_progress: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  resolved: "bg-green-500/10 text-green-400 border border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const formatStatus = (status) =>
  status ? status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Unknown";

const IncidentDetails = ({ incident }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [imgIndex, setImgIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: toggleUpvote, isPending: upvoting } = useToggleUpvote();
  const { mutate: deleteIncident, isPending: deleting } = useDeleteIncident();

  if (!incident) return null;

  const images = Array.isArray(incident.images) ? incident.images : [];
  const currentImage = images[imgIndex]
    ? typeof images[imgIndex] === "string"
      ? images[imgIndex]
      : images[imgIndex]?.url
    : null;

  const reporterId =
    incident.reportedBy?._id || incident.reportedBy?.id || incident.reportedBy;
  const isOwner = user && reporterId && user._id === reporterId;
  const canEdit = isOwner && incident.status === "pending";

  const coords = incident.location?.coordinates;
  const hasLocation = Array.isArray(coords) && coords.length === 2;
  const mapCenter = hasLocation ? [coords[1], coords[0]] : null;

  const handleUpvote = () => {
    toggleUpvote(incident._id);
  };

  const handleDelete = () => {
    deleteIncident(incident._id, {
      onSuccess: () => navigate("/my-reports"),
    });
  };

  const userUpvoted =
    Array.isArray(incident.upvotes) && user
      ? incident.upvotes.includes(user._id)
      : false;

  return (
    <div className="space-y-6">
      {images.length > 0 && (
        <div className="relative h-64 w-full overflow-hidden rounded-md border border-white/10 bg-black">
          {currentImage && (
            <img
              src={currentImage}
              alt={incident.title}
              className="h-full w-full object-cover"
            />
          )}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === imgIndex ? "bg-[#F5E9D7]" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">
          {incident.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <SeverityBadge severity={incident.severity} />
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              STATUS_STYLES[incident.status] ||
              "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20"
            }`}
          >
            {formatStatus(incident.status)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
            <Clock size={12} />
            {formatRelativeTime(incident.createdAt)}
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-neutral-300">
        {incident.description}
      </p>

      {incident.reportedBy && (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-white/10 flex items-center justify-center text-xs text-neutral-300">
            {incident.reportedBy.avatar ? (
              <img
                src={incident.reportedBy.avatar}
                alt={incident.reportedBy.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              incident.reportedBy.fullName?.[0]?.toUpperCase() || "?"
            )}
          </div>
          <div>
            <p className="text-sm text-white">
              {incident.reportedBy.fullName || "Anonymous"}
            </p>
            <p className="text-xs text-neutral-500">Reporter</p>
          </div>
        </div>
      )}

      {incident.address && (
        <p className="flex items-start gap-2 text-sm text-neutral-400">
          <MapPin size={14} className="mt-0.5 shrink-0" />
          {incident.address}
        </p>
      )}

      {hasLocation && (
        <div className="h-48 w-full overflow-hidden rounded-md border border-white/10">
          <MainMap incidents={[incident]} center={mapCenter} zoom={15} />
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button
          variant={userUpvoted ? "default" : "outline"}
          size="sm"
          onClick={handleUpvote}
          loading={upvoting}
        >
          <ThumbsUp size={14} />
          {incident.upvoteCount ?? 0}
        </Button>

        {canEdit && (
          <>
            <Button variant="outline" size="sm">
              <Pencil size={14} />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={14} />
              Delete
            </Button>
          </>
        )}
      </div>

      {incident.adminNote && incident.status !== "pending" && (
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
              Admin Note
            </p>
            <p className="text-sm text-neutral-300">{incident.adminNote}</p>
          </CardContent>
        </Card>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#111111] p-5">
            <h3 className="text-base font-medium text-white">
              Delete this report?
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                loading={deleting}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentDetails;