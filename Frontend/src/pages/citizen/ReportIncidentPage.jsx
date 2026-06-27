import { useSearchParams, useNavigate } from "react-router-dom";
import IncidentForm from "../../components/incidents/IncidentForm.jsx";

const ReportIncidentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const initialLocation =
    lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

  return (
    <div className="min-h-screen px-4 md:px-8 py-8" style={{ background: "#0B0B0B" }}>
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
            Report an Incident
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Help your community by reporting civic issues you've spotted.
          </p>
        </header>

        <IncidentForm
          initialLocation={initialLocation}
          onSuccess={(incident) => {
            const id = incident?._id || incident?.id;
            if (id) navigate(`/incidents/${id}`);
            else navigate("/home");
          }}
        />
      </div>
    </div>
  );
};

export default ReportIncidentPage;