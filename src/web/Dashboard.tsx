import { useEffect, useState } from "react";
import { Card, Chart, Table } from "./components";

type Order = { id: string; total: number; placedAt: string };

export default function Dashboard({ userId }: { userId: string }) {
  const [data, setData] = useState<{ name: string; orders: Order[]; revenue: number[] } | null>(null);

  useEffect(() => {
    (async () => {
      const user = await fetch(`/api/users/${userId}`).then((r) => r.json());
      const orders = await fetch(`/api/orders?user=${userId}`).then((r) => r.json());
      const revenue = await fetch(`/api/revenue?user=${userId}`).then((r) => r.json());
      setData({ name: user.name, orders, revenue });
    })();
  }, []);

  if (!data) return null;

  const recent = [...data.orders].sort((a, b) => b.placedAt.localeCompare(a.placedAt)).slice(0, 10);

  return (
    <Card title={`Hello ${data.name}`} style={{ padding: 16 }}>
      <Table rows={recent} onRowClick={(row: Order) => console.log(row.id)} />
      <Chart points={data.revenue} />
    </Card>
  );
}
