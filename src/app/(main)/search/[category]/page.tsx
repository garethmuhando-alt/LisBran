"use client";

import React from "react";
import { SlidersHorizontal, ArrowLeft, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { SupplierCard } from "@/components/ui/SupplierCard";
import { motion } from "framer-motion";

export default function SearchResultsPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  
  const titleMap: Record<string, string> = {
    "logo-design": "Logo Design",
    "brand-style-guides": "Brand Style Guides",
    "business-cards-stationery": "Business Cards",
    "brand-identity": "Brand Identity",
    "social-media-design": "Social Media Design",
    "email-design": "Email Design",
    "website-design": "Website Design",
    "app-design": "App Design",
    "ui-ux-design": "UI/UX Design",
    "landing-page-design": "Landing Page Design",
    "influencer": "Influencer Marketing",
    "promotion": "Promotion Services",
    "events": "Event Services",
    "printing": "Printing Services"
  };

  const title = titleMap[resolvedParams.category] || resolvedParams.category.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="relative p-6 pt-12 min-h-screen bg-[#141417] overflow-hidden">
      {/* Background Effect */}
      <motion.div 
        animate={{ scale: [1.05, 1.15, 1.05] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sticky top-0 pt-6 pb-4 bg-[#141417]/90 backdrop-blur-xl z-20 border-b border-white/5">
          <button onClick={() => router.back()} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="text-white" size={20} />
          </button>
          <h1 className="text-white font-black text-lg tracking-wide absolute left-1/2 -translate-x-1/2 drop-shadow-md whitespace-nowrap">
            {title}
          </h1>
          <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
            <SlidersHorizontal size={20} className="text-pink-400" />
          </button>
        </div>

        {/* Highlight Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-5 backdrop-blur-sm"
        >
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-pink-500" /> Top {title} Experts
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Premium vendors ready to elevate your brand.</p>
          </div>
        </motion.div>

        {/* Results List */}
        <div className="flex flex-col gap-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SupplierCard
              id="pete-barret"
              name="Pete & Barret Designs"
              initials="PB"
              rating={4.9}
              reviews={450}
              description={`Premium ${title.toLowerCase()} specialists. We deliver unmatched high-end aesthetics tailored to modern tech and luxury brands.`}
              glowColor="purple"
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SupplierCard
              id="sps"
              name="SP Studio"
              initials="SP"
              rating={4.7}
              reviews={157}
              description={`Award-winning studio focused exclusively on ${title.toLowerCase()} for startups scaling globally.`}
              glowColor="blue"
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SupplierCard
              id="personal-designs"
              name="Neon Gravity Co."
              initials="NG"
              rating={5.0}
              reviews={81}
              description={`The ultimate "anti-gravity" feeling. Our ${title.toLowerCase()} services utilize 3D textures, floating layers, and vivid colors.`}
              glowColor="pink"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
