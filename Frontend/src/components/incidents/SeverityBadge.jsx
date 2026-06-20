import { getSeverityColor, getSeverityBg, getSeverityLabel } from "../../utils/severityColor.js";

const SeverityBadge = ({ severity }) => {
  const bg = getSeverityBg(severity);
  const dot = getSeverityColor(severity);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${bg}`}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: dot }}
        aria-hidden="true"
      />
      {getSeverityLabel(severity)}
    </span>
  );
};

export default SeverityBadge;