"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartLink() {
  const { totalQuantity } = useCart();

  return (
    <Link href="/cart" className="relative text-ink-900/80 hover:text-fern-600">
      Cart
      {totalQuantity > 0 && (
        <span className="ml-1 rounded-full bg-fern-600 px-1.5 py-0.5 text-xs text-white">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
