"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";

export default function AddToCartButton({
  productId,
  slug,
  name,
  priceCents,
  image,
}: {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  image?: string;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => {
          addItem({ productId, slug, name, priceCents, image });
          setAdded(true);
        }}
        className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
      >
        Add to Cart
      </button>
      {added && (
        <button
          onClick={() => router.push("/cart")}
          className="rounded-full border border-fern-600 px-6 py-2.5 text-sm font-medium text-fern-700 hover:bg-fern-50"
        >
          View Cart &rarr;
        </button>
      )}
    </div>
  );
}
