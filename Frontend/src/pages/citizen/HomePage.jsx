import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useIncidents } from "../../hooks/useIncidents.js";
import useAuth from "../../hooks/useAuth.js";
import IncidentFilters from "../../components/incidents/IncidentFilters.jsx";
import IncidentFeed from "../../components/incidents/IncidentFeed.jsx";
import Pagination from "../../components/common/Pagination.jsx";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const queryParams = { ...filters, page, limit: 12 };
  const { data, isLoading } = useIncidents(queryParams);

  const incidents = data?.incidents || data?.results || [];
  const totalPages = data?.totalPages || data?.pagination?.totalPages || 1;
  const currentPage = data?.currentPage || data?.pagination?.currentPage || page;

  const handleFilterChange = (next) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Welcome back, <span className="text-[#F5E9D7]">{user?.fullName || "Citizen"}</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Browse and track incidents reported in your community.
          </p>
        </header>

        <div className="mb-8">
          <IncidentFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <IncidentFeed incidents={incidents} isLoading={isLoading} />

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/report")}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 h-14 px-5 rounded-full bg-[#F5E9D7] text-[#0B0B0B] font-medium shadow-lg shadow-black/40 hover:bg-[#ECDFC8] transition-colors z-40"
        aria-label="Report incident"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">Report Incident</span>
      </motion.button>
    </div>
  );
}
