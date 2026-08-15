"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-ink-900/80 hover:text-fern-600"
    >
      Log out
    </button>
  );
}
