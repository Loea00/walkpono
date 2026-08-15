import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteWorkshop } from "@/lib/admin-actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminWorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { startAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-fern-800">Workshops</h1>
        <Link
          href="/admin/workshops/new"
          className="rounded-full bg-fern-600 px-4 py-2 text-sm text-white hover:bg-fern-700"
        >
          New Workshop
        </Link>
      </div>

      <div className="mt-6 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
        {workshops.map((w) => (
          <div key={w.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-ink-900">{w.title}</p>
              <p className="text-xs text-ink-900/50">
                {new Date(w.startAt).toLocaleDateString()} &middot;{" "}
                {w.published ? "Published" : "Draft"} &middot; {w._count.registrations} registered
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/workshops/${w.id}`} className="text-sm text-fern-600 hover:underline">
                Edit
              </Link>
              <DeleteButton action={deleteWorkshop.bind(null, w.id)} />
            </div>
          </div>
        ))}
        {workshops.length === 0 && <p className="p-4 text-sm text-ink-900/60">No workshops yet.</p>}
      </div>
    </div>
  );
}
