import { prisma } from "@/lib/prisma";

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    include: { user: true, workshop: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">Registrations</h1>
      <div className="mt-6 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
        {registrations.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-ink-900">{r.user.name ?? r.user.email}</p>
              <p className="text-xs text-ink-900/50">{r.workshop.title}</p>
            </div>
            <span className="rounded-full bg-sand-200 px-3 py-1 text-xs font-medium text-ink-900/70">
              {r.status}
            </span>
          </div>
        ))}
        {registrations.length === 0 && (
          <p className="p-4 text-sm text-ink-900/60">No registrations yet.</p>
        )}
      </div>
    </div>
  );
}
