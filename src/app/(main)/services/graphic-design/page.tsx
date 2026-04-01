"use client";

import { ChevronRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function GraphicDesignServices() {
  const router = useRouter();
  
  const sections = [
    {
      title: "LOGO & BRAND IDENTITY",
      items: [
        { name: "Logo Design", href: "/search/logo-design" },
        { name: "Brand Style Guides", href: "/search/brand-style-guides" },
        { name: "Business cards and stationery", href: "/search/business-cards-stationery" },
        { name: "Brand identity", href: "/search/brand-identity" }
      ]
    },
    {
      title: "MARKETING DESIGN",
      items: [
        { name: "Social Media Design", href: "/search/social-media-design" },
        { name: "Email Design", href: "/search/email-design" }
      ]
    },
    {
      title: "WEB AND APP DESIGN",
      items: [
        { name: "Website Design", href: "/search/website-design" },
        { name: "App Design", href: "/search/app-design" },
        { name: "UI/UX Design", href: "/search/ui-ux-design" },
        { name: "Landing Page Design", href: "/search/landing-page-design" }
      ]
    }
  ];

  return (
    <div className="relative p-6 pt-12 pb-32 min-h-screen overflow-hidden text-white">
      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        {/* Top Header */}
        <div className="flex items-center mb-8">
          <button onClick={() => router.push('/home')} className="p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="text-white" size={22} />
          </button>
        </div>

        {/* Hero Icon Component */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="p-1 rounded-full bg-black/40 shadow-[0_10px_30px_rgba(236,72,153,0.3)] border border-pink-500/30 mb-6"
          >
            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-black flex items-center justify-center">
              <Image src="/icon-graphic.png" alt="Graphic Design" fill className="object-cover mix-blend-screen scale-110" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-black text-white drop-shadow-xl tracking-wide">Graphic Design Services</h1>
        </div>

        {/* Dynamic List Sections */}
        <div className="space-y-8">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="w-full">
              <h2 className="text-xs font-bold text-zinc-500 tracking-widest mb-4 uppercase pl-2">
                {section.title}
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl flex flex-col">
                {section.items.map((item, iIdx) => (
                  <Link 
                    href={item.href} 
                    key={iIdx}
                    className={`flex items-center justify-between p-5 group hover:bg-white/10 transition-colors ${iIdx !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <span className="text-zinc-200 font-bold group-hover:text-white transition-colors">{item.name}</span>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <ChevronRight className="text-zinc-500 group-hover:text-pink-400 transition-colors" size={20} />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
