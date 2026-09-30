"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, tabNav } from "@/lib/nav";

// Phones and tablets. From 1024px wide the top bar carries every link.
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Tabs"
      className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-ground rod-top pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {tabNav.map(({ href, label, icon: Icon, match }) => {
          const active = isActive(pathname, match);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold ${
                  active ? "text-ink" : "text-ink-3"
                }`}
              >
                {active && <span aria-hidden className="absolute inset-x-4 top-0 h-[3px] bg-cord" />}
                <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
