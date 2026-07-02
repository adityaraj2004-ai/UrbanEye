import { Card, CardContent } from "../ui/card.jsx";

const StatsCard = ({ icon: Icon, label, value, accent = false }) => {
  return (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
            accent
              ? "bg-[#F5E9D7]/10 text-[#F5E9D7]"
              : "bg-white/5 text-neutral-300"
          }`}
        >
          {Icon && <Icon size={20} />}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-light text-white truncate">
            {value ?? "—"}
          </p>
          <p className="text-xs text-neutral-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;