"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SupplierCardProps {
  id: string;
  name: string;
  initials: string;
  rating: number;
  reviews: number;
  description: string;
  glowColor?: "purple" | "blue" | "pink";
  className?: string;
}

export function SupplierCard({ 
  id, 
  name, 
  initials, 
  rating, 
  reviews, 
  description, 
  glowColor = "pink",
  className
}: SupplierCardProps) {
  
  const glowVariants = {
    purple: "from-purple-900/40",
    blue: "from-blue-900/40",
    pink: "from-pink-900/40"
  };

  const avatarColors = {
    purple: "bg-purple-600 text-white",
    blue: "bg-blue-600 text-white",
    pink: "bg-pink-600 text-white"
  };

  return (
    <Link href={`/supplier/${id}`} className={cn("block w-full", className)}>
      <motion.div
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        className="glass-card relative overflow-hidden p-5 flex flex-col gap-4 group h-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Card Background Glow */}
        <div className={cn("absolute bottom-0 right-0 w-full h-2/3 bg-gradient-to-t to-transparent opacity-40 mix-blend-screen pointer-events-none transition-opacity group-hover:opacity-60", glowVariants[glowColor])} />
        
        <div className="flex justify-between items-start relative z-10 w-full">
          <div className="flex items-center gap-3">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg", avatarColors[glowColor])}>
              {initials}
            </div>
            <div>
              <h3 className="text-white font-semibold text-base leading-tight">
                {name}
              </h3>
              <p className="text-zinc-400 text-xs mt-0.5">({reviews} reviews)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
            <Star className="fill-yellow-500 text-yellow-500" size={14} />
            <span className="text-yellow-500 font-semibold text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed relative z-10 font-medium line-clamp-3">
          {description}
        </p>
      </motion.div>
    </Link>
  );
}
