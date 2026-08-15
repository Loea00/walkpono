import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteArticle } from "@/lib/admin-actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-fern-800">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-full bg-fern-600 px-4 py-2 text-sm text-white hover:bg-fern-700"
        >
          New Article
        </Link>
      </div>

      <div className="mt-6 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
        {articles.map((article) => (
          <div key={article.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-ink-900">{article.title}</p>
              <p className="text-xs text-ink-900/50">
                /{article.slug} &middot; {article.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/articles/${article.id}`} className="text-sm text-fern-600 hover:underline">
                Edit
              </Link>
              <DeleteButton action={deleteArticle.bind(null, article.id)} />
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="p-4 text-sm text-ink-900/60">No articles yet.</p>}
      </div>
    </div>
  );
}
