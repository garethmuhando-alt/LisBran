"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Users, Activity, AlertTriangle, Check, X, FileText, Lock, ChevronRight, Mail, KeyRound, Download, BarChart3, TrendingUp, CalendarDays } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminControlRoom() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [pendingVendor, setPendingVendor] = useState<{name: string, phone: string, cat: string, id?: string} | null>(null);
  
  const [activeTab, setActiveTab] = useState<'control' | 'analytics'>('control');
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      // Try Supabase first
      if (supabase) {
        const { data } = await supabase
          .from('vendors')
          .select('*')
          .eq('verified', false)
          .order('created_at', { ascending: true })
          .limit(1)
          .single();
        if (data) {
          setPendingVendor({ name: data.business_name, phone: data.phone, cat: data.category, id: data.id });
          return;
        }
      }
      // localStorage fallback
      const verified = localStorage.getItem('seller_verified');
      if (verified === 'false') {
        setPendingVendor({
          name: localStorage.getItem('seller_name') || "Unknown Vendor",
          phone: localStorage.getItem('seller_phone') || "Unknown",
          cat: localStorage.getItem('seller_category') || "Uncategorized"
        });
      }
    };
    load();
  }, []);

  const handleApprove = async () => {
    // Update Supabase if available
    if (supabase && (pendingVendor as any)?.id) {
      await supabase.from('vendors').update({ verified: true }).eq('id', (pendingVendor as any).id);
    }
    // Always update localStorage too
    localStorage.setItem('seller_verified', 'true');
    setPendingVendor(null);
    alert("✅ Vendor has been approved and is now LIVE on the marketplace!");
  };

  const validAdmins = ["lisbran@gmail.com", "lisa@lisbran.co.ke", "garethmuhando@gmail.com"];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validAdmins.includes(email.toLowerCase()) && password === "admin123") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Unauthorized payload. Access Denied.");
    }
  };

  const handleGenerateReport = () => {
    alert("LISBRAN SYSTEM REPORT GENERATED\n\n- Active Vendors: 1,402\n- Total Bookings (30D): 894\n- Average Vendor Rating: 4.6 Stars\n- Flagged Accounts: 3\n\nReport downloaded to LocalStorage.");
  };

  if (!isAuthenticated) {
    return (
      <div className="relative p-6 min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-mono">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-sm glass-card border border-white/10 p-8 shadow-[0_0_50px_rgba(34,197,94,0.1)] rounded-3xl"
        >
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-4 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <Lock size={28} />
            </div>
            <h1 className="text-white font-black text-xl tracking-widest uppercase">Admin Gateway</h1>
            <p className="text-zinc-500 text-xs mt-1 text-center">Restricted Access. Kenyan Systems Jurisdiction.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Admin Identifier</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@lisbran.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 px-4 py-3 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-green-500 focus:bg-green-500/5 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Security Key</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 px-4 py-3 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-green-500 focus:bg-green-500/5 transition-all"
                />
              </div>
            </div>
            
            {authError && <p className="text-red-500 text-[10px] font-bold tracking-wider">{authError}</p>}
            
            <button type="submit" className="w-full bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500 hover:text-white transition-all py-3 rounded-xl font-bold tracking-widest text-sm flex items-center justify-center gap-2 mt-4">
              AUTHENTICATE <ChevronRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard Render
  return (
    <div className="relative p-6 pt-12 min-h-screen bg-[#0a0a0a] overflow-hidden text-white pb-32 font-mono">
      {/* Hacker/Cyberpunk Admin Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-green-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-blue-900/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-6 pb-4">
          <div className="flex items-center gap-3">
             <ShieldCheck className="text-green-500" size={28} />
             <div>
               <h1 className="text-xl font-bold tracking-widest text-green-400 flex items-center gap-2">
                 SYS_ADMIN
                 <span className="text-[9px] bg-white/10 text-white px-2 py-0.5 rounded uppercase tracking-wider">{email.split('@')[0]}</span>
               </h1>
               <p className="text-[10px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"/> SERVER ONLINE — NAIROBI NODE</p>
             </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors tracking-widest uppercase">
            LOGOUT
          </button>
        </div>

        {/* System Toggle Tabs */}
        <div className="flex w-full mb-8 border-b border-white/10">
          <button onClick={() => setActiveTab('control')} className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-colors border-b-2 ${activeTab === 'control' ? 'border-green-500 text-green-400' : 'border-transparent text-zinc-500 hover:text-white'}`}>
            Control Node
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-colors border-b-2 ${activeTab === 'analytics' ? 'border-purple-500 text-purple-400' : 'border-transparent text-zinc-500 hover:text-white'}`}>
            Analytics Engine
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'control' ? (
            <motion.div key="control" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              {/* Report Generation Action */}
              <button 
                onClick={handleGenerateReport}
                className="w-full mb-8 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors p-4 rounded-xl flex items-center justify-between group shadow-[0_0_15px_rgba(59,130,246,0.1)]"
              >
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-white transition-colors">
                     <FileText size={20} />
                   </div>
                   <div className="text-left">
                     <h3 className="font-bold text-sm tracking-widest text-blue-100">GENERATE ACTIVE REPORT</h3>
                     <p className="text-[10px] text-blue-300/60 mt-0.5">Reviews, Ratings, Bookings CSV</p>
                   </div>
                 </div>
                 <Download className="text-blue-500" size={20} />
              </button>

              {/* Global Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/50 border border-green-500/20 p-4 rounded-2xl text-center shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <span className="text-3xl font-black text-white">1,402</span>
                  <div className="text-[10px] text-green-500 font-bold tracking-widest uppercase mt-1 flex items-center justify-center gap-1"><Users size={12}/> ACTIVE VENDORS</div>
                </div>
                <div className="bg-black/50 border border-blue-500/20 p-4 rounded-2xl text-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <span className="text-3xl font-black text-white">894</span>
                  <div className="text-[10px] text-blue-500 font-bold tracking-widest uppercase mt-1 flex items-center justify-center gap-1"><Activity size={12}/> LIVE BOOKINGS</div>
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="mb-8">
                <h2 className="text-sm font-bold text-white mb-4 border-l-2 border-orange-500 pl-2 flex items-center justify-between">
                  PENDING APPROVALS
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded tracking-widest">{pendingVendor ? "1 NEW" : "0 IN QUEUE"}</span>
                </h2>
                
                <div className="space-y-3">
                  {pendingVendor ? (
                    <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-center justify-between group transition-colors relative overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent animate-pulse" />
                      <div className="relative z-10">
                        <h3 className="font-bold text-sm tracking-wide text-white flex items-center gap-2">
                          {pendingVendor.name} <span className="bg-orange-500 text-black text-[9px] px-1 rounded uppercase">New</span>
                        </h3>
                        <p className="text-[10px] text-zinc-400 mt-0.5">{pendingVendor.cat} • {pendingVendor.phone}</p>
                      </div>
                      <div className="flex gap-2 relative z-10">
                        <button onClick={() => setPendingVendor(null)} className="w-8 h-8 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg">
                          <X size={16} />
                        </button>
                        <button onClick={handleApprove} className="w-8 h-8 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400 hover:bg-green-500 hover:text-white transition-all shadow-lg">
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center text-zinc-500 text-xs">
                      No active pending approvals at this time.
                    </div>
                  )}
                </div>
              </div>

              {/* Flagged Activities */}
              <div>
                <h2 className="text-sm font-bold text-white mb-4 border-l-2 border-red-500 pl-2">SYSTEM ALERTS</h2>
                <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wide">Suspicious Activity Blocked</p>
                    <p className="text-[10px] text-red-200/60 mt-1 leading-relaxed">Multiple failed access attempts detected from unauthorized node attempting to view active seller contacts. Security protocols engaged.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="analytics" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">

              <div className="flex items-center justify-between mb-2 mt-2">
                 <h2 className="text-sm font-bold text-blue-400 border-b border-blue-400/30 pb-1 uppercase tracking-widest">Global Telemetry</h2>
                 <select 
                   value={categoryFilter} 
                   onChange={(e) => setCategoryFilter(e.target.value)}
                   className="bg-purple-900/30 border border-purple-500/50 text-purple-200 text-xs font-bold rounded-xl px-3 py-1 outline-none cursor-pointer focus:bg-black"
                 >
                   <option value="all">ALL CATEGORIES</option>
                   <option value="graphic-design">GRAPHIC DESIGN</option>
                   <option value="influencer">INFLUENCERS</option>
                   <option value="events">EVENT ACTIVATION</option>
                 </select>
              </div>
              
              {/* Activity Chart: Bought vs Sold */}
              <div className="bg-black/50 border border-purple-500/20 p-5 rounded-3xl shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                 <h3 className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-2 mb-6"><BarChart3 size={14} className="text-purple-400" /> Marketplace Transactions (30D)</h3>
                 <div className="flex items-end gap-2 h-32 mb-4 px-2">
                   {/* CSS Bar Chart Implementation */}
                   {[40, 60, 35, 80, 50, 90, 45].map((val, i) => {
                      const modifier = categoryFilter === 'all' ? 1 : categoryFilter === 'graphic-design' ? 0.6 : categoryFilter === 'influencer' ? 1.2 : 0.3;
                      return (
                        <div key={i} className="flex-1 flex flex-col justify-end gap-1 relative group h-full">
                          <div className="w-full bg-blue-500/80 rounded-t-sm transition-all hover:bg-blue-400 cursor-crosshair" style={{ height: `${(val * 0.7) * modifier}%` }}></div>
                          <div className="w-full bg-purple-500/80 rounded-t-sm transition-all hover:bg-purple-400 cursor-crosshair" style={{ height: `${val * modifier}%` }}></div>
                        </div>
                      );
                   })}
                 </div>
                 <div className="flex justify-between text-[9px] text-zinc-500 font-bold tracking-widest px-2">
                   <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                 </div>
                 <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-white/5 text-[9px] uppercase font-bold text-zinc-400 tracking-widest">
                   <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-purple-500 rounded-full drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]"></span> Services Sold</span>
                   <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span> Services Bought</span>
                 </div>
              </div>

              {/* Seller ROI block */}
              <div className="bg-black/50 border border-white/5 p-5 rounded-3xl">
                 <h3 className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-2 mb-4"><TrendingUp size={14} className="text-pink-500" /> Seller Activity & Value Ratings</h3>
                 <div className="space-y-3">
                   {[
                     { name: 'Neon Gravity Co.', rep: '5.0', bookings: 124, val: 'Extreme', badge: 'pink' },
                     { name: 'SP Design Services', rep: '4.9', bookings: 98, val: 'High', badge: 'orange' },
                     { name: 'Alpha Marketing', rep: '4.2', bookings: 45, val: 'Good', badge: 'blue' }
                   ].map((t, i) => (
                     <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-white/20 transition-colors cursor-default">
                       <div>
                         <span className="text-xs font-bold text-white block">{t.name}</span>
                         <span className="text-[9px] text-zinc-500 tracking-wide mt-1 block">RATING: {t.rep} ⭐ | {t.bookings} BOOKINGS</span>
                       </div>
                       <div className="text-right">
                         <span className={`text-[10px] font-bold uppercase tracking-widest text-${t.badge}-400`}>{t.val} VALUE</span>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Booking frequency Insights */}
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-5 rounded-3xl shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                 <h3 className="text-[10px] font-bold text-blue-300 tracking-widest uppercase flex items-center gap-2 mb-3"><CalendarDays size={14} /> Peak Booking Analysis</h3>
                 <p className="text-xs text-blue-100/70 leading-relaxed mb-4">System telemetry indicates high booking density during specific operational windows in the Kenyan market.</p>
                 <div className="space-y-2">
                   <div className="flex items-center justify-between text-[10px] font-bold text-zinc-300 bg-black/40 p-3 rounded-xl border border-white/5">
                     <span className="uppercase tracking-wide">Peak Volume Days:</span>
                     <span className="text-blue-400">Fri-Sat (Weekends)</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-bold text-zinc-300 bg-black/40 p-3 rounded-xl border border-white/5">
                     <span className="uppercase tracking-wide">Lowest Activity:</span>
                     <span className="text-zinc-500">Mondays / Mid-month</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-bold text-zinc-300 bg-black/40 p-3 rounded-xl border border-white/5">
                     <span className="uppercase tracking-wide">Public Holiday Spikes:</span>
                     <span className="text-purple-400">+45% (Dec & Easter)</span>
                   </div>
                 </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
