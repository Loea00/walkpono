import Link from "next/link";
import type { Session } from "next-auth";
import SignOutButton from "@/components/SignOutButton";
import CartLink from "@/components/CartLink";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/workshops", label: "Workshops" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-300/70 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-fern-800">
          WalkPono <span className="text-fern-500 font-normal">LLC</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-900/80 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-fern-600">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <CartLink />
          {session?.user ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="hidden text-fern-700 hover:underline sm:inline">
                  Admin
                </Link>
              )}
              <Link href="/account" className="hidden text-ink-900/80 hover:text-fern-600 sm:inline">
                My Account
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-ink-900/80 hover:text-fern-600">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-fern-600 px-4 py-1.5 text-white hover:bg-fern-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto px-5 pb-3 text-sm font-medium text-ink-900/80 md:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-fern-600">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
