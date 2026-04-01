"use client";

import { motion } from "framer-motion";
import { SupplierCard } from "@/components/ui/SupplierCard";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center gap-3 mb-8 sticky top-0 pt-2 pb-4 bg-[#0a0a0a]/90 backdrop-blur-md z-20">
        <motion.div 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 bg-zinc-900 rounded-full border border-white/10"
        >
          <Bookmark className="text-purple-400" size={24} />
        </motion.div>
        <h1 className="text-white font-bold text-2xl">Saved Services</h1>
      </div>

      <div className="flex flex-col gap-4">
        <SupplierCard
          id="sps"
          name="SP Design Services"
          initials="SPS"
          rating={3.9}
          reviews={157}
          description="Available anytime to meet your branding needs. We specialize in creating unique logos with quick turnaround times."
          glowColor="blue"
        />
        <SupplierCard
          id="h-t"
          name="H&T Marketing"
          initials="HT"
          rating={4.9}
          reviews={210}
          description="Top-tier influencer marketing packages tailored to your brand constraints."
          glowColor="purple"
        />
      </div>
    </div>
  );
}
