import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0B0B0B" }}
    >
      <h1 className="text-7xl font-light tracking-tight text-white mb-4">404</h1>
      <p className="text-lg text-neutral-400 font-light mb-8">Page not found</p>
      <Button variant="filled" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
}
