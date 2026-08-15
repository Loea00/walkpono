import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/lib/admin-actions";

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">Edit Product</h1>
      <form action={updateWithId} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Name</label>
          <input
            name="name"
            required
            defaultValue={product.name}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Slug</label>
          <input
            name="slug"
            defaultValue={product.slug}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Description</label>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={product.description}
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
            defaultValue={(product.priceCents / 100).toFixed(2)}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Image URL</label>
          <input
            name="image"
            defaultValue={product.images[0] ?? ""}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-900/80">
          <input type="checkbox" name="active" defaultChecked={product.active} />
          Active (visible in store)
        </label>
        <button
          type="submit"
          className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
