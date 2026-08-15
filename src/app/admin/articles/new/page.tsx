import { createArticle } from "@/lib/admin-actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">New Article</h1>
      <form action={createArticle} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Title</label>
          <input
            name="title"
            required
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">
            Slug (optional — auto-generated from title)
          </label>
          <input name="slug" className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Excerpt</label>
          <textarea
            name="excerpt"
            rows={2}
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900/80">
            Cover Image URL (e.g. /images/hero-hiking.jpg)
          </label>
          <input
            name="coverImage"
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
            className="mt-1 w-full rounded-md border border-sand-300 px-3 py-2 font-mono text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-900/80">
          <input type="checkbox" name="published" />
          Publish immediately
        </label>
        <button
          type="submit"
          className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
        >
          Save Article
        </button>
      </form>
    </div>
  );
}
