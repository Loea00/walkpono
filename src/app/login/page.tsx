import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-5 py-16">
      <h1 className="font-serif text-2xl text-fern-800">Log in</h1>
      <p className="mt-2 text-sm text-ink-900/70">
        Welcome back. Log in to manage your workshop bookings and orders.
      </p>
      <div className="mt-8">
        <AuthForm mode="login" />
      </div>
      <p className="mt-6 text-sm text-ink-900/70">
        New here?{" "}
        <Link href="/signup" className="text-fern-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
