"use client";

import { SearchInput } from "@/components/ui/SearchInput";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { PenTool, Mic2, Megaphone, Ticket, Printer } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { title: "Graphic Design Services", icon: PenTool, href: "/search/logo-design" },
    { title: "Influencer Marketing Services", icon: Mic2, href: "/search/influencer" },
    { title: "Influencer and Promotion Services", icon: Megaphone, href: "/search/promotion" },
    { title: "Event and Activation Services", icon: Ticket, href: "/search/events" },
    { title: "Printing Services", icon: Printer, href: "/search/printing" },
  ];

  return (
    <div className="p-6 relative min-h-screen">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

      <div className="sticky top-0 z-20 pt-2 pb-6 bg-[#0a0a0a]/90 backdrop-blur-md">
        <SearchInput placeholder="Search services" autoFocus />
      </div>

      <div className="mt-4 relative z-10">
        <h2 className="text-white font-bold text-xl mb-6">Categories</h2>
        
        <div className="flex flex-col gap-2">
          {categories.map((cat, idx) => (
            <CategoryTile 
              key={idx}
              title={cat.title}
              icon={cat.icon}
              href={cat.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
