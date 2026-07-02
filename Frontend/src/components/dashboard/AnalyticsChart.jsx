import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "../ui/card.jsx";

const COLORS = ["#F5E9D7", "#A1A1A1", "#6b7280", "#4b5563", "#374151", "#22c55e", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-white/10 bg-[#111111] px-3 py-2 text-xs">
      <p className="text-neutral-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-white">
          {p.name}: <span className="text-[#F5E9D7]">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

const AnalyticsChart = ({ title, type = "bar", data = [], dataKey, nameKey }) => {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-sm font-medium text-white mb-4">{title}</h3>

        {data.length === 0 ? (
          <p className="text-xs text-neutral-500 py-8 text-center">
            No data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            {type === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey={nameKey}
                  stroke="#A1A1A1"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#A1A1A1" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey={dataKey} fill="#F5E9D7" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : type === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey={nameKey}
                  stroke="#A1A1A1"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#A1A1A1" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="#F5E9D7"
                  strokeWidth={2}
                  dot={{ fill: "#F5E9D7", r: 3 }}
                />
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={nameKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => entry[nameKey]}
                  labelLine={false}
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            )}
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;