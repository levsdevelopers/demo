import { useQuery } from "@tanstack/react-query";

export type Customer = {
  id: string;
  name: string;
  email: string;
  city: string;
  ltv: number;
  ordersCount: number;
  orders: {
    id: string;
    date: string;
    total: number;
  }[];
};

async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch("/data/customers.json");
  if (!res.ok) throw new Error("Failed to load customers.json");
  const json = await res.json();
  return json.customers;
}

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    staleTime: 1000 * 60 * 5,
  });
}
