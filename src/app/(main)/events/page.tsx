"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CalendarDays, ExternalLink, Users, TrendingUp, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventRadarPage() {
  const router = useRouter();
  const mockEvents = [
    { id: 1, name: "Nairobi Tech Week 2026", date: "April 15-18", location: "KICC, Nairobi", attendees: "5,000+", type: "Technology / Corporate", need: "Seeking Brand Ambassadors & Badge Printing" },
    { id: 2, name: "Blankets & Wine", date: "May 2", location: "Ngong Racecourse", attendees: "12,000+", type: "Music / Festival", need: "Seeking Food Stalls & Event Photographers" },
    { id: 3, name: "Kenya Safari Rally VIP Village", date: "June 25", location: "Naivasha", attendees: "45,000+", type: "Sports / Outdoor", need: "Seeking Influencers & VIP Branding" },
    { id: 4, name: "Global Entrepreneur Expo", date: "July 12", location: "Sarit Expo Centre", attendees: "3,500+", type: "Business / Networking", need: "Seeking Flyer Distributors & Promo Videos" },
  ];

  return (
    <div className="relative p-6 pt-12 min-h-screen pb-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md py-4 z-50">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white bg-white/5 border border-white/10">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">Event Radar <TrendingUp size={20} className="text-orange-500"/></h1>
            <p className="text-zinc-400 text-xs mt-1">Live active gigs mapping Microsoft API local telemtry.</p>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-3xl mb-8">
           <h3 className="text-orange-400 font-bold mb-2 flex items-center gap-2"><Briefcase size={16} /> Vendor Lead Engine</h3>
           <p className="text-[13px] text-orange-200/70 leading-relaxed">
             Use this live telemetry to actively reach out and pitch your LisBran portfolio straight to the organizers of these local events. By targeting specific market gaps, you physically boost your direct sales limits on Microsoft Edge tracking nodes!
           </p>
        </div>

        <div className="space-y-4">
          {mockEvents.map((event) => (
            <motion.div whileHover={{ scale: 1.01 }} key={event.id} className="bg-black/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
              <div className="p-6 relative z-10">
                 <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-white leading-tight max-w-[200px]">{event.name}</h2>
                    <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/30">
                      {event.type.split('/')[0]}
                    </span>
                 </div>
                 
                 <div className="space-y-2 mb-6">
                   <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold"><CalendarDays size={14}/> {event.date}</div>
                   <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold"><MapPin size={14}/> {event.location}</div>
                   <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold"><Users size={14}/> Projected Traffic: <span className="text-white">{event.attendees}</span></div>
                 </div>

                 <div className="bg-purple-900/40 border border-purple-500/30 p-4 rounded-2xl mb-6">
                    <h4 className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Active Market Gap:</h4>
                    <p className="text-sm font-bold text-white">{event.need}</p>
                 </div>

                 <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                   Pitch My Services <ExternalLink size={16} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
