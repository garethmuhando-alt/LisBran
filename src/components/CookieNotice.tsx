"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "lisbran_cookie_notice";

// LisBran only uses strictly-necessary browser storage (theme, location,
// this notice). This banner discloses that as required by the Kenya Data
// Protection Act 2019 transparency duties. If analytics or advertising tags are
// ever added, replace this with an opt-in consent banner and block those tags
// until the visitor accepts.
export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {
      // Storage blocked — show the notice; it just won't be remembered.
    }
    if (!seen) {
      const id = requestAnimationFrame(() => setOpen(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  if (!open) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
  };

  // A slim bar on the bottom edge (above the phone tab bar), so it never
  // covers the page's primary action.
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-16 lg:bottom-0 z-[60] bg-surface border-t-[1.5px] border-rod lg:pb-[env(safe-area-inset-bottom)]"
    >
      <div className="wrap py-2 flex items-center gap-4 text-sm text-ink-2">
        <p className="flex-1">
          Essential storage only: your theme, city and saved suppliers. No tracking.{" "}
          <Link href="/cookies" className="underline hover:text-ink whitespace-nowrap">Cookie Policy</Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="min-h-8 px-3 shrink-0 bg-ink text-ground text-sm font-bold hover:bg-cord hover:text-cord-ink transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
