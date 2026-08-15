import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripeEnabled || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await request.text();

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object;

    const order = await prisma.order.findUnique({ where: { stripeSessionId: checkoutSession.id } });
    if (order) {
      await prisma.order.update({ where: { id: order.id }, data: { status: "PAID" } });
    }

    const registration = await prisma.registration.findUnique({
      where: { stripeSessionId: checkoutSession.id },
    });
    if (registration) {
      await prisma.registration.update({
        where: { id: registration.id },
        data: { status: "CONFIRMED" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
