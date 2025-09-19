import { useQuery } from "@tanstack/react-query";

export type OrderItem = {
  sku: string;
  name: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  customerName: string;
  city: string;
  channel: string;
  status: "New" | "Processing" | "Shipped";
  total: number;
  items: OrderItem[];
  comment?: string;
};

async function fetchOrders(): Promise<Order[]> {
  const res = await fetch("/data/orders.json");
  const json = await res.json();
  return json.orders;
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
  });
}
