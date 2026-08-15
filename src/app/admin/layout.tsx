import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/workshops", label: "Workshops" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/messages", label: "Messages" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row">
      <aside className="shrink-0 sm:w-48">
        <p className="font-serif text-lg text-fern-800">Admin</p>
        <nav className="mt-4 flex flex-row flex-wrap gap-x-4 gap-y-2 text-sm sm:flex-col">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink-900/75 hover:text-fern-600">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
