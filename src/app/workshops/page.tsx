import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function WorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    where: { published: true },
    orderBy: { startAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-serif text-3xl text-fern-800">Workshops &amp; Courses</h1>
      <p className="mt-2 text-ink-900/70">Experiential learning — never textbook, never lecture.</p>

      {workshops.length === 0 ? (
        <p className="mt-10 text-ink-900/60">
          No workshops are open for registration right now — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((w) => (
            <Link
              key={w.id}
              href={`/workshops/${w.slug}`}
              className="overflow-hidden rounded-xl border border-sand-300 bg-white"
            >
              {w.coverImage && (
                <div className="relative h-48 w-full">
                  <Image src={w.coverImage} alt={w.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-fern-500">
                  {new Date(w.startAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-1 font-serif text-lg text-ink-900">{w.title}</h2>
                <p className="mt-2 text-sm font-medium text-fern-600">
                  {w.priceCents ? formatCents(w.priceCents) : "Free"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
