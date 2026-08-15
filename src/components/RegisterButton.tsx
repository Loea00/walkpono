"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

export default function RegisterButton({
  workshopId,
  session,
  alreadyRegistered,
}: {
  workshopId: string;
  session: Session | null;
  alreadyRegistered: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">(
    alreadyRegistered ? "done" : "idle"
  );
  const [error, setError] = useState<string | null>(null);

  if (!session?.user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700"
      >
        Log in to Register
      </button>
    );
  }

  if (status === "done") {
    return <p className="text-fern-700">You&rsquo;re registered for this workshop. See you there!</p>;
  }

  async function handleRegister() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workshopId }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not register.");
      if (body.url) {
        window.location.href = body.url;
        return;
      }
      setStatus("done");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div>
      <button
        onClick={handleRegister}
        disabled={status === "loading"}
        className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700 disabled:opacity-60"
      >
        {status === "loading" ? "Please wait…" : "Register"}
      </button>
      {error && <p className="mt-2 text-sm text-clay-600">{error}</p>}
    </div>
  );
}
