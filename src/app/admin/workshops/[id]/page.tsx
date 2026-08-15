import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateWorkshop } from "@/lib/admin-actions";

function toDateTimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export default async function EditWorkshopPage({ params }: PageProps<"/admin/workshops/[id]">) {
  const { id } = await params;
  const workshop = await prisma.workshop.findUnique({
    where: { id },
    include: { registrations: { include: { user: true }, orderBy: { createdAt: "desc" } } },
  });
  if (!workshop) notFound();

  const updateWithId = updateWorkshop.bind(null, workshop.id);

  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">Edit Workshop</h1>
      <form action={updateWithId} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Title</label>
          <input
            name="title"
            required
            defaultValue={workshop.title}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Slug</label>
          <input
            name="slug"
            defaultValue={workshop.slug}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Description</label>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={workshop.description}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink-900/80">Date &amp; Time</label>
            <input
              name="startAt"
              type="datetime-local"
              required
              defaultValue={toDateTimeLocal(workshop.startAt)}
              className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-900/80">
              Price (USD — leave blank for free)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={workshop.priceCents ? (workshop.priceCents / 100).toFixed(2) : ""}
              className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink-900/80">Location</label>
            <input
              name="location"
              defaultValue={workshop.location ?? ""}
              className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-900/80">Capacity</label>
            <input
              name="capacity"
              type="number"
              min="1"
              defaultValue={workshop.capacity ?? ""}
              className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Cover Image URL</label>
          <input
            name="coverImage"
            defaultValue={workshop.coverImage ?? ""}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-900/80">
          <input type="checkbox" name="published" defaultChecked={workshop.published} />
          Published (open for registration)
        </label>
        <button
          type="submit"
          className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
        >
          Save Changes
        </button>
      </form>

      <div className="mt-10">
        <h2 className="font-serif text-lg text-fern-800">
          Registrants ({workshop.registrations.length})
        </h2>
        {workshop.registrations.length === 0 ? (
          <p className="mt-2 text-sm text-ink-900/60">No one has registered yet.</p>
        ) : (
          <div className="mt-3 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
            {workshop.registrations.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 text-sm">
                <span>{r.user.name ?? r.user.email}</span>
                <span className="text-ink-900/60">{r.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
