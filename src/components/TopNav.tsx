"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Phone, User } from "lucide-react";

const navLinks = [
  { href: "/home",       label: "Home",       icon: Home  },
  { href: "/categories", label: "Categories", icon: Grid  },
  { href: "/contact",    label: "Contact Us", icon: Phone },
  { href: "/profile",    label: "Profile",    icon: User  },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-md border-b border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between px-4 md:px-8 h-12">
        {/* Brand mark */}
        <span
          className="text-white text-xl font-bold tracking-widest shrink-0"
          style={{ fontFamily: "'Brush Script MT', 'Great Vibes', cursive" }}
        >
          LisBran
        </span>

        {/* Navigation links */}
        <div className="flex items-center gap-1 md:gap-3">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-150 ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={14} strokeWidth={active ? 2.5 : 2} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
