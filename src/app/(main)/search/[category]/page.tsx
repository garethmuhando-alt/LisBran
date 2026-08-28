"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal, ArrowLeft, TrendingUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SupplierCard } from "@/components/ui/SupplierCard";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { use } from "react";

export default function SearchResultsPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  useEffect(() => {
    const baseMockup = [
      { id: "pete-barret", name: "Pete & Barret Designs", initials: "PB", rating: 4.9, reviews: 450, description: `Premium specialists. We deliver unmatched high-end aesthetics tailored to modern tech and luxury brands.`, glowColor: "purple" },
      { id: "sps", name: "SP Studio", initials: "SP", rating: 4.7, reviews: 157, description: `Award-winning studio focused exclusively on design for startups scaling globally.`, glowColor: "blue" },
      { id: "personal-designs", name: "Neon Gravity Co.", initials: "NG", rating: 5.0, reviews: 81, description: `The ultimate "anti-gravity" feeling. Our services utilize 3D textures, floating layers, and vivid colors.`, glowColor: "pink" }
    ];

    const load = async () => {
      // Pull live verified vendors from Supabase if connected
      if (supabase) {
        const { data } = await supabase
          .from('vendors')
          .select('*')
          .eq('verified', true);

        if (data && data.length > 0) {
          const liveVendors = data.map((v: any) => ({
            id: v.business_name.toLowerCase().replace(/\s+/g, '-'),
            name: v.business_name,
            initials: v.business_name.substring(0, 2).toUpperCase(),
            rating: 5.0,
            reviews: 1,
            description: v.bio || `Verified LisBran vendor offering ${v.category} services.`,
            glowColor: "orange"
          }));
          setSuppliers([...liveVendors, ...baseMockup]);
          return;
        }
      }

      // localStorage fallback
      const verifiedStatus = localStorage.getItem('seller_verified');
      if (verifiedStatus === 'true') {
        const liveName = localStorage.getItem('seller_name') || "Verified Seller";
        const newCard = { id: liveName.toLowerCase().replace(/\s/g, '-'), name: liveName, initials: liveName.substring(0, 2).toUpperCase(), rating: 5.0, reviews: 1, description: `Newly verified and officially launched LisBran vendor serving the Kenyan sector.`, glowColor: "orange" };
        setSuppliers([newCard, ...baseMockup]);
      } else {
        setSuppliers(baseMockup);
      }
    };

    void load();
  }, []);

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
    <div className="relative p-6 pt-12 min-h-screen bg-[#141417] overflow-x-clip">
      <motion.div
        animate={{ scale: [1.05, 1.15, 1.05] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8 sticky top-12 pt-4 pb-4 bg-[#141417]/90 backdrop-blur-xl z-20 border-b border-white/5">
          <button onClick={() => { router.back(); }} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="text-white" size={20} />
          </button>
          <h1 className="text-white font-black text-lg tracking-wide absolute left-1/2 -translate-x-1/2 drop-shadow-md whitespace-nowrap">
            {title}
          </h1>
          <button onClick={() => setIsFilterOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
            <SlidersHorizontal size={20} className="text-pink-400" />
          </button>
        </div>

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

        <div className="flex flex-col gap-6 pb-20">
          {suppliers.map((s, idx) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <SupplierCard
                id={s.id}
                name={s.name}
                initials={s.initials}
                rating={s.rating}
                reviews={s.reviews}
                description={s.description}
                glowColor={s.glowColor}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filter Bottom Sheet */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl text-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h3 className="text-lg font-black tracking-wide flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-pink-400" /> Filter Services
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/15 transition-colors"
                >
                  <X size={18} className="text-zinc-400" />
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">Location</label>
                <div className="flex flex-wrap gap-2">
                  {["All", "Nairobi", "Mombasa", "Kisumu", "Nakuru"].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        selectedLocation === loc
                          ? "bg-pink-500 text-white border-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.5)]"
                          : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">Rating</label>
                <div className="flex gap-2">
                  {["All", "4.5+", "4.8+", "5.0 ★"].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSelectedRating(rate)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border text-center transition-all ${
                        selectedRating === rate
                          ? "bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                          : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Tier Filter */}
              <div className="mb-8">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">Price Tier</label>
                <div className="flex gap-2">
                  {["All", "$", "$$", "$$$"].map((price) => (
                    <button
                      key={price}
                      onClick={() => setSelectedPrice(price)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border text-center transition-all ${
                        selectedPrice === price
                          ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                          : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedLocation("All");
                    setSelectedRating("All");
                    setSelectedPrice("All");
                  }}
                  className="flex-1 py-3 rounded-2xl bg-white/5 text-zinc-400 font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

