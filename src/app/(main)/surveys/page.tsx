"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SurveysPage() {
  return (
    <div className="p-6 min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 sticky top-0 pt-2 pb-4 bg-[#0a0a0a]/90 backdrop-blur-md z-20">
        <Link href="/profile" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-white font-bold text-xl">Community Surveys</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border border-purple-500/20 p-6 mb-8 text-center"
      >
        <h2 className="text-purple-400 font-bold text-xl mb-2">Help Us Improve</h2>
        <p className="text-zinc-300 text-sm">
          Complete these quick feedback forms related to your recent transactions or app experience to earn instant tokens.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {[
          { title: "Service Quality Feedback", desc: "How was your Graphic Design service with Pete & Barret?", tokens: 150, urgent: true },
          { title: "App Navigation Survey", desc: "Is the new interface easy to use?", tokens: 50, urgent: false },
          { title: "Location Preferences", desc: "Let us know which counties we should expand to next.", tokens: 100, urgent: false }
        ].map((s, i) => (
          <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            {s.urgent && <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/20 rounded-full blur-xl" />}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-bold">{s.title}</h3>
              <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-md text-xs font-bold">
                +{s.tokens}
              </div>
            </div>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed pr-8">{s.desc}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-zinc-500 flex items-center gap-1 font-medium">
                <CheckCircle2 size={14} /> 2 mins
              </span>
              <Button variant="secondary" className="py-2 px-4 text-xs h-auto bg-white/10 hover:bg-white/20 text-white border-0">
                Start Survey
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
