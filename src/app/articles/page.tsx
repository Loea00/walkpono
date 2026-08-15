import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-serif text-3xl text-fern-800">Articles</h1>
      <p className="mt-2 text-ink-900/70">Reflections and teachings from Aaron-Michael Ho.</p>

      {articles.length === 0 ? (
        <p className="mt-10 text-ink-900/60">No articles published yet — check back soon.</p>
      ) : (
        <div className="mt-10 space-y-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="flex flex-col gap-4 rounded-xl border border-sand-300 bg-white p-5 sm:flex-row"
            >
              {article.coverImage && (
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:w-56">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
                </div>
              )}
              <div>
                <h2 className="font-serif text-xl text-ink-900">{article.title}</h2>
                {article.publishedAt && (
                  <p className="mt-1 text-xs uppercase tracking-wide text-fern-500">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                {article.excerpt && <p className="mt-3 text-sm text-ink-900/70">{article.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
