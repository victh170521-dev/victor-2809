import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const snailStats = [
  { name: "Turbo", wins: 2, color: "#2dd4bf" },
  { name: "Shelby", wins: 1, color: "#8b5cf6" },
  { name: "Flash", wins: 1, color: "#f59e0b" },
  { name: "Rocket", wins: 1, color: "#ef4444" },
  { name: "Speedy", wins: 1, color: "#3b82f6" },
  { name: "Gary", wins: 0, color: "#ec4899" },
];

export function SnailWinsChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={snailStats}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#cfcfcf" }}
            axisLine={{ stroke: "#555" }}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#cfcfcf" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
          cursor={{
              fill: "rgba(255, 255, 255, 0.05)",
            }}
            contentStyle={{
              background: "rgba(15, 15, 15, 0.82)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.30)",
              color: "#fff",
            }}
            labelStyle={{
              color: "#aaa",
            }}
            itemStyle={{
              color: "#fff",
            }}
          />
          <Legend />

          <Bar
            dataKey="wins"
            name="Victorias"
            radius={[6, 6, 0, 0]}
          >
            {snailStats.map((snail) => (
              <Cell
                key={snail.name}
                fill={snail.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}