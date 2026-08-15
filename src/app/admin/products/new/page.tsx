import { createProduct } from "@/lib/admin-actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">New Product</h1>
      <form action={createProduct} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Name</label>
          <input
            name="name"
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
            rows={5}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Price (USD)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">
            Image URL (e.g. /images/portrait.jpg)
          </label>
          <input name="image" className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-900/80">
          <input type="checkbox" name="active" defaultChecked />
          Active (visible in store)
        </label>
        <button
          type="submit"
          className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
