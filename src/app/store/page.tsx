import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function StorePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-serif text-3xl text-fern-800">Store</h1>
      <p className="mt-2 text-ink-900/70">Resources and sessions to support your practice.</p>

      {products.length === 0 ? (
        <p className="mt-10 text-ink-900/60">The store is being stocked — check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.slug}`}
              className="overflow-hidden rounded-xl border border-sand-300 bg-white"
            >
              {product.images[0] && (
                <div className="relative h-48 w-full">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-serif text-lg text-ink-900">{product.name}</h2>
                <p className="mt-2 text-sm font-medium text-fern-600">
                  {formatCents(product.priceCents)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
