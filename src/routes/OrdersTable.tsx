import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import { useEffect, useState } from "react";
import OrderModal from "@/components/OrderModal";

type Order = {
  id: string;
  date: string;
  customerName: string;
  city: string;
  channel: string;
  status: string;
  total: number;
  items: { sku: string; name: string; qty: number; price: number }[];
  comment?: string;
};

export default function OrdersTable() {
  const { data: ordersData, isLoading } = useOrders();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  if (isLoading) return <p>Loading...</p>;
  if (!orders) return <p>No data</p>;

  const handleStatusChange = (order: Order, newStatus: string) => {
    setOrders(
      (prev) =>
        prev?.map((o) =>
          o.id === order.id ? { ...o, status: newStatus } : o
        ) || null
    );
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: Order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => setSelectedOrder(order)}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.city}</TableCell>
              <TableCell>{order.channel}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {order.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-lg w-40 p-1 border border-gray-200 dark:border-gray-700">
                    {["New", "Processing", "Shipped", "Delivered"].map(
                      (status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order, status);
                          }}
                          className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                        >
                          {status}
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="text-right">
                {order.total.toLocaleString()} ₸
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
