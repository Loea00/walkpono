"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatCents } from "@/lib/money";

export default function CartPage() {
  const { items, removeItem, setQuantity, totalCents } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not start checkout.");
      window.location.href = body.url;
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-3xl text-fern-800">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-10">
          <p className="text-ink-900/70">Your cart is empty.</p>
          <Link href="/store" className="mt-4 inline-block text-fern-600 hover:underline">
            Browse the store &rarr;
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <div className="divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-4">
                {item.image && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-ink-900">{item.name}</p>
                  <p className="text-sm text-ink-900/60">{formatCents(item.priceCents)}</p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => setQuantity(item.productId, Number(e.target.value))}
                  className="w-16 rounded-md border border-sand-300 px-2 py-1 text-center text-sm"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-sm text-clay-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-lg font-medium text-ink-900">Total: {formatCents(totalCents)}</p>
            <button
              onClick={handleCheckout}
              disabled={status === "loading"}
              className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700 disabled:opacity-60"
            >
              {status === "loading" ? "Redirecting…" : "Checkout"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-clay-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
