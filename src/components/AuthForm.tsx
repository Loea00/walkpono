"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    try {
      if (mode === "signup") {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Could not create account.");
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid email or password.");
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label className="block text-sm font-medium text-ink-900/80">Name</label>
          <input
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm focus:border-fern-500 focus:outline-none"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-ink-900/80">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm focus:border-fern-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-900/80">Password</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm focus:border-fern-500 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-clay-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-fern-600 px-4 py-2 text-sm font-medium text-white hover:bg-fern-700 disabled:opacity-60"
      >
        {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
      </button>
    </form>
  );
}
