import { useState } from "react";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select.jsx";
import ImageUploader from "./ImageUploader.jsx";
import MainMap from "../maps/MainMap.jsx";
import { useCreateIncident } from "../../hooks/useIncidents.js";
import {
  INCIDENT_CATEGORIES,
  SEVERITY_LEVELS,
} from "../../utils/constants.js";

const SEVERITY_OPTIONS = Object.values(SEVERITY_LEVELS).map((v) => ({
  value: v,
  label: v.charAt(0).toUpperCase() + v.slice(1),
}));

const IncidentForm = ({ initialLocation, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(
    initialLocation
      ? { lat: initialLocation.lat, lng: initialLocation.lng }
      : null
  );
  const [errors, setErrors] = useState({});

  const { mutate, isPending } = useCreateIncident();

  const validate = () => {
    const next = {};
    if (!title || title.length < 5) next.title = "Title must be at least 5 characters";
    if (!description || description.length < 10)
      next.description = "Description must be at least 10 characters";
    if (!category) next.category = "Category is required";
    if (!severity) next.severity = "Severity is required";
    if (!location) next.location = "Please pick a location on the map";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("severity", severity);
    formData.append("longitude", location.lng);
    formData.append("latitude", location.lat);
    if (address) formData.append("address", address);
    images.forEach((file) => formData.append("images", file));

    mutate(formData, {
      onSuccess: (res) => {
        const incident = res?.data?.incident;
        onSuccess?.(incident);
      },
      onError: (err) => {
        setErrors({
          submit:
            err?.response?.data?.message || "Failed to submit incident. Try again.",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        placeholder="e.g. Large pothole near MG Road"
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-light text-neutral-300">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Describe the incident in detail..."
          className={`flex w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-white shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5E9D7]/40 focus-visible:border-[#F5E9D7]/30 ${
            errors.description
              ? "border-red-500/50"
              : "border-white/10 hover:border-white/20"
          }`}
        />
        {errors.description && (
          <p className="text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-light text-neutral-300">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {INCIDENT_CATEGORIES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-xs text-red-400">{errors.category}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-light text-neutral-300">
            Severity
          </label>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              {SEVERITY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.severity && (
            <p className="text-xs text-red-400">{errors.severity}</p>
          )}
        </div>
      </div>

      <Input
        label="Address (optional)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="e.g. MG Road, Agra"
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-light text-neutral-300">
          Location
        </label>
        {initialLocation ? (
          <div className="h-48 w-full overflow-hidden rounded-md border border-white/10">
            <MainMap
              incidents={[]}
              center={[initialLocation.lat, initialLocation.lng]}
              zoom={15}
            />
          </div>
        ) : (
          <div className="h-64 w-full overflow-hidden rounded-md border border-white/10">
            <MainMap
              incidents={[]}
              center={[20.5937, 78.9629]}
              zoom={5}
              onMapClick={(latlng) => setLocation(latlng)}
            />
          </div>
        )}
        {errors.location && (
          <p className="text-xs text-red-400">{errors.location}</p>
        )}
      </div>

      <ImageUploader images={images} onImagesChange={setImages} maxImages={4} />

      {errors.submit && <p className="text-sm text-red-400">{errors.submit}</p>}

      <Button type="submit" loading={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Report"}
      </Button>
    </form>
  );
};

export default IncidentForm;