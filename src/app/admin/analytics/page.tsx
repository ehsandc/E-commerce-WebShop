import { Suspense } from 'react';
import { getProducts } from '@/lib/db/products';

// Simple inline chart components (placeholder) using semantic HTML.
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-xs">
          <span className="w-24 truncate" title={d.label}>
            {d.label}
          </span>
          <div className="h-3 flex-1 overflow-hidden rounded bg-muted">
            <div
              className="h-full rounded bg-primary"
              style={{ width: `${(d.value / max) * 100}%` }}
              aria-label={`${d.label} ${d.value}`}
            />
          </div>
          <span className="w-10 text-right tabular-nums">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

export const metadata = { title: 'Admin Analytics' };

export default async function AnalyticsPage() {
  const products = await getProducts({});
  const byCategory: Record<string, number> = {};
  products.forEach((p) => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });
  const chartData = Object.entries(byCategory)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  // Placeholder KPI values (would be dynamic with real orders/users)
  const kpis = [
    { label: 'Active Products', value: products.length },
    { label: 'Categories', value: Object.keys(byCategory).length },
    {
      label: 'Avg Price',
      value: (
        products.reduce((s, p) => s + p.price, 0) / products.length
      ).toFixed(2),
    },
  ];

  return (
    <div className="container mx-auto space-y-10 px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Store Analytics</h1>
      <section className="grid gap-4 sm:grid-cols-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {k.label}
            </p>
            <p className="mt-1 text-xl font-bold tabular-nums">{k.value}</p>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Products by Category</h2>
        <Suspense
          fallback={
            <p className="text-sm text-muted-foreground">Loading chart...</p>
          }
        >
          <BarChart data={chartData} />
        </Suspense>
      </section>
    </div>
  );
}
