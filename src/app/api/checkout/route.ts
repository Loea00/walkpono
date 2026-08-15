import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled } from "@/lib/stripe";

const checkoutSchema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().min(1) })).min(1),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Please log in to check out." }, { status: 401 });
  }

  if (!stripeEnabled || !stripe) {
    return NextResponse.json(
      { error: "Online checkout isn't connected yet. Please contact us to complete your order." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart." }, { status: 400 });
  }

  const productIds = parsed.data.items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds }, active: true } });

  const lineItems = parsed.data.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error("Product not found");
    return {
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: { name: product.name, images: product.images.slice(0, 1) },
      },
    };
  });

  const totalCents = parsed.data.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return sum + product.priceCents * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      totalCents,
      status: "PENDING",
      items: {
        create: parsed.data.items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return { productId: product.id, quantity: item.quantity, priceCents: product.priceCents };
        }),
      },
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${siteUrl}/account?order=success`,
    cancel_url: `${siteUrl}/cart`,
    customer_email: session.user.email ?? undefined,
    metadata: { orderId: order.id },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: checkoutSession.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
