"use client";

import { motion } from "framer-motion";
import { Settings, MessageSquare, TrendingUp, Star, MapPin, Eye, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function SellerDashboardPage() {
  const router = useRouter();
  const [vendorName, setVendorName] = useState("Neon Gravity Co.");
  const [vendorInitials, setVendorInitials] = useState("NG");
  const [portfolio, setPortfolio] = useState<{url: string, type: string}[]>([]);
  const [isVerified, setIsVerified] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('seller_name');
    const verifiedStatus = localStorage.getItem('seller_verified');
    
    if (verifiedStatus === 'false') {
       setIsVerified(false);
    } else {
       setIsVerified(true);
    }

    if (savedName) {
      setVendorName(savedName);
      setVendorInitials(savedName.substring(0, 2).toUpperCase());
    }

    const savedPortfolio = localStorage.getItem('seller_portfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newItems = Array.from(e.target.files).map(file => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video/') ? 'video' : 'image'
      }));
      setPortfolio(prev => {
        const updated = [...newItems, ...prev];
        localStorage.setItem('seller_portfolio', JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <div className="relative p-6 pt-12 min-h-screen bg-[#111] overflow-hidden text-white pb-32">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-80 bg-gradient-to-b from-purple-900/30 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/home" className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
            Exit to Marketplace
          </Link>
          <div className="flex gap-3 text-zinc-400">
            <Bell size={22} className="hover:text-white transition-colors cursor-pointer" />
            <Settings size={22} className="hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-card p-6 border border-white/10 rounded-3xl flex flex-col items-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-purple-600 text-white font-black text-3xl flex items-center justify-center border-4 border-[#111] shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">
              {vendorInitials}
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-1">{vendorName}</h1>
            <p className="text-zinc-400 text-sm font-medium flex items-center gap-1 mb-3">
              <MapPin size={14} /> Nairobi, Kenya
            </p>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <Star size={14} className="fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-sm">4.9</span>
              <span className="text-zinc-500 text-xs">(81 reviews)</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-5 rounded-3xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <Eye size={18} />
              <span className="text-xs text-green-400 flex items-center gap-1"><TrendingUp size={12} /> +12%</span>
            </div>
            <span className="text-3xl font-black text-white">1.4k</span>
            <span className="text-xs font-bold text-zinc-500">PROFILE VIEWS (30D)</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-3xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <MessageSquare size={18} />
            </div>
            <span className="text-3xl font-black text-white">24</span>
            <span className="text-xs font-bold text-zinc-500">ACTIVE LEADS</span>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Your Portfolio</h2>
            <input type="file" accept="image/*,video/*" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <button 
              onClick={() => isVerified && fileInputRef.current?.click()} 
              disabled={!isVerified} 
              className={`text-sm font-bold transition-colors px-3 py-1 rounded-full ${isVerified ? "text-purple-400 bg-purple-500/10 hover:bg-purple-500/20" : "text-zinc-500 bg-white/5 opacity-50 cursor-not-allowed"}`}
            >
              + Add Item
            </button>
          </div>

          <div className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide ${!isVerified && 'opacity-40 grayscale blur-[2px]'}`}>
            {portfolio.map((media, idx) => (
              <div key={`new-${idx}`} className="min-w-[140px] h-40 bg-black rounded-2xl relative overflow-hidden border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] flex-shrink-0 group">
                {media.type === 'video' ? (
                  <video src={media.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" autoPlay loop muted playsInline />
                ) : (
                  <img src={media.url} alt="New upload" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                )}
              </div>
            ))}
            {[1, 2, 3].map((item) => (
              <div key={`mock-${item}`} className="min-w-[140px] h-40 bg-zinc-800 rounded-2xl relative overflow-hidden border border-white/10 flex-shrink-0">
                <Image src="/bg-events.png" alt="Portfolio item" fill className="object-cover opacity-60 mix-blend-screen" />
              </div>
            ))}
          </div>

          {!isVerified && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-black/80 border border-orange-500/50 backdrop-blur-sm shadow-[0_0_40px_rgba(249,115,22,0.2)] p-4 rounded-xl flex flex-col items-center text-center">
              <Star className="text-orange-500 mb-2" size={24} />
              <h3 className="font-black text-white text-sm mb-1 tracking-widest uppercase">Content Locked</h3>
              <p className="text-[10px] text-zinc-400 font-medium">Your portfolio additions are frozen pending clearance from LisBran System Adminstrators.</p>
            </div>
          )}
        </div>

        {/* Admin Callout */}
        {isVerified ? (
          <div className="bg-gradient-to-r from-blue-900/40 to-blue-500/10 border border-blue-500/30 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-100 mb-1">Admin Verification</h3>
              <p className="text-xs text-blue-300 font-medium">Your account is active and verified.</p>
            </div>
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <Star size={20} className="fill-current" />
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-900/40 to-orange-500/10 border border-orange-500/30 p-5 rounded-2xl flex items-center justify-between animate-pulse">
            <div>
              <h3 className="font-bold text-orange-100 mb-1 tracking-widest text-sm">PENDING APPROVAL</h3>
              <p className="text-[10px] text-orange-300 font-medium">An approval push was sent to: <strong>lisbran@gmail.com, lisa@lisbran.co.ke, garethmuhando@gmail.com</strong></p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
