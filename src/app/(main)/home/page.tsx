"use client";

import { useState } from "react";
import { MapPin, Star, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "@/components/ui/SearchInput";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [location, setLocation] = useState("nairobi");
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [hoverLoc, setHoverLoc] = useState("nairobi");

  const locationQuotes: Record<string, string> = {
    nairobi: "The Green City in the Sun! 🌆",
    mombasa: "Coastal Vibes & Beaches! 🏖️",
    kiambu: "The Coffee Heartlands! ☕",
    kisumu: "Lakeside Breeze! 🌊",
    nakuru: "Flamingo Paradise! 🦩"  
  };

  return (
    <div className="relative p-6 pb-12 min-h-screen overflow-hidden text-white">

      <div className="relative z-10 flex flex-col gap-6 h-full">
        {/* Header */}
        <header className="flex items-start justify-between mt-2 relative">
          
          <div className="flex flex-col gap-1 items-center">
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 bg-black border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] rounded-full flex items-center justify-center text-white text-2xl cursor-pointer"
              style={{ fontFamily: "'Brush Script MT', 'Great Vibes', cursive" }}
            >
              LB
            </motion.div>
            <p 
              className="text-pink-300 text-2xl font-bold tracking-widest drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] mt-1" 
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Hi, LisBran!
            </p>
          </div>

          {/* Centered Floating Neon Location Selector with Custom Dropdown */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center top-0 z-50 pt-2">
            <div className="relative w-32">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsLocOpen(!isLocOpen)}
                className="flex items-center justify-center gap-2 bg-black/60 backdrop-blur-xl border border-purple-500/50 rounded-full px-4 py-1.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer relative group text-white text-sm font-black"
              >
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                   <MapPin size={16} className="text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,1)]" />
                </motion.div>
                {location.charAt(0).toUpperCase() + location.slice(1)}
              </motion.div>
              
              <AnimatePresence>
                {isLocOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-full bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col z-50 text-white font-bold"
                  >
                    {Object.keys(locationQuotes).map((loc) => (
                      <button
                        key={loc}
                        onMouseEnter={() => setHoverLoc(loc)}
                        onClick={() => { setLocation(loc); setIsLocOpen(false); }}
                        className={`py-2 px-3 text-sm text-center transition-colors ${location === loc ? "bg-purple-600" : "hover:bg-white/10"}`}
                      >
                        {loc.charAt(0).toUpperCase() + loc.slice(1)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Colorful Buy/Sell Toggle */}
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-zinc-900 border border-pink-500/40 p-1 rounded-full flex flex-col items-center shadow-[0_0_20px_rgba(236,72,153,0.3)] relative group mt-1"
          >
            <div className="flex items-center relative z-10 w-[90px] h-[30px]">
              <motion.div 
                className="absolute top-0 bottom-0 w-[45px] bg-gradient-to-r from-pink-600 to-purple-600 rounded-full z-0 shadow-md"
                animate={{ x: mode === "buy" ? 0 : "45px" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <button 
                onClick={() => setMode("buy")}
                className={`flex-1 relative z-10 h-full flex items-center justify-center transition-colors text-xs font-bold ${mode === "buy" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setMode("sell")}
                className={`flex-1 relative z-10 h-full flex items-center justify-center transition-colors text-xs font-bold ${mode === "sell" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                Sell
              </button>
            </div>
            {/* Tooltip on hover to keep the descriptive text */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
              <p className="text-xs text-zinc-300 text-center font-medium">
                {mode === "buy" ? "I'm looking for talented people to work with." : "I'd like to offer my services."}
              </p>
            </div>
          </motion.div>
        </header>

        {/* Search */}
        <div className="relative group mt-2 z-10">
          <SearchInput placeholder="Search services..." />
        </div>

        {/* Banner with dynamically generated AI bg-banner.png */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-full rounded-3xl overflow-hidden p-6 min-h-[200px] shadow-2xl flex flex-col justify-center border border-slate-700/50 mt-2 z-10"
        >
          <div className="absolute inset-0 z-0 bg-black">
             <Image src="/bg-banner.png" alt="Marketing Trends" fill className="object-cover opacity-50 mix-blend-screen hover:scale-105 transition-transform duration-1000" priority />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-100 mb-3 max-w-[220px] leading-tight relative z-10 drop-shadow-xl">
            Check out these new marketing trends for your next campaign!
          </h2>
          <button className="bg-slate-200 hover:bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold w-fit shadow-lg transition-colors relative z-10">
            Read more
          </button>
        </motion.div>

        {/* Services Section */}
        <section className="mt-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-slate-500 rounded-full inline-block" /> Services
            </h2>
            <Link href="/categories" className="text-zinc-400 text-sm flex items-center gap-1 hover:text-white transition-colors">
              View more <span className="text-lg">›</span>
            </Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x md:grid md:grid-cols-3 md:gap-8">
            {[
              { id: 1, name: "Graphic Design\nServices", image: "/icon-graphic.png", glow: "shadow-slate-500/50", url: "/services/graphic-design" },
              { id: 2, name: "Marketing\nConsultancy", image: "/icon-marketing.png", glow: "shadow-slate-500/50", url: "#" },
              { id: 3, name: "Branding &\nPrinting", image: "lucide-gem", glow: "shadow-orange-500/50", url: "#" },
            ].map((service) => (
              <Link href={service.url} key={service.id} className="snap-start flex flex-col items-center gap-3 w-28 md:w-full flex-shrink-0 group cursor-pointer">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4 + service.id, repeat: Infinity, ease: "easeInOut" }}
                  className={`p-1 rounded-full bg-black/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-slate-700/50 cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] relative ${service.glow}`}
                >
                  <div className={`relative w-24 h-24 rounded-full overflow-hidden bg-black/80 flex items-center justify-center`}>
                    {service.image === "lucide-gem" ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-900/60 to-orange-500/20 group-hover:scale-125 transition-transform duration-500">
                        <Image src="/bg-events.png" alt="Branding Base" fill className="opacity-50 mix-blend-screen scale-150 rotate-90" />
                        <div className="absolute inset-0 border-[2px] border-orange-500/30 rounded-full m-4 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                        <Gem size={38} className="text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,1)] relative z-10" strokeWidth={1.5} />
                      </div>
                    ) : (
                      <Image src={service.image} alt={service.name.replace('\n', ' ')} fill className="object-cover mix-blend-screen scale-110 group-hover:scale-125 transition-transform duration-500" />
                    )}
                  </div>
                </motion.div>
                <span className="text-xs md:text-sm text-center text-zinc-300 font-bold whitespace-pre-line leading-tight group-hover:text-white transition-colors">{service.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Vendors Section */}
        <section className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-slate-600 rounded-full inline-block" /> Popular Vendors
            </h2>
            <span className="text-zinc-400 text-sm flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              View more <span className="text-lg">›</span>
            </span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
             <div className="snap-start min-w-[240px] h-40 bg-blue-600 rounded-3xl p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(37,99,235,0.4)] relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform border border-blue-500/50 group">
               <div className="absolute inset-0 z-0">
                  <Image src="/bg-events.png" alt="Marketing AI" fill className="object-cover opacity-60 mix-blend-overlay scale-110 group-hover:scale-125 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/80 to-blue-400/40 mix-blend-multiply opacity-80" />
               </div>
               <div className="flex justify-between items-start relative z-10 w-full">
                 <div className="bg-white/20 backdrop-blur-md text-white px-2 py-1 flex items-center gap-1 rounded font-bold text-xs"><Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.8</div>
               </div>
               <div>
                 <h3 className="text-white font-black text-xl relative z-10 leading-tight drop-shadow-lg">LINQIA</h3>
                 <p className="text-blue-100 font-bold text-sm relative z-10 drop-shadow-md">Marketing Consulting Services</p>
               </div>
             </div>
             
             <div className="snap-start min-w-[240px] h-40 bg-yellow-500 rounded-3xl p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(234,179,8,0.4)] relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform border border-yellow-400/50 group">
               <div className="absolute inset-0 z-0">
                  <Image src="/bg-home.png" alt="Influencer AI" fill className="object-cover opacity-70 mix-blend-color-dodge scale-110 group-hover:scale-125 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-700/80 to-yellow-300/40 mix-blend-multiply opacity-80" />
               </div>
               <div className="flex justify-between items-start relative z-10 w-full">
                 <div className="bg-black/20 backdrop-blur-md text-white px-2 py-1 flex items-center gap-1 rounded font-bold text-xs"><Star size={12} className="fill-white text-white" /> 4.9</div>
               </div>
               <div>
                 <h3 className="text-white font-black text-xl relative z-10 leading-tight drop-shadow-lg">H&T Marketing</h3>
                 <p className="text-yellow-50 font-bold text-sm relative z-10 drop-shadow-md">Influencer Services</p>
               </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
