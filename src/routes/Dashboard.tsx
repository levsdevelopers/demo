import { useMemo, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import MetricCard from "@/components/MetricCard";
import RevenueChart from "@/components/RevenueChart";
import FiltersSheet from "@/components/FiltersSheet";
import ExportButton from "@/components/ExportButton";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

type Filter = {
  period: "7d" | "30d" | "qtd" | "ytd" | "custom";
  channel?: string;
  city?: string;
  from?: string;
  to?: string;
};

type Visit = {
  date: string;
  channel: string;
  city: string;
  visits: number;
};

export default function Dashboard() {
  const { t } = useTranslation();
  const { data: orders = [], isLoading } = useOrders();
  const [filters, setFilters] = useState<Filter>({ period: "7d" });

  const { data: visitsData = [] } = useQuery<Visit[]>({
    queryKey: ["visits"],
    queryFn: async () => {
      const res = await fetch("/data/visits.json");
      if (!res.ok) throw new Error("Failed to fetch visits");
      const json = await res.json();
      console.log("visits", json);
      return json.visits as Visit[];
    },
  });

  const filtered = useMemo(() => {
    if (!orders) return [];
    return orders.filter((o) => {
      if (
        filters.channel &&
        o.channel.toLowerCase() !== filters.channel.toLowerCase()
      )
        return false;
      if (filters.city && o.city !== filters.city) return false;
      if (filters.from && o.date < filters.from) return false;
      if (filters.to && o.date > filters.to) return false;
      return true;
    });
  }, [orders, filters]);

  const revenue = filtered.reduce((s, o) => s + o.total, 0);
  const ordersCount = filtered.length;
  const aov = ordersCount ? Math.round(revenue / ordersCount) : 0;

  const totalVisits = visitsData
    .filter((v) => {
      if (filters.channel && v.channel !== filters.channel) return false;
      if (filters.city && v.city !== filters.city) return false;
      if (filters.from && v.date < filters.from) return false;
      if (filters.to && v.date > filters.to) return false;
      return true;
    })
    .reduce((s, v) => s + v.visits, 0);

  const conversionRate = totalVisits
    ? ((ordersCount / totalVisits) * 100).toFixed(2)
    : "—";

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="xs:flex-col sm:flex-col md:flex-row px-2 flex-wrap flex gap-4 items-start mb-6">
        <MetricCard title={t("revenue")} value={revenue} subtitle="KZT" />
        <MetricCard title={t("orders")} value={ordersCount} />
        <MetricCard title={t("aov")} value={aov} subtitle="KZT" />
        <MetricCard
          title={t("conversion")}
          value={conversionRate + (conversionRate === "—" ? "" : "%")}
        />
        <div className="xs:flex-col sm:flex-col md:flex-row flex">
          <FiltersSheet onApply={setFilters} />
          <ExportButton rows={filtered} />
        </div>
      </div>

      <div className=" dark:bg-gray-800  dark:text-white bg-white p-4 rounded shadow">
        <h2 className="text-lg mb-4">{t("revenue")}</h2>
        <RevenueChart orders={filtered} />
      </div>
    </div>
  );
}
