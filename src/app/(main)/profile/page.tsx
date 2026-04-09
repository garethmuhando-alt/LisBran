"use client";

import { motion } from "framer-motion";
import { Mail, Phone, User, Shield, ArrowRight, Gift, Store, LayoutList, Bot, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lisbran_theme');
    if (saved === 'light') {
      setIsLightMode(true);
      document.body.classList.add('theme-light');
    }
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.body.classList.remove('theme-light');
      localStorage.setItem('lisbran_theme', 'dark');
      setIsLightMode(false);
    } else {
      document.body.classList.add('theme-light');
      localStorage.setItem('lisbran_theme', 'light');
      setIsLightMode(true);
    }
  };

  return (
    <div className="relative p-6 min-h-screen pb-32 bg-[#0a0a0a] overflow-hidden">
      
      {/* Dynamic AI Background Image Wrapper */}
      <motion.div 
        animate={{ scale: [1.1, 1.15, 1.1], rotate: [0, 1, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0 pointer-events-none w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl mx-auto origin-center"
      >
        <Image src="/bg-home.png" alt="Anti Gravity Base" fill className="object-cover opacity-20 mix-blend-screen" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </motion.div>

      <div className="relative z-10">
        {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 bg-black border-2 border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-full flex items-center justify-center text-white text-2xl cursor-pointer"
            style={{ fontFamily: "'Brush Script MT', 'Great Vibes', cursive" }}
          >
            LB
          </motion.div>
          <div>
            <h1 className="text-white font-bold text-2xl">My Account</h1>
            <p className="text-zinc-400 text-sm">Manage your LisBran presence</p>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-3 bg-white/5 border border-white/10 rounded-full text-zinc-400 theme-preserve hover:text-white hover:bg-white/10 transition-colors shadow-lg"
        >
          {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Rewards Navigation */}
      <Link href="/rewards">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full glass-card p-4 border border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/10 mb-6 flex justify-between items-center cursor-pointer shadow-[0_10px_30px_rgba(234,179,8,0.1)]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-500">
              <Gift size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold">Rewards & Tokens</h3>
              <p className="text-zinc-400 text-xs mt-0.5">Redeem points for merch & vouchers</p>
            </div>
          </div>
          <ArrowRight className="text-yellow-500" size={20} />
        </motion.div>
      </Link>

      {/* Be a Seller Faction */}
      <Link href="/seller/onboarding" className="block w-full">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="w-full relative overflow-hidden rounded-3xl bg-black border border-white/10 p-6 mb-8 flex flex-col justify-center items-start shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-2 relative z-10">
            <Store className="text-blue-500" size={20} /> Become a Seller
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-4 relative z-10">
            Launch your agency, freelancing gig, or marketing service to thousands of localized buyers today.
          </p>
          <Button variant="primary" className="py-2.5 px-6 text-sm pointer-events-none">Apply Now</Button>
        </motion.div>
      </Link>

      {/* Sign Up Window for First Time Users */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 mb-8 relative overflow-hidden shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <User className="text-purple-400" size={24} />
          </motion.div>
          <h2 className="text-xl font-bold text-white">First Time Here?</h2>
        </div>
        <p className="text-zinc-300 text-sm mb-6 relative z-10">
          Create an account to securely save vendors, message providers, and unlock premium marketing insights.
        </p>
        <form className="flex flex-col gap-3 relative z-10">
          <input type="email" placeholder="Email Address" className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
          <input type="password" placeholder="Password" className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
          <Button variant="primary" fullWidth className="mt-2 py-3">
            Create Account
          </Button>
        </form>
      </motion.div>

      {/* Community & Support */}
      <h2 className="text-white font-bold text-lg mb-4 mt-8 flex items-center gap-2">
        <Shield className="text-pink-500" size={20} /> Community & Support
      </h2>

      <Link href="/support">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-left glass-card p-5 mb-4 flex justify-between items-center group cursor-pointer border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-transparent hover:border-blue-400 transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold flex items-center gap-2">LisBran AI Copilot <span className="bg-blue-500 text-[9px] px-1.5 py-0.5 rounded text-black tracking-widest font-black uppercase">Online</span></h3>
              <p className="text-blue-200/70 text-xs mt-1">Get instant help with UI or portfolio setups</p>
            </div>
          </div>
          <ArrowRight className="text-blue-500 group-hover:text-white transition-colors" size={20} />
        </motion.div>
      </Link>

      <Link href="/surveys">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-left glass-card p-5 mb-4 flex justify-between items-center group cursor-pointer border-white/5 hover:border-purple-500/30 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 rounded-full text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <LayoutList size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold">Earn With Surveys</h3>
              <p className="text-zinc-400 text-sm mt-1">Complete feedback to earn Tokens</p>
            </div>
          </div>
          <ArrowRight className="text-zinc-600 group-hover:text-white transition-colors" size={20} />
        </motion.div>
      </Link>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full text-left glass-card p-5 mb-4 flex justify-between items-center group cursor-pointer border-white/5 hover:border-pink-500/30 transition-all"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-pink-500/10 rounded-full text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold">Email Support</h3>
            <p className="text-zinc-400 text-sm mt-1">lisbran@gmail.com</p>
          </div>
        </div>
        <ArrowRight className="text-zinc-600 group-hover:text-white transition-colors" size={20} />
      </motion.button>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full text-left glass-card p-5 mb-4 flex justify-between items-center group cursor-pointer border-white/5 hover:border-blue-500/30 transition-all"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold">Call Us</h3>
            <p className="text-zinc-400 text-sm mt-1">0113 419763</p>
          </div>
        </div>
        <ArrowRight className="text-zinc-600 group-hover:text-white transition-colors" size={20} />
      </motion.button>

      <p className="text-center text-zinc-600 text-xs mt-8">
        LisBran Marketplace © 2026<br/>
        We are here for you regarding any complaints from customers or vendors.
      </p>
      </div>
    </div>
  );
}
