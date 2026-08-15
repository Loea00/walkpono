import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@walkpono.org";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "changeme123";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Aaron-Michael Ho",
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
    },
  });

  console.log(`Admin user ready: ${admin.email} (password: ${adminPassword} — change after first login)`);

  await prisma.article.upsert({
    where: { slug: "welcome-to-the-new-walkpono" },
    update: {},
    create: {
      slug: "welcome-to-the-new-walkpono",
      title: "Welcome to the New WalkPono",
      excerpt:
        "We've rebuilt our online home from the ground up — same mission, new tools for articles, workshops, and community.",
      content: `E komo mai, welcome in.

WalkPono LLC: The Greatness Institute has a new online home. The mission hasn't changed — we're still here to accompany individuals and groups on a journey of self-discovery, healing, and personal growth, grounded in mo'omeheu Hawai'i and nohona Hawai'i.

What's new is how we can show up for you here: fresh articles as they're written, a full catalog of upcoming workshops and courses you can register for directly, and a small store for resources that support the work.

More is on the way. Thank you for walking this path with us.`,
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
      coverImage: "/images/hero-hiking.jpg",
    },
  });

  // Salvaged essays, kept as private drafts — not published without a rewrite pass.
  await prisma.article.upsert({
    where: { slug: "my-stewy-so-called-life" },
    update: {},
    create: {
      slug: "my-stewy-so-called-life",
      title: "My Stewy So-called Life! (draft — needs edit pass before publishing)",
      excerpt: "Life as Stew: Managing the Ingredients of Stress",
      content:
        "Life as Stew: Managing the Ingredients of Stress\n\n[Salvaged from the old site — edit before publishing.]\n\nIt's often said that the secret to good writing is to start with what you know...",
      published: false,
      authorId: admin.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "the-lessons-we-learn" },
    update: {},
    create: {
      slug: "the-lessons-we-learn",
      title: "The 'Lessons' We Learn… (draft — needs edit pass before publishing)",
      excerpt: "Throughout my long and winding mindfulness journey, I've had plenty of 'aha!' moments.",
      content:
        "[Salvaged from the old site — edit before publishing.]\n\nThroughout my long and winding mindfulness journey, I've had plenty of 'aha!' moments…",
      published: false,
      authorId: admin.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "one-on-one-coaching-session" },
    update: {},
    create: {
      slug: "one-on-one-coaching-session",
      name: "1-on-1 Coaching Session (60 min)",
      description:
        "A private coaching session with Aaron-Michael Ho. Bring your own goals — we'll refine your skills, strategize your game plan, and elevate your expertise, grounded in mindfulness and forgiveness practice.",
      priceCents: 12000,
      images: ["/images/portrait.jpg"],
      active: false,
    },
  });

  await prisma.workshop.upsert({
    where: { slug: "step-into-your-greatness" },
    update: {},
    create: {
      slug: "step-into-your-greatness",
      title: "SuperHero: Step Into and Own Your Greatness",
      description:
        "A workshop on self-acceptance — how we judge ourselves through the pursuit of belonging, and how to come home to your own unique greatness. Interactive, experiential, and grounded in Hawaiian cultural values.",
      coverImage: "/images/gallery/teach-06.jpg",
      priceCents: 4500,
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      location: "O‘ahu (location shared upon registration)",
      capacity: 20,
      published: false,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
