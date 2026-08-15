import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { auth } from "@/lib/auth";
import RegisterButton from "@/components/RegisterButton";

export default async function WorkshopPage({ params }: PageProps<"/workshops/[slug]">) {
  const { slug } = await params;
  const workshop = await prisma.workshop.findUnique({ where: { slug } });

  if (!workshop || !workshop.published) notFound();

  const session = await auth();
  let alreadyRegistered = false;
  if (session?.user) {
    const existing = await prisma.registration.findUnique({
      where: { workshopId_userId: { workshopId: workshop.id, userId: session.user.id } },
    });
    alreadyRegistered = Boolean(existing);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      {workshop.coverImage && (
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-xl">
          <Image src={workshop.coverImage} alt={workshop.title} fill className="object-cover" />
        </div>
      )}
      <h1 className="font-serif text-3xl text-fern-800 sm:text-4xl">{workshop.title}</h1>

      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-900/70">
        <div>
          <dt className="font-medium text-ink-900">When</dt>
          <dd>
            {new Date(workshop.startAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </dd>
        </div>
        {workshop.location && (
          <div>
            <dt className="font-medium text-ink-900">Where</dt>
            <dd>{workshop.location}</dd>
          </div>
        )}
        <div>
          <dt className="font-medium text-ink-900">Cost</dt>
          <dd>{workshop.priceCents ? formatCents(workshop.priceCents) : "Free"}</dd>
        </div>
      </dl>

      <p className="mt-8 whitespace-pre-line leading-relaxed text-ink-900/85">{workshop.description}</p>

      <div className="mt-10">
        <RegisterButton
          workshopId={workshop.id}
          session={session}
          alreadyRegistered={alreadyRegistered}
        />
      </div>
    </div>
  );
}
