"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, Map, Palette, Share2, Target, Printer, Megaphone, ShoppingBag, Box, Camera, LineChart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "@/components/ui/SearchInput";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [location, setLocation] = useState("nairobi");
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [hoverLoc, setHoverLoc] = useState("nairobi");

  useEffect(() => {
    router.prefetch('/trends');
    router.prefetch('/seller/onboarding');
    router.prefetch('/categories');
    router.prefetch('/map');
    router.prefetch('/services/graphic-design');
  }, [router]);

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
          
          <Link href="/home" className="flex flex-col gap-1 items-center">
            <div className="anim-float w-14 h-14 bg-white border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
              <Image
                src="/LisBran PNG  Logo (512px by 512px)- Black.png"
                alt="LisBran logo"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Centered Floating Location Selector with Backdrop Dismiss */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center top-0 z-40 pt-2">
            <button
              type="button"
              onClick={() => { setIsLocOpen(!isLocOpen); }}
              className="min-w-[150px] flex items-center justify-center bg-zinc-900/95 border border-purple-500/60 rounded-full px-5 py-2 shadow-[0_0_25px_rgba(168,85,247,0.25)] cursor-pointer text-white text-sm font-bold hover:scale-105 transition-transform duration-150 active:scale-95"
            >
              Choose a location
            </button>
            
            <AnimatePresence>
              {isLocOpen && (
                <>
                  {/* Backdrop overlay for seamless outside click dismissal */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsLocOpen(false)}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
                  />

                  {/* Centered Floating City Selector Sheet */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 w-80 max-w-[90vw] bg-zinc-900 border border-purple-500/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col gap-3 text-white"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <MapPin size={18} className="text-pink-400" />
                        <span>Select City / Region</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsLocOpen(false)}
                        className="text-zinc-400 hover:text-white p-1 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto">
                      {Object.entries(locationQuotes).map(([loc, quote]) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            setLocation(loc);
                            localStorage.setItem('lisbran_location', loc);
                            setIsLocOpen(false);
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl text-left text-sm font-medium transition-all ${
                            location === loc 
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-md" 
                              : "bg-white/5 hover:bg-white/10 text-zinc-200"
                          }`}
                        >
                          <span className="capitalize">{loc}</span>
                          <span className="text-xs text-zinc-400 opacity-90">{quote}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Colorful Buy/Sell Toggle */}
          <div 
            className="anim-float-sm bg-zinc-900 border border-pink-500/40 p-1 rounded-full flex flex-col items-center shadow-[0_0_20px_rgba(236,72,153,0.3)] relative group mt-1"
          >
            <div className="flex items-center relative z-10 w-[90px] h-[30px]">
              {/* CSS transition replaces framer-motion spring — GPU composited */}
              <div
                className="absolute top-0 bottom-0 w-[45px] bg-gradient-to-r from-pink-600 to-purple-600 rounded-full z-0 shadow-md transition-transform duration-200"
                style={{ transform: mode === "buy" ? 'translateX(0)' : 'translateX(45px)' }}
              />
              <button 
                onClick={() => { setMode("buy"); }}
                className={`flex-1 relative z-10 h-full flex items-center justify-center transition-colors text-xs font-bold ${mode === "buy" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                Buy
              </button>
              <button 
                onClick={() => { setMode("sell"); router.push("/seller/onboarding"); }}
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
          </div>
        </header>

        {/* Search */}
        <div className="relative group mt-2 z-10">
          <SearchInput placeholder="Search services..." />
        </div>

        {/* ── Events Map CTA card ────────────────────────────── */}
        <Link href="/map" className="relative w-full rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.2)] flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-pink-900/30 hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Map size={22} className="text-purple-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-black text-sm">Kenya Events Map 📍</p>
            <p className="text-zinc-400 text-xs">Explore events & vendors across Kenya</p>
          </div>
          <span className="text-purple-400 font-bold text-lg">›</span>
        </Link>

        {/* Banner with dynamically generated AI bg-banner.png */}
        <div
          className="relative w-full rounded-3xl overflow-hidden p-6 min-h-[200px] shadow-2xl flex flex-col justify-center border border-slate-700/50 mt-2 z-10 hover:scale-[1.02] transition-transform duration-150"
        >
          <div className="absolute inset-0 z-0 bg-black">
             <Image src="/bg-banner.png" alt="Marketing Trends" fill className="object-cover opacity-50 mix-blend-screen hover:scale-105 transition-transform duration-200" priority />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-100 mb-3 max-w-[220px] leading-tight relative z-10 drop-shadow-xl">
            Check out these new marketing trends for your next campaign!
          </h2>
          <button onClick={() => { router.push('/trends'); }} className="bg-slate-200 hover:bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold w-fit shadow-lg transition-colors relative z-10">
            Read more
          </button>
        </div>

        {/* Services Section */}
        <section className="mt-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-slate-500 rounded-full inline-block" /> LisBran Services
            </h2>
            <Link href="/categories" className="text-zinc-400 text-sm flex items-center gap-1 hover:text-white transition-colors">
              View more <span className="text-lg">›</span>
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x">
            {[
              { id: 1,  name: "Creative\nDesign",          icon: <Palette   size={32} className="text-pink-400"   />, glow: "shadow-pink-500/30",    url: "/services/graphic-design" },
              { id: 2,  name: "Social Media\nManagement",  icon: <Share2    size={32} className="text-purple-400" />, glow: "shadow-purple-500/30",  url: "/search/influencer" },
              { id: 3,  name: "Brand Strategy\n& Position",icon: <Target    size={32} className="text-indigo-400" />, glow: "shadow-indigo-500/30",  url: "/categories" },
              { id: 4,  name: "Branding &\nPrinting",      icon: <Printer   size={32} className="text-rose-400"   />, glow: "shadow-rose-500/30",    url: "/search/printing" },
              { id: 5,  name: "Brand\nActivation",         icon: <Megaphone size={32} className="text-amber-400"  />, glow: "shadow-amber-500/30",   url: "/categories" },
              { id: 6,  name: "Marketing\nMaterials",      icon: <ShoppingBag size={32} className="text-emerald-400"/>, glow: "shadow-emerald-500/30", url: "/categories" },
              { id: 7,  name: "3D\nModelling",             icon: <Box       size={32} className="text-cyan-400"   />, glow: "shadow-cyan-500/30",    url: "/categories" },
              { id: 8,  name: "Photography\n& Video",      icon: <Camera    size={32} className="text-violet-400" />, glow: "shadow-violet-500/30",  url: "/categories" },
              { id: 9,  name: "Sales &\nConsultancy",      icon: <LineChart size={32} className="text-orange-400" />, glow: "shadow-orange-500/30",  url: "/categories" },
              { id: 10, name: "Influencer\nManagement",    icon: <Users     size={32} className="text-pink-300"   />, glow: "shadow-pink-400/30",    url: "/search/influencer" },
            ].map((service) => (
              <Link href={service.url} key={service.id} className="snap-start flex flex-col items-center gap-3 w-28 flex-shrink-0 group cursor-pointer">
                <div
                  className={`p-1 rounded-full bg-black/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-slate-700/50 cursor-pointer transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 relative ${service.glow}`}
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-black/80 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-center text-zinc-300 font-bold whitespace-pre-line leading-tight group-hover:text-white transition-colors">{service.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Vendors Section */}
        <section className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-slate-600 rounded-full inline-block" /> Top Ranked Vendors
            </h2>
            <Link href="/categories" className="text-zinc-400 text-sm flex items-center gap-1 hover:text-white transition-colors">
              View more <span className="text-lg">›</span>
            </Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
             {[
               { id: "personal-designs", name: "Neon Gravity Co.", rating: 5.0, service: "Graphic Design", bg: "bg-pink-600", border: "border-pink-500/50", shadow: "shadow-[0_10px_30px_rgba(236,72,153,0.4)]", grad: "from-pink-900/80 to-purple-400/40" },
               { id: "ht-marketing", name: "H&T Marketing", rating: 4.9, service: "Influencer Services", bg: "bg-yellow-500", border: "border-yellow-400/50", shadow: "shadow-[0_10px_30px_rgba(234,179,8,0.4)]", grad: "from-yellow-700/80 to-yellow-300/40" },
               { id: "linqia", name: "LINQIA", rating: 4.8, service: "Consulting", bg: "bg-blue-600", border: "border-blue-500/50", shadow: "shadow-[0_10px_30px_rgba(37,99,235,0.4)]", grad: "from-blue-900/80 to-blue-400/40" },
               { id: "sp-studio", name: "SP Studio", rating: 4.7, service: "Web & App Design", bg: "bg-emerald-600", border: "border-emerald-500/50", shadow: "shadow-[0_10px_30px_rgba(16,185,129,0.4)]", grad: "from-emerald-900/80 to-emerald-400/40" },
             ].sort((a,b)=> b.rating - a.rating).map((vendor) => (
               <Link href={`/supplier/${vendor.id}`} key={vendor.id} className={`snap-start min-w-[240px] h-40 ${vendor.bg} rounded-3xl p-5 flex flex-col justify-between ${vendor.shadow} relative overflow-hidden transition-transform hover:scale-[1.02] border ${vendor.border} group`}>
                 <div className="absolute inset-0 z-0">
                    <Image src="/bg-events.png" alt={vendor.name} fill className="object-cover opacity-60 mix-blend-overlay scale-110 group-hover:scale-125 transition-transform duration-200" />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${vendor.grad} mix-blend-multiply opacity-80`} />
                 </div>
                 <div className="flex justify-between items-start relative z-10 w-full">
                   <div className="bg-black/40 backdrop-blur-md text-white px-2 py-1 flex items-center gap-1 rounded font-bold text-xs"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {vendor.rating}</div>
                 </div>
                 <div>
                   <h3 className="text-white font-black text-xl relative z-10 leading-tight drop-shadow-lg">{vendor.name}</h3>
                   <p className="text-white/90 font-bold text-sm relative z-10 drop-shadow-md">{vendor.service}</p>
                 </div>
               </Link>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}
