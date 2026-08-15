import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: PageProps<"/store/[slug]">) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product || !product.active) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="grid gap-10 sm:grid-cols-2">
        {product.images[0] && (
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <h1 className="font-serif text-2xl text-fern-800 sm:text-3xl">{product.name}</h1>
          <p className="mt-2 text-xl font-medium text-fern-600">{formatCents(product.priceCents)}</p>
          <p className="mt-5 whitespace-pre-line text-ink-900/80 leading-relaxed">
            {product.description}
          </p>
          <div className="mt-8">
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              priceCents={product.priceCents}
              image={product.images[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
