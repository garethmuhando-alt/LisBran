"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ className, ...props }: SearchInputProps) {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("q")?.toString().trim() || "";
    if (query) router.push(`/search/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-"))}`);
  };

  return (
    <search className={cn("block relative w-full", className)}>
    <form onSubmit={handleSearch} className="relative w-full">
      <label htmlFor="site-search" className="sr-only">Search services</label>
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" aria-hidden />
      <input
        id="site-search"
        type="search"
        name="q"
        className="block w-full h-12 pl-10 pr-4 bg-surface border-[1.5px] border-rod text-ink font-medium focus:outline-none focus:border-cord"
        {...props}
      />
    </form>
    </search>
  );
}
