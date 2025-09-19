import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type OrderItem = {
  sku: string;
  name: string;
  qty: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  customerName: string;
  city: string;
  channel: string;
  status: string;
  total: number;
  items: OrderItem[];
  comment?: string;
};

type Props = {
  order: Order | null;
  onClose: () => void;
};

export default function OrderModal({ order, onClose }: Props) {
  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="dark:bg-gray-800  dark:text-white sm:max-w-lg rounded-2xl shadow-xl bg-white">
        {order && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Order {order.id}
              </DialogTitle>
            </DialogHeader>

            <div className=" dark:bg-gray-800  dark:text-white space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {order.customerName}
              </p>
              <p>
                <span className="font-semibold">City:</span> {order.city}
              </p>
              <p>
                <span className="font-semibold">Channel:</span> {order.channel}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {order.date}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-semibold">Total:</span>{" "}
                {order.total.toLocaleString()} ₸
              </p>

              <h4 className="font-semibold mt-4">Items</h4>
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.sku}>
                    {item.name} — {item.qty} × {item.price.toLocaleString()} ₸
                  </li>
                ))}
              </ul>

              {order.comment && (
                <p className="mt-2">
                  <span className="font-semibold">Comment:</span>{" "}
                  {order.comment}
                </p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
