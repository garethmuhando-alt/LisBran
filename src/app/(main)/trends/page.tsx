"use client";

import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Presentation, Smartphone, Zap, Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MarketingTrendsPage() {
  const router = useRouter();

  const trends = [
    {
      id: 1,
      title: "TikTok Commerce Acceleration",
      category: "Social Media",
      icon: <Smartphone className="text-pink-500" />,
      color: "from-pink-500/20 to-rose-500/5",
      borderColor: "border-pink-500/30",
      description: "In the Kenyan market, TikTok has evolved from just entertainment to a primary search engine and marketplace. Brands are shifting from highly polished ads to authentic, lo-fi creator content. Influencers in Nairobi are driving impulse purchases through live streams and direct-to-Mpesa conversions."
    },
    {
      id: 2,
      title: "Hyper-Local Influencer Campaigns",
      category: "Influencer Marketing",
      icon: <Flame className="text-orange-500" />,
      color: "from-orange-500/20 to-amber-500/5",
      borderColor: "border-orange-500/30",
      description: "Macro-influencers are losing trust. Brands are now partnering with 'nano-influencers' (1k - 10k followers) based in specific counties (e.g., Mombasa, Kisumu) who have deep community ties. This localized trust drives 3x higher engagement rates than national campaigns."
    },
    {
      id: 3,
      title: "AI-Generated Vernacular Content",
      category: "Content Strategy",
      icon: <Zap className="text-purple-500" />,
      color: "from-purple-500/20 to-violet-500/5",
      borderColor: "border-purple-500/30",
      description: "Generative AI is being used to rapidly A/B test ad copy across different local languages (Sheng, Swahili, Kikuyu). AI localized voice-overs and visually generated culturally relevant imagery are dropping cost-per-acquisition dramatically."
    },
    {
      id: 4,
      title: "Experiential 'Phygital' Activations",
      category: "Events & Activation",
      icon: <Presentation className="text-cyan-500" />,
      color: "from-cyan-500/20 to-blue-500/5",
      borderColor: "border-cyan-500/30",
      description: "Post-pandemic, Kenyans crave physical experiences augmented by digital layers. Mall activations now feature AR filters, QR-code scavenger hunts, and instant digital rewards, merging physical brand presence with digital data capture."
    }
  ];

  return (
    <div className="relative p-6 pt-12 pb-32 min-h-screen bg-[#141417] overflow-hidden">
      {/* Holographic Glowing Aesthetic Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-pink-600/40 via-rose-500/20 to-transparent rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15, repeat: Infinity, delay: 2 }} className="absolute bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/40 via-violet-500/20 to-transparent rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-white/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sticky top-0 pt-6 pb-4 bg-[#141417]/90 backdrop-blur-xl z-20 border-b border-white/5">
          <button onClick={() => router.back()} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="text-white" size={20} />
          </button>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-pink-500" size={20} />
            <h1 className="text-white font-black text-lg tracking-wide drop-shadow-md">
              Market Trends Q2
            </h1>
          </div>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full rounded-3xl overflow-hidden p-8 min-h-[220px] shadow-2xl flex flex-col justify-end border border-white/10 mb-8"
        >
          <div className="absolute inset-0 z-0 bg-black">
             <Image src="/bg-banner.png" alt="Marketing Trends Kenya" fill className="object-cover opacity-60 mix-blend-screen scale-105" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>
          <div className="relative z-10">
            <div className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 border border-pink-500/30 backdrop-blur-md">
              KENYA EDITION
            </div>
            <h2 className="text-3xl font-black text-white leading-tight drop-shadow-xl mb-2">
              The Edge of Marketing
            </h2>
            <p className="text-zinc-300 text-sm font-medium">
              Stay ahead of the curve. What's working right now in Nairobi and beyond.
            </p>
          </div>
        </motion.div>

        {/* Trends List */}
        <div className="space-y-6">
          {trends.map((trend, index) => (
            <motion.div 
              key={trend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`bg-gradient-to-br ${trend.color} border ${trend.borderColor} backdrop-blur-md rounded-3xl p-6 relative overflow-hidden group`}
            >
              {/* Glass Reflection */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-black/40 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl">
                  {trend.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">{trend.category}</div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{trend.title}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                    {trend.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action connecting back to sellers */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 p-6 bg-white/5 border border-white/10 rounded-3xl text-center backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold text-white mb-2">Ready to implement?</h3>
          <p className="text-zinc-400 text-sm mb-4">Find top-tier professionals on LisBran who specialize in these exact trends.</p>
          <button onClick={() => router.push('/categories')} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Explore Services
          </button>
        </motion.div>
      </div>
    </div>
  );
}
