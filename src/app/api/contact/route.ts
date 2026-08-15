import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;
  await prisma.contactMessage.create({
    data: { name, email, phone: phone || null, message },
  });

  return NextResponse.json({ ok: true });
}
