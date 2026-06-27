import { X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select.jsx";
import SearchBar from "../common/SearchBar.jsx";
import {
    INCIDENT_CATEGORIES,
    SEVERITY_LEVELS,
    INCIDENT_STATUS,
} from "../../utils/constants.js";

const SEVERITY_OPTIONS = Object.values(SEVERITY_LEVELS).map((v) => ({
    value: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
}));

const STATUS_OPTIONS = Object.values(INCIDENT_STATUS).map((v) => ({
    value: v,
    label: v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
}));

const IncidentFilters = ({ filters = {}, onFilterChange }) => {
    const update = (key, value) => {
        onFilterChange?.({ ...filters, [key]: value || undefined });
    };

    const hasActive = !!(filters.category || filters.severity || filters.status || filters.search);

    const clearAll = () => onFilterChange?.({});

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3 overflow-x-auto md:overflow-visible md:flex-row pb-1 -mx-1 px-1">
                <div className="min-w-[180px] md:flex-1">
                    <SearchBar
                        value={filters.search || ""}
                        onSearch={(v) => update("search", v)}
                        placeholder="Search incidents..."
                    />
                </div>

                <div className="min-w-[160px]">
                    <Select
                        value={filters.category || ""}
                        onValueChange={(v) => update("category", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                            {INCIDENT_CATEGORIES.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="min-w-[140px]">
                    <Select
                        value={filters.severity || ""}
                        onValueChange={(v) => update("severity", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All severities" />
                        </SelectTrigger>
                        <SelectContent>
                            {SEVERITY_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="min-w-[160px]">
                    <Select
                        value={filters.status || ""}
                        onValueChange={(v) => update("status", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            {STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {hasActive && (
                <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-1.5 self-start text-xs text-neutral-400 hover:text-[#F5E9D7] transition-colors"
                >
                    <X size={14} />
                    Clear filters
                </button>
            )}
        </div>
    );
};

export default IncidentFilters;