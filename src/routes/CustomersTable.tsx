import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type Customer, useCustomers } from "@/hooks/useCustomers";
import { useState } from "react";
import OrdersTable from "./OrdersTable";
import { useTranslation } from "react-i18next";

export default function CustomersTable() {
  const { data: customers, isLoading } = useCustomers();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const { t } = useTranslation();

  if (isLoading) return <p>Loading...</p>;
  if (!customers) return <p>No data</p>;

  const cities = Array.from(new Set(customers.map((c) => c.city)));

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (cityFilter ? c.city === cityFilter : true)
  );

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">{t("Customers")}</h2>

      {/* Панель фильтров */}
      <div className="xs: flex-col flex gap-2 mb-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" max-w-xs"
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border rounded-md px-2 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700 max-w-xs"
        >
          <option value="">{t("All cities")}</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setCityFilter("");
          }}
          className="max-w-xs"
        >
          {t("Reset")}
        </Button>
      </div>

      {/* Таблица клиентов */}
      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">LTV</TableHead>
              <TableHead className="text-right">Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.city}</TableCell>
                <TableCell className="text-right">
                  {c.ltv.toLocaleString()} ₸
                </TableCell>
                <TableCell className="text-right">{c.ordersCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Диалог с деталями клиента */}
      <Dialog
        open={!!selectedCustomer}
        onOpenChange={() => setSelectedCustomer(null)}
      >
        <DialogContent className="dark:bg-gray-800  dark:text-white sm:max-w-lg rounded-2xl shadow-xl bg-white">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="dark:bg-gray-800  dark:text-white text-lg font-bold">
                  {selectedCustomer.name}
                </DialogTitle>
              </DialogHeader>

              <div className="dark:bg-gray-800  dark:text-white space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedCustomer.email}
                </p>
                <p>
                  <span className="font-semibold">City:</span>{" "}
                  {selectedCustomer.city}
                </p>
                <p>
                  <span className="font-semibold">LTV:</span>{" "}
                  {selectedCustomer.ltv.toLocaleString()} ₸
                </p>
                <p>
                  <span className="font-semibold">Orders:</span>{" "}
                  {selectedCustomer.ordersCount}
                </p>

                <h4 className="font-semibold mt-4">Order history</h4>
                <ul className="list-disc pl-5">
                  {selectedCustomer.orders.map((o) => (
                    <li key={o.id}>
                      {o.date} — {o.total.toLocaleString()} ₸
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <OrdersTable />
    </div>
  );
}
