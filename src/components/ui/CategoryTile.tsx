"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface CategoryTileProps {
  title: string;
  icon: LucideIcon;
  href: string;
}

export function CategoryTile({ title, icon: Icon, href }: CategoryTileProps) {
  return (
    <Link href={href} className="block w-full">
      <motion.div
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 py-4 border-b border-white/5 transition-colors group"
      >
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="relative w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shadow-lg">
            <Icon className="text-pink-400 group-hover:text-white transition-colors" size={24} strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-zinc-200 font-medium text-lg leading-tight group-hover:text-white transition-colors">
            {title}
          </h3>
        </div>
        
        <div className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}
