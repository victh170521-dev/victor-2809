import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const betStats = [
  { name: "Ganadas", value: 4, color: "#2dd4bf" },
  { name: "Perdidas", value: 2, color: "#ef4444" },
];

export function BetSummaryChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={betStats}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={105}
            paddingAngle={4}
            cornerRadius={6}
          >
            {betStats.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color}
                stroke="transparent"
              />
            ))}
          </Pie>

          <Tooltip
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}