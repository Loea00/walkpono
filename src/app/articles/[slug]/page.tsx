import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma";

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });

  if (!article || !article.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      {article.coverImage && (
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-xl">
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
        </div>
      )}
      <h1 className="font-serif text-3xl text-fern-800 sm:text-4xl">{article.title}</h1>
      {article.publishedAt && (
        <p className="mt-2 text-xs uppercase tracking-wide text-fern-500">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <div className="prose-article mt-8 text-ink-900/85">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}
