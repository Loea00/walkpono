import { createWorkshop } from "@/lib/admin-actions";

export default function NewWorkshopPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">New Workshop</h1>
      <form action={createWorkshop} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Title</label>
          <input
            name="title"
            required
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">
            Slug (optional — auto-generated)
          </label>
          <input name="slug" className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Description</label>
          <textarea
            name="description"
            required
            rows={6}
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
              className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink-900/80">Location</label>
            <input
              name="location"
              className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-900/80">Capacity</label>
            <input
              name="capacity"
              type="number"
              min="1"
              className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">
            Cover Image URL (e.g. /images/gallery/teach-06.jpg)
          </label>
          <input
            name="coverImage"
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-900/80">
          <input type="checkbox" name="published" />
          Publish (open for registration)
        </label>
        <button
          type="submit"
          className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
        >
          Save Workshop
        </button>
      </form>
    </div>
  );
}
