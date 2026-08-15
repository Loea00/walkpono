import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled } from "@/lib/stripe";

const registerSchema = z.object({ workshopId: z.string() });

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Please log in to register." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const workshop = await prisma.workshop.findUnique({ where: { id: parsed.data.workshopId } });
  if (!workshop || !workshop.published) {
    return NextResponse.json({ error: "Workshop not found." }, { status: 404 });
  }

  const existing = await prisma.registration.findUnique({
    where: { workshopId_userId: { workshopId: workshop.id, userId: session.user.id } },
  });
  if (existing) {
    return NextResponse.json({ error: "You're already registered for this workshop." }, { status: 409 });
  }

  if (workshop.capacity) {
    const confirmedCount = await prisma.registration.count({
      where: { workshopId: workshop.id, status: { in: ["CONFIRMED", "PENDING"] } },
    });
    if (confirmedCount >= workshop.capacity) {
      return NextResponse.json({ error: "This workshop is full." }, { status: 409 });
    }
  }

  // Free workshop — confirm immediately, no payment needed.
  if (!workshop.priceCents) {
    await prisma.registration.create({
      data: { workshopId: workshop.id, userId: session.user.id, status: "CONFIRMED" },
    });
    return NextResponse.json({ ok: true, redirect: "/account" });
  }

  if (!stripeEnabled || !stripe) {
    return NextResponse.json(
      { error: "Online payment isn't connected yet. Please contact us to register." },
      { status: 503 }
    );
  }

  const registration = await prisma.registration.create({
    data: { workshopId: workshop.id, userId: session.user.id, status: "PENDING" },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: workshop.priceCents,
          product_data: { name: workshop.title },
        },
      },
    ],
    success_url: `${siteUrl}/account?registration=success`,
    cancel_url: `${siteUrl}/workshops/${workshop.slug}`,
    customer_email: session.user.email ?? undefined,
    metadata: { registrationId: registration.id },
  });

  await prisma.registration.update({
    where: { id: registration.id },
    data: { stripeSessionId: checkoutSession.id },
  });

  return NextResponse.json({ ok: true, url: checkoutSession.url });
}
