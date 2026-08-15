import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateArticle } from "@/lib/admin-actions";

export default async function EditArticlePage({ params }: PageProps<"/admin/articles/[id]">) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, article.id);

  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">Edit Article</h1>
      <form action={updateWithId} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Title</label>
          <input
            name="title"
            required
            defaultValue={article.title}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Slug</label>
          <input
            name="slug"
            defaultValue={article.slug}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Excerpt</label>
          <textarea
            name="excerpt"
            rows={2}
            defaultValue={article.excerpt ?? ""}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Cover Image URL</label>
          <input
            name="coverImage"
            defaultValue={article.coverImage ?? ""}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">
            Content (Markdown supported)
          </label>
          <textarea
            name="content"
            required
            rows={14}
            defaultValue={article.content}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 font-mono text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-900/80">
          <input type="checkbox" name="published" defaultChecked={article.published} />
          Published
        </label>
        <button
          type="submit"
          className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
