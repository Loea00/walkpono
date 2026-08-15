export default function Footer() {
  return (
    <footer className="border-t border-sand-300/70 bg-sand-100">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-ink-900/70">
        <p className="font-serif text-base text-fern-800">WalkPono LLC — The Greatness Institute</p>
        <p className="mt-2 max-w-xl">
          Mindfulness and forgiveness coaching, grounded in mo&#699;omeheu Hawai&#699;i and nohona
          Hawai&#699;i, with Aaron-Michael Ho.
        </p>
        <p className="mt-6 text-xs text-ink-900/50">
          &copy; {new Date().getFullYear()} WalkPono LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
