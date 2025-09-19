import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Order = { date: string; total: number };

export default function RevenueChart({ orders }: { orders: Order[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach((o) => {
      const d = o.date;
      map.set(d, (map.get(d) || 0) + o.total);
    });
    return Array.from(map.entries())
      .sort()
      .map(([date, revenue]) => ({ date, revenue }));
  }, [orders]);

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
