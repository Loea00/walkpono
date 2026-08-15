import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">Orders</h1>
      <div className="mt-6 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
        {orders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink-900">{order.user.email}</p>
                <p className="text-xs text-ink-900/50">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-sand-200 px-3 py-1 text-xs font-medium text-ink-900/70">
                {order.status}
              </span>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-ink-900/80">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.quantity} &times; {item.product.name}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm font-medium text-ink-900">{formatCents(order.totalCents)}</p>
          </div>
        ))}
        {orders.length === 0 && <p className="p-4 text-sm text-ink-900/60">No orders yet.</p>}
      </div>
    </div>
  );
}
