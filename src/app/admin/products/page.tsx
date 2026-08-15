import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/admin-actions";
import { formatCents } from "@/lib/money";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-fern-800">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-fern-600 px-4 py-2 text-sm text-white hover:bg-fern-700"
        >
          New Product
        </Link>
      </div>

      <div className="mt-6 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-ink-900">{product.name}</p>
              <p className="text-xs text-ink-900/50">
                {formatCents(product.priceCents)} &middot; {product.active ? "Active" : "Hidden"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/products/${product.id}`} className="text-sm text-fern-600 hover:underline">
                Edit
              </Link>
              <DeleteButton action={deleteProduct.bind(null, product.id)} />
            </div>
          </div>
        ))}
        {products.length === 0 && <p className="p-4 text-sm text-ink-900/60">No products yet.</p>}
      </div>
    </div>
  );
}
