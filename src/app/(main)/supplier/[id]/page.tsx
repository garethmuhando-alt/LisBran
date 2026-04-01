"use client";

import { ArrowLeft, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SupplierProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col pt-0">
      
      {/* Dark Hero Section */}
      <div className="bg-gradient-to-b from-black to-[#111] w-full rounded-b-[40px] pt-12 pb-8 px-6 flex flex-col items-center relative overflow-hidden shadow-xl">
        {/* Glow behind the section */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="w-full flex justify-between items-start z-10">
          <Link href="/search/logo-design" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1 text-yellow-500"><Star className="fill-yellow-500" size={16} /> <span className="font-bold text-white">3.9</span></div>
             <span className="text-zinc-400 text-xs">(157 reviews)</span>
          </div>
        </div>

        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-900 font-extrabold text-3xl mt-4 mb-4 shadow-[0_0_30px_rgba(255,255,255,0.2)] z-10">
          SPS
        </div>
        
        <h1 className="text-white font-bold text-2xl z-10">SP Design Services</h1>
        <div className="flex items-center gap-1 text-zinc-300 mt-1 z-10">
          <MapPin size={14} /> <span className="font-medium text-sm">Nairobi</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full mt-6 border-b border-zinc-200">
        <button className="flex-1 pb-3 text-sm font-bold text-zinc-900 border-b-2 border-zinc-900 text-center">
          Description
        </button>
        <button className="flex-1 pb-3 text-sm font-medium text-zinc-400 text-center">
          Portfolio
        </button>
      </div>

      {/* Content body */}
      <div className="p-6 text-zinc-600 leading-relaxed text-[15px] font-medium flex-1">
        SP Design Services delivers fast, reliable, and high-quality logo designs you can trust. We specialize in urgent and last-minute design requests, ensuring your logo is crafted on time without compromising quality. From everyday branding needs to time-sensitive projects, our commitment to speed, creativity, and professionalism sets us apart. Explore our logo design solutions and experience branding done right.
      </div>

      {/* Main Actions */}
      <div className="p-6 flex items-center gap-4 mb-2 bg-gradient-to-t from-white via-white to-transparent">
        <Button variant="primary" fullWidth className="py-4 text-base">
          Message
        </Button>
        <Button variant="outline" fullWidth className="py-4 text-base text-zinc-800 border-zinc-300 hover:bg-zinc-100">
          Save
        </Button>
      </div>

    </div>
  );
}
