"use client";

import { Home, Bookmark, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, href: "/home" },
    { icon: Bookmark, href: "/saved" },
    { 
      icon: Bell, 
      href: "/notifications",
      badge: true // Example for the red dot
    },
    { icon: User, href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl bg-zinc-900 border-t border-white/10 px-6 py-4 pb-8 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={index} href={item.href} className="relative group">
              <div
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  isActive ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon size={24} className={isActive ? "fill-white" : ""} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-zinc-900" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
