"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle, ArrowLeft } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-white p-6 pb-28">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Back button */}
      <Link href="/home" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-6 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Contact Us</h1>
        <p className="text-zinc-400 text-sm max-w-sm">
          Reach the LisBran team — we&apos;re here to help marketers and suppliers connect.
        </p>
      </div>

      {/* Contact cards */}
      <div className="flex flex-col gap-4 max-w-lg">

        {/* Email */}
        <a
          href="mailto:info@lisbranmarketing.com"
          className="flex items-center gap-4 bg-zinc-900/80 border border-white/10 rounded-2xl p-5 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Mail size={22} className="text-pink-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-0.5">Email Support</p>
            <p className="text-white font-bold">info@lisbranmarketing.com</p>
          </div>
          <span className="ml-auto text-zinc-600 group-hover:text-pink-400 text-xl transition-colors">›</span>
        </a>

        {/* Phone */}
        <a
          href="tel:+254710147123"
          className="flex items-center gap-4 bg-zinc-900/80 border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Phone size={22} className="text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-0.5">Call Us</p>
            <p className="text-white font-bold">0710 147 123</p>
          </div>
          <span className="ml-auto text-zinc-600 group-hover:text-purple-400 text-xl transition-colors">›</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/254710147123?text=Hi%20LisBran%20Team%2C%20I%20need%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-zinc-900/80 border border-white/10 rounded-2xl p-5 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <MessageCircle size={22} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-0.5">WhatsApp</p>
            <p className="text-white font-bold">+254 710 147 123</p>
            <p className="text-zinc-500 text-xs mt-0.5">Tap to chat on WhatsApp</p>
          </div>
          <span className="ml-auto text-zinc-600 group-hover:text-emerald-400 text-xl transition-colors">›</span>
        </a>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-zinc-600 text-xs font-semibold uppercase tracking-widest">Social</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Instagram */}
        <a
          href="https://instagram.com/lisbranmarketing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-zinc-900/80 border border-white/10 rounded-2xl p-5 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-0.5">Instagram</p>
            <p className="text-white font-bold">@lisbranmarketing</p>
          </div>
          <span className="ml-auto text-zinc-600 group-hover:text-pink-400 text-xl transition-colors">›</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/company/lisbranmarketing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-zinc-900/80 border border-white/10 rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-0.5">LinkedIn</p>
            <p className="text-white font-bold">LisBran Marketing</p>
          </div>
          <span className="ml-auto text-zinc-600 group-hover:text-blue-400 text-xl transition-colors">›</span>
        </a>

      </div>

      {/* Footer note */}
      <p className="text-zinc-600 text-xs mt-10 text-center max-w-xs mx-auto">
        LisBran Marketing © {new Date().getFullYear()}. Connecting marketers & suppliers across Kenya.
      </p>
    </div>
  );
}
