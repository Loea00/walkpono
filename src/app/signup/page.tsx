import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-sm px-5 py-16">
      <h1 className="font-serif text-2xl text-fern-800">Create an account</h1>
      <p className="mt-2 text-sm text-ink-900/70">
        Sign up to register for workshops, track orders, and stay connected.
      </p>
      <div className="mt-8">
        <AuthForm mode="signup" />
      </div>
      <p className="mt-6 text-sm text-ink-900/70">
        Already have an account?{" "}
        <Link href="/login" className="text-fern-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
