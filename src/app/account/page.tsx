import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [orders, registrations] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.registration.findMany({
      where: { userId: session.user.id },
      include: { workshop: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-3xl text-fern-800">My Account</h1>
      <p className="mt-2 text-ink-900/70">{session.user.email}</p>

      <section className="mt-12">
        <h2 className="font-serif text-xl text-fern-800">My Bookings</h2>
        {registrations.length === 0 ? (
          <p className="mt-3 text-sm text-ink-900/60">
            No workshop registrations yet.{" "}
            <Link href="/workshops" className="text-fern-600 hover:underline">
              Browse workshops
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
            {registrations.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-ink-900">{r.workshop.title}</p>
                  <p className="text-sm text-ink-900/60">
                    {new Date(r.workshop.startAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    r.status === "CONFIRMED"
                      ? "bg-fern-100 text-fern-700"
                      : r.status === "PENDING"
                        ? "bg-sand-200 text-ink-900/70"
                        : "bg-clay-500/10 text-clay-600"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-xl text-fern-800">My Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-ink-900/60">
            No orders yet.{" "}
            <Link href="/store" className="text-fern-600 hover:underline">
              Visit the store
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
            {orders.map((order) => (
              <div key={order.id} className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-ink-900/60">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === "PAID"
                        ? "bg-fern-100 text-fern-700"
                        : order.status === "PENDING"
                          ? "bg-sand-200 text-ink-900/70"
                          : "bg-clay-500/10 text-clay-600"
                    }`}
                  >
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
          </div>
        )}
      </section>
    </div>
  );
}
