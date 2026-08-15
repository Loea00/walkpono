import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [articleCount, productCount, workshopCount, orderCount, registrationCount, messageCount] =
    await Promise.all([
      prisma.article.count(),
      prisma.product.count(),
      prisma.workshop.count(),
      prisma.order.count(),
      prisma.registration.count(),
      prisma.contactMessage.count(),
    ]);

  const cards = [
    { label: "Articles", count: articleCount, href: "/admin/articles" },
    { label: "Products", count: productCount, href: "/admin/products" },
    { label: "Workshops", count: workshopCount, href: "/admin/workshops" },
    { label: "Orders", count: orderCount, href: "/admin/orders" },
    { label: "Registrations", count: registrationCount, href: "/admin/registrations" },
    { label: "Contact Messages", count: messageCount, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-sand-300 bg-white p-5 hover:border-fern-300"
          >
            <p className="text-3xl font-semibold text-fern-700">{card.count}</p>
            <p className="mt-1 text-sm text-ink-900/70">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
