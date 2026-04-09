"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, MessageSquare, Tag, Zap, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotificationsEventsPage() {
  const [tab, setTab] = useState<"alerts" | "events">("alerts");

  const notifications = [
    { id: 1, icon: MessageSquare, title: "New Message", desc: "SP Design sent you a quote for logo design.", time: "2m ago", color: "text-purple-400" },
    { id: 2, icon: Tag, title: "Promotion", desc: "Get 20% off Influencer services this weekend!", time: "1h ago", color: "text-pink-400" },
    { id: 3, icon: Zap, title: "Urgent Match", desc: "A premium supplier is available for your printing job.", time: "3h ago", color: "text-yellow-400" }
  ];

  const events = [
    { id: 1, date: "Oct 24", title: "Nairobi Marketing Expo", location: "KICC, Nairobi", desc: "Connect with the top advertising agencies and printing companies in Nairobi." },
    { id: 2, title: "Influencer Meetup", date: "Nov 02", location: "Mombasa Hub", desc: "Discover Instagram advisors and top-tier influencers for your next holiday campaign." },
    { id: 3, title: "Graphic Design Workshop", date: "Nov 15", location: "Nakuru Innovation Centre", desc: "Learn from premium designers about branding." }
  ];

  return (
    <div className="relative p-6 min-h-screen pb-32 overflow-hidden bg-[#0a0a0a]">
      {/* Dynamic AI Background Image Wrapper for Events */}
      <motion.div 
        animate={{ scale: [1.1, 1.2, 1.1], rotate: [0, -2, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0 pointer-events-none w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl mx-auto origin-center"
      >
        <Image src="/bg-events.png" alt="Anti Gravity Events" fill className="object-cover opacity-30 mix-blend-screen" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8 sticky top-0 pt-2 pb-4 bg-[#0a0a0a]/60 backdrop-blur-xl z-20 border-b border-white/5">
          <motion.div 
            animate={{ y: [0, -4, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 bg-black rounded-full border border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
          >
            <Bell className="text-pink-400" size={24} />
          </motion.div>
          <div className="bg-[#111]/80 p-1 rounded-full border border-white/10 flex items-center text-sm font-semibold shadow-inner ml-4">
            <button 
              onClick={() => setTab("alerts")}
              className={`px-4 py-1.5 rounded-full transition-colors ${tab === "alerts" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
            >
              Alerts
            </button>
            <button 
              onClick={() => setTab("events")}
              className={`px-4 py-1.5 rounded-full transition-colors ${tab === "events" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
            >
              Events
            </button>
          </div>
        </div>

        {tab === "alerts" ? (
          <div className="flex flex-col gap-4">
            {notifications.map((n) => (
              <motion.div 
                key={n.id}
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass-card p-4 flex gap-4 items-start"
              >
                <div className={`p-3 rounded-full bg-white/5 border border-white/10 ${n.color}`}>
                  <n.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-bold">{n.title}</h3>
                    <span className="text-zinc-500 text-xs">{n.time}</span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-1 leading-snug">{n.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between text-white bg-blue-500/20 px-4 py-3 rounded-2xl border border-blue-500/30 backdrop-blur-md mb-2">
              <span className="font-semibold text-sm">Location Advisor:</span>
              <div className="flex items-center gap-1 font-bold text-blue-400 text-sm bg-black/50 px-2 py-1 rounded-lg">
                <MapPin size={14} /> Kenya Wide
              </div>
            </div>

            <Link href="/events" className="w-full block mb-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-full rounded-3xl overflow-hidden p-6 min-h-[140px] shadow-2xl flex flex-col justify-center border border-orange-700/50 cursor-pointer"
              >
                <div className="absolute inset-0 z-0 bg-black">
                   <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-black md:from-black/80 to-transparent" />
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/30 blur-3xl rounded-full" />
                   <div className="absolute bottom-0 right-10 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full" />
                </div>
                
                <h2 className="text-xl font-black text-orange-400 mb-1 max-w-[220px] leading-tight relative z-10 drop-shadow-xl flex items-center gap-2">
                  Live Event Radar <MapPin size={18}/>
                </h2>
                <p className="text-zinc-300 text-[11px] font-bold tracking-wide relative z-10 mb-3 max-w-[220px]">
                  Seek out physical gigs matching your portfolio happening closely in your target region today!
                </p>
                <button className="bg-orange-500 pointer-events-none text-white px-6 py-2 rounded-full text-xs font-bold w-fit shadow-[0_0_15px_rgba(249,115,22,0.4)] relative z-10 uppercase tracking-widest">
                  Scan Gigs
                </button>
              </motion.div>
            </Link>

            {events.map((evt) => (
              <motion.div 
                key={evt.id}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-5 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/10"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/40 transition-colors" />
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <h3 className="text-white font-bold text-lg">{evt.title}</h3>
                  <div className="bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                    <Calendar size={12} /> {evt.date}
                  </div>
                </div>
                <p className="text-zinc-400 text-sm font-medium mb-3 relative z-10 leading-relaxed">{evt.desc}</p>
                <div className="flex items-center gap-1 text-zinc-500 text-xs font-semibold relative z-10">
                  <MapPin size={12} /> {evt.location}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
