import { prisma } from "@/lib/prisma";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-serif text-2xl text-fern-800">Contact Messages</h1>
      <div className="mt-6 divide-y divide-sand-300 rounded-xl border border-sand-300 bg-white">
        {messages.map((m) => (
          <div key={m.id} className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-ink-900">
                {m.name} &lt;{m.email}&gt;
              </p>
              <p className="text-xs text-ink-900/50">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            {m.phone && <p className="mt-1 text-xs text-ink-900/60">{m.phone}</p>}
            <p className="mt-2 whitespace-pre-line text-sm text-ink-900/80">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="p-4 text-sm text-ink-900/60">No messages yet.</p>}
      </div>
    </div>
  );
}
