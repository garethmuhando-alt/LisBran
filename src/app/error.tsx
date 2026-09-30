"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface to the browser console / any attached error reporter.
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 text-ink">
      <h1 className="font-display text-4xl mb-2">Something went wrong</h1>
      <p className="text-ink-2 text-sm max-w-sm mb-6">
        Sorry — this page hit an unexpected error. Please try again.
        {error.digest && <span className="block mt-2 font-mono text-xs text-ink-2">Ref: {error.digest}</span>}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex min-h-11 items-center px-5 font-bold text-cord-ink bg-cord hover:brightness-110"
        >
          Try again
        </button>
        <Link href="/home" className="inline-flex min-h-11 items-center px-5 border-[1.5px] border-rod font-bold text-ink hover:bg-ink hover:text-ground">
          Go home
        </Link>
      </div>
    </div>
  );
}
