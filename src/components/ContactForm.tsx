"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg bg-fern-50 px-4 py-3 text-fern-700">
        Mahalo! Your message has been sent — we&rsquo;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink-900/80">Name *</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm focus:border-fern-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-900/80">Email *</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm focus:border-fern-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-900/80">Cell Phone</label>
        <input
          name="phone"
          className="mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm focus:border-fern-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-900/80">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm focus:border-fern-500 focus:outline-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-clay-600">Something went wrong — please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-fern-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-fern-700 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Get in touch!"}
      </button>
    </form>
  );
}
