"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmitQuery?: (query: string) => void;
}

export function SearchInput({ className, onSubmitQuery, ...props }: SearchInputProps) {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q")?.toString() || "";
    if (query) {
       router.push(`/search/${query.toLowerCase().replace(/\\s+/g, '-')}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative group w-full", className)}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-purple-400 transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        name="q"
        className="block w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium"
        {...props}
      />
    </form>
  );
}
