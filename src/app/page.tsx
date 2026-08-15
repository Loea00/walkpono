import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [articles, workshops] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.workshop.findMany({
      where: { published: true },
      orderBy: { startAt: "asc" },
      take: 2,
    }),
  ]);

  return (
    <div>
      <section className="relative h-[86vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/hero-hiking.jpg"
          alt="Aaron-Michael Ho hiking a lush green trail in Hawai‘i"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-12 text-white">
          <h1 className="font-serif text-4xl font-semibold tracking-tight drop-shadow sm:text-6xl">
            WalkPono LLC
          </h1>
          <p className="mt-2 text-lg text-white/90 drop-shadow sm:text-xl">The Greatness Institute</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="font-serif text-lg italic text-fern-700">
          Onaona i ka hala me ka lehua… he hale lehua nō ia na ka noe…
        </p>
        <h2 className="mt-6 font-serif text-2xl text-ink-900 sm:text-3xl">E komo mai, welcome in.</h2>
        <p className="mt-4 text-ink-900/80 leading-relaxed">
          At WalkPono, we believe in the transformative power of mindfulness and forgiveness — especially
          when grounded in the powerful foundations of mo&#699;omeheu Hawai&#699;i and nohona
          Hawai&#699;i (Hawaiian culture). Our mission is to accompany individuals and groups on a journey
          of self-discovery, healing, and personal growth.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/about"
            className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
          >
            Meet Aaron
          </Link>
          <Link
            href="/workshops"
            className="rounded-full border border-fern-600 px-6 py-2.5 text-sm font-medium text-fern-700 hover:bg-fern-50"
          >
            Browse Workshops
          </Link>
        </div>
      </section>

      {workshops.length > 0 && (
        <section className="bg-sand-100 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-fern-800">Upcoming Workshops</h2>
              <Link href="/workshops" className="text-sm text-fern-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {workshops.map((w) => (
                <Link
                  key={w.id}
                  href={`/workshops/${w.slug}`}
                  className="group overflow-hidden rounded-xl border border-sand-300 bg-white"
                >
                  {w.coverImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={w.coverImage}
                        alt={w.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-ink-900">{w.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-900/70">{w.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-fern-800">From the Articles</h2>
              <Link href="/articles" className="text-sm text-fern-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  href={`/articles/${a.slug}`}
                  className="rounded-xl border border-sand-300 bg-white p-5 hover:border-fern-300"
                >
                  <h3 className="font-serif text-lg text-ink-900">{a.title}</h3>
                  {a.excerpt && <p className="mt-2 line-clamp-3 text-sm text-ink-900/70">{a.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
