"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Gift, Ticket, PlayCircle, LogIn, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function RewardsPage() {
  return (
    <div className="p-6 min-h-screen pb-32 bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 sticky top-0 pt-2 pb-4 bg-[#0a0a0a]/90 backdrop-blur-md z-20">
        <Link href="/profile" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-white font-bold text-xl">Rewards & Inventory</h1>
      </div>

      {/* Token Balance */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full glass-card border border-yellow-500/30 bg-gradient-to-b from-yellow-600/20 to-orange-600/10 p-8 flex flex-col items-center shadow-[0_20px_50px_rgba(234,179,8,0.2)] mb-10 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/30 rounded-full blur-[60px]" />
        <p className="text-yellow-100 font-medium mb-1 relative z-10 text-sm tracking-widest uppercase">My Tokens</p>
        <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-600 relative z-10 drop-shadow-2xl">
          4,850
        </h2>
        <div className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-yellow-500/80 text-xs font-bold font-mono">
          Top 5% Earner in Nairobi
        </div>
      </motion.div>

      {/* Earn More Tokens */}
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <PlayCircle className="text-indigo-400" size={20} />
        Earn More Tokens
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
          <div className="text-indigo-400 mb-2"><LogIn size={20} /></div>
          <div>
            <p className="text-white font-bold text-sm">Daily Login</p>
            <p className="text-indigo-400 text-xs font-bold">+50 Tokens</p>
          </div>
        </div>
        <div className="bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
          <div className="text-emerald-400 mb-2"><CheckCircle size={20} /></div>
          <div>
            <p className="text-white font-bold text-sm">Complete Profile</p>
            <p className="text-emerald-400 text-xs font-bold">+500 Tokens</p>
          </div>
        </div>
        <div className="col-span-2 bg-[#111] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-xl border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
              <Gift size={24} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Play Games to Earn</p>
              <p className="text-zinc-400 text-xs font-medium">Spin the wheel or trivia</p>
            </div>
          </div>
          <Button variant="outline" className="text-xs py-2 px-3">Play</Button>
        </div>
      </div>

      {/* Redemption Inventory */}
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <Ticket className="text-pink-400" size={20} />
        Redeem Inventory
      </h3>
      <div className="flex flex-col gap-4">
        {[
          { name: "LisBran Branded T-Shirt", cost: "5,000 Tokens", type: "Merchandise", color: "pink" },
          { name: "KES 500 Shopping Voucher", cost: "2,000 Tokens", type: "Rewards", color: "blue" },
          { name: "Premium Key Holder", cost: "1,000 Tokens", type: "Merchandise", color: "purple" }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 border border-white/5 rounded-2xl">
            <div>
              <h4 className="text-white font-bold text-sm">{item.name}</h4>
              <p className="text-zinc-500 text-xs font-medium mt-0.5">{item.type}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-${item.color}-400 font-bold text-sm`}>{item.cost}</span>
              <button className="mt-2 text-xs text-white font-semibold bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
