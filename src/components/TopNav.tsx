"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { isActive, primaryNav, utilityNav } from "@/lib/nav";

// Routes that open on a full-screen film: the bar floats over it until the
// visitor scrolls past, then becomes the normal solid bar.
const OVERLAY_ROUTES = ["/home"];

export default function TopNav() {
  const pathname = usePathname();
  const overlay = OVERLAY_ROUTES.includes(pathname);
  const [pastFilm, setPastFilm] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    // Solid once the film's bottom edge passes under the bar (the film's height
    // differs between the full-screen and stacked masthead layouts).
    const onScroll = () => {
      const film = document.querySelector("[data-masthead]");
      setPastFilm(film ? film.getBoundingClientRect().bottom <= 64 : window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overlay]);

  const floating = overlay && !pastFilm;

  return (
    <header
      className={`sticky top-0 z-50 border-b-[1.5px] transition-colors duration-300 ${
        floating ? "on-dark theme-preserve bg-transparent border-transparent" : "bg-ground border-rod"
      }`}
    >
      <div className="wrap flex min-h-14 items-center gap-3 lg:gap-6">
        <Link href="/home" className="flex min-h-10 min-w-0 items-center gap-2" aria-label="LisBran home">
          <Logo size={22} />
          <span className="font-display text-[22px] leading-none tracking-tight truncate">LisBran</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex h-full items-stretch gap-1">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.match);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center px-3 text-sm font-semibold transition-colors ${
                  active ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
                {active && <span aria-hidden className="absolute inset-x-3 -bottom-[1.5px] h-[3px] bg-cord" />}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center">
          <Link
            href="/seller/onboarding"
            className="hidden lg:inline-flex min-h-9 items-center px-4 text-sm font-bold border-[1.5px] border-rod hover:bg-ink hover:text-ground transition-colors mr-2"
          >
            Sell on LisBran
          </Link>
          {utilityNav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                title={label}
                aria-current={active ? "page" : undefined}
                className={`relative hidden lg:inline-flex w-9 min-h-9 items-center justify-center transition-colors ${
                  active ? "text-cord" : "text-ink-2 hover:text-ink"
                }`}
              >
                <Icon size={18} strokeWidth={1.75} />
              </Link>
            );
          })}
          <ThemeToggle />
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="lg:hidden inline-flex w-9 min-h-9 items-center justify-center text-ink-2 hover:text-ink"
          >
            <Bell size={18} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </header>
  );
}
