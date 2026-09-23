import { useEffect, useState } from "react";
import { Card, Chart, Table } from "./components";

type Order = { id: string; total: number; placedAt: string };

export default function Dashboard({ userId }: { userId: string }) {
  const [data, setData] = useState<{ name: string; orders: Order[]; revenue: number[] } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);

    (async () => {
      try {
        const id = encodeURIComponent(userId);
        const [userRes, ordersRes, revenueRes] = await Promise.all([
          fetch(`/api/users/${id}`),
          fetch(`/api/orders?user=${id}`),
          fetch(`/api/revenue?user=${id}`),
        ]);
        if (!userRes.ok || !ordersRes.ok || !revenueRes.ok) {
          throw new Error("Failed to load dashboard data");
        }
        const [user, orders, revenue] = await Promise.all([
          userRes.json(),
          ordersRes.json(),
          revenueRes.json(),
        ]);
        if (!cancelled) setData({ name: user.name, orders, revenue });
      } catch {
        // data stays null; the render check below covers this case
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!data) return null;

  const recent = [...data.orders]
    .sort((a, b) => Date.parse(b.placedAt) - Date.parse(a.placedAt))
    .slice(0, 10);

  return (
    <Card title={`Hello ${data.name}`} style={{ padding: 16 }}>
      <Table rows={recent} onRowClick={() => {}} />
      <Chart points={data.revenue} />
    </Card>
  );
}
