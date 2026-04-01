"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SplashPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative bg-gradient-to-b from-[#111] to-[#0a0a0a] overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Logo Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-32 h-32 mb-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)] transition-shadow"
      >
        <span className="text-white text-[4.5rem] leading-none pb-2" style={{ fontFamily: "'Brush Script MT', 'Great Vibes', cursive" }}>LB</span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-pink-500/10 to-purple-500/10 blur-xl -z-10" />
      </motion.div>

      {/* Tooltip text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-12 self-start pl-4"
      >
        <div className="bg-zinc-800/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-lg font-medium border border-white/10">
          Let's get started!
        </div>
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="w-full space-y-4 relative z-10">
        <Link href="/home" className="block w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg"
          >
            <span className="text-purple-600 font-semibold text-lg">Find a service</span>
            <span className="text-zinc-500 text-sm mt-1">I'm looking for talented people to work with</span>
          </motion.div>
        </Link>
        
        <Link href="/home" className="block w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg"
          >
            <span className="text-pink-600 font-semibold text-lg">Sell a service</span>
            <span className="text-zinc-500 text-sm mt-1">I'd like to offer my services</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
