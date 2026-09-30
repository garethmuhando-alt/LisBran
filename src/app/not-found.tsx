import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 text-ink">
      <h1 className="font-display text-5xl mb-2">We couldn&apos;t find that page</h1>
      <p className="text-ink-2 text-sm max-w-sm mb-6">The link may be broken or the page may have moved.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/home" className="inline-flex min-h-11 items-center px-5 font-bold text-cord-ink bg-cord hover:brightness-110">
          Go home
        </Link>
        <Link href="/categories" className="inline-flex min-h-11 items-center px-5 border-[1.5px] border-rod font-bold text-ink hover:bg-ink hover:text-ground">
          Browse services
        </Link>
      </div>
    </div>
  );
}
