"use client";

import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Briefcase, Camera, Image as ImageIcon, Video, CheckCircle2, Phone, Mail, X, Lock, AtSign, Link as LinkIcon, Edit, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function SellerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("$$");
  const [socialLink, setSocialLink] = useState("");
  
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Media State
  const [mediaUrls, setMediaUrls] = useState<{url: string, type: string}[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: "graphic-design", name: "Graphic Design Services" },
    { id: "influencer", name: "Influencer Marketing Services" },
    { id: "promotion", name: "Influencer and Promotion Services" },
    { id: "events", name: "Event and Activation Services" },
    { id: "printing", name: "Printing Services" }
  ];

  const handleNext = async () => {
    if (isLoginMode) {
      if (loginEmail) {
        // Try Supabase login lookup first
        if (supabase) {
          const { data } = await supabase
            .from('vendors')
            .select('*')
            .eq('email', loginEmail)
            .single();
          if (data) {
            localStorage.setItem('seller_name', data.business_name);
            localStorage.setItem('seller_phone', data.phone);
            localStorage.setItem('seller_email', data.email);
            localStorage.setItem('seller_category', data.category);
            localStorage.setItem('seller_bio', data.bio || '');
            localStorage.setItem('seller_price', data.price_rating || '$$');
            localStorage.setItem('seller_social', data.social_link || '');
            localStorage.setItem('seller_verified', data.verified ? 'true' : 'false');
          }
        } else {
          const extractedName = loginEmail.split('@')[0];
          localStorage.setItem('seller_name', extractedName.charAt(0).toUpperCase() + extractedName.slice(1));
        }
      }
      router.push("/seller/dashboard");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Always save to localStorage for offline/demo fallback
      localStorage.setItem('seller_name', businessName);
      localStorage.setItem('seller_phone', `+254${phone}`);
      localStorage.setItem('seller_email', email);
      localStorage.setItem('seller_category', category);
      localStorage.setItem('seller_bio', bio);
      localStorage.setItem('seller_price', price);
      localStorage.setItem('seller_social', socialLink);
      localStorage.setItem('seller_verified', 'false');

      // Save portfolio URLs too
      const images = mediaUrls.filter(m => m.type === 'image').map(m => m.url);
      const videos = mediaUrls.filter(m => m.type === 'video').map(m => m.url);
      localStorage.setItem('seller_portfolio_images', JSON.stringify(images));
      localStorage.setItem('seller_portfolio_videos', JSON.stringify(videos));

      // Supabase cloud save (if keys are configured)
      if (supabase) {
        try {
          const { data: vendorData, error } = await supabase
            .from('vendors')
            .insert({
              business_name: businessName,
              category,
              email,
              phone: `+254${phone}`,
              bio,
              price_rating: price,
              social_link: socialLink,
              verified: false,
            })
            .select()
            .single();

          if (!error && vendorData) {
            // Save vendor ID for future reference
            localStorage.setItem('seller_supabase_id', vendorData.id);

            // Save admin notification
            await supabase.from('admin_notifications').insert({
              type: 'new_vendor',
              message: `New seller "${businessName}" (${category}) has applied and is pending approval.`,
              vendor_id: vendorData.id,
              read: false,
            });
          }
        } catch (err) {
          console.warn('Supabase save failed, using localStorage fallback:', err);
        }
      }

      router.push("/seller/dashboard");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const base64 = ev.target?.result as string;
          const type = file.type.startsWith('video/') ? 'video' : 'image';
          const newItem = { url: base64, type };
          setMediaUrls(prev => {
            const updated = [...prev, newItem];
            // Save split keys immediately so supplier page can read them
            const imgs = updated.filter(m => m.type === 'image').map(m => m.url);
            const vids = updated.filter(m => m.type === 'video').map(m => m.url);
            try {
              localStorage.setItem('seller_portfolio_images', JSON.stringify(imgs));
              localStorage.setItem('seller_portfolio_videos', JSON.stringify(vids));
              localStorage.setItem('seller_portfolio', JSON.stringify(updated)); // legacy fallback
            } catch {
              // localStorage full — too many large files
              console.warn('localStorage full — consider fewer or smaller files');
            }
            return updated;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMedia = (index: number) => {
    setMediaUrls(prev => {
      const updated = prev.filter((_, idx) => idx !== index);
      localStorage.setItem('seller_portfolio', JSON.stringify(updated));
      return updated;
    });
  };

  const step1Valid = businessName.trim() !== "" && category !== "" && phone.length > 5 && email.includes("@") && password.length >= 6 && password === confirmPassword;
  const step2Valid = bio.trim() !== "" && mediaUrls.length > 0;

  return (
    <div className="relative p-6 pt-12 min-h-screen bg-[#141417] overflow-hidden scrollbar-hide">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        <div className="flex items-center mb-8 sticky top-0 bg-[#141417]/80 backdrop-blur-xl z-20 py-2">
          <button 
            onClick={() => step === 1 ? router.back() : setStep(step - 1)} 
            className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <div className="flex-1 flex justify-center gap-2 pr-10">
             {[1, 2, 3].map((i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "w-8 bg-purple-500" : "w-3 bg-white/20"}`} />
             ))}
          </div>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pb-20">
                <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10 mb-6 sticky top-[60px] z-20 backdrop-blur-lg">
                  <button onClick={() => setIsLoginMode(false)} className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${!isLoginMode ? 'bg-purple-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>New Seller</button>
                  <button onClick={() => setIsLoginMode(true)} className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${isLoginMode ? 'bg-purple-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Existing</button>
                </div>

                {!isLoginMode ? (
                  <>
                    <h1 className="text-3xl font-black text-white leading-tight mb-2">Setup<br/><span className="text-purple-400">Credentials</span></h1>
                    <p className="text-zinc-400 text-sm mb-6">Create your vendor portfolio and reach thousands of daily clients.</p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Business Name</label>
                        <input 
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Neon Gravity Co."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                          <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hello@brand.co.ke"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Business Phone (WhatsApp)</label>
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-purple-500 transition-all">
                          <Phone className="absolute left-4 text-zinc-500" size={18} />
                          <span className="pl-11 pr-2 py-4 text-zinc-400 font-bold bg-white/5 border-r border-white/10">+254</span>
                          <input 
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="712 345 678"
                            className="w-full bg-transparent px-4 py-4 text-white placeholder-zinc-600 focus:outline-none font-bold"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Primary Service Category</label>
                        <div className="grid grid-cols-1 gap-2">
                          {categories.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setCategory(c.id)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                category === c.id 
                                  ? "bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                              }`}
                            >
                              <span className="font-bold text-sm tracking-wide">{c.name}</span>
                              {category === c.id && <CheckCircle2 className="text-purple-500" size={18} />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Create Password</label>
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-purple-500/50 transition-colors">
                            <Lock className="text-zinc-500" size={16} />
                            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-600 text-sm font-bold" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Confirm Key</label>
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-purple-500/50 transition-colors">
                            <Lock className="text-zinc-500" size={16} />
                            <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-600 text-sm font-bold" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-black text-white leading-tight mb-2">Welcome Back</h1>
                    <p className="text-zinc-400 text-sm mb-6">Log in to manage your portfolio and respond to client leads.</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Seller Email</label>
                        <input 
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="name@business.co.ke"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Password</label>
                        <input 
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all font-bold"
                        />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pb-20">
                <div>
                  <h1 className="text-3xl font-black text-white leading-tight mb-2">Build Your<br/><span className="text-purple-400">Profile</span></h1>
                  <p className="text-zinc-400 text-sm">Upload your best work and set your service description.</p>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 flex items-center gap-1"><Edit size={12}/> Service Description / Bio</label>
                  <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Sell yourself! E.g. Award winning agency focusing on hyper-growth scaling inside Nairobi..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all font-medium min-h-[120px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 flex items-center gap-1"><DollarSign size={12}/> Price Range</label>
                    <select 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-all font-bold appearance-none"
                    >
                      <option value="$">Budget ($)</option>
                      <option value="$$">Standard ($$)</option>
                      <option value="$$$">Premium ($$$)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 flex items-center gap-1"><LinkIcon size={12}/> Social Link</label>
                    <input 
                      type="url"
                      value={socialLink}
                      onChange={(e) => setSocialLink(e.target.value)}
                      placeholder="Instagram/Github link"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 block mb-3">Portfolio Assets</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="file" accept="image/*" multiple className="hidden" ref={imageInputRef} onChange={handleFileUpload} />
                    <input type="file" accept="video/*" multiple className="hidden" ref={videoInputRef} onChange={handleFileUpload} />
                    
                    <div 
                      onClick={() => imageInputRef.current?.click()}
                      className="aspect-video bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 transition-all group"
                    >
                      <ImageIcon className="text-zinc-500 group-hover:text-purple-400 transition-colors" size={24} />
                      <span className="text-[10px] font-bold text-zinc-400 group-hover:text-purple-400 transition-colors uppercase tracking-widest">Images</span>
                    </div>
                    <div 
                      onClick={() => videoInputRef.current?.click()}
                      className="aspect-video bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 transition-all group"
                    >
                      <Video className="text-zinc-500 group-hover:text-purple-400 transition-colors" size={24} />
                      <span className="text-[10px] font-bold text-zinc-400 group-hover:text-purple-400 transition-colors uppercase tracking-widest">Videos</span>
                    </div>
                  </div>
                </div>

                {/* Display Selected Media */}
                {mediaUrls.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2 mb-3">Preview Queue</h3>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                      {mediaUrls.map((media, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-2xl flex-shrink-0 border border-white/10 overflow-hidden shadow-lg group bg-black">
                           {media.type === 'video' ? (
                             <video src={media.url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                           ) : (
                             <Image src={media.url} alt={`preview-${idx}`} fill className="object-cover transition-transform group-hover:scale-110 unoptimized" unoptimized />
                           )}
                           <button 
                             onClick={() => removeMedia(idx)}
                             className="absolute top-1 right-1 bg-black/60 backdrop-blur-md p-1 rounded-full text-white/80 hover:text-red-400 hover:bg-black transition-colors"
                           >
                             <X size={14} />
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 flex flex-col items-center justify-center text-center mt-12 py-10">
                <div className="relative w-32 h-32">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500/50"
                   />
                   <div className="absolute inset-2 bg-gradient-to-tr from-orange-600 to-red-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.5)]">
                     <Briefcase size={40} className="text-white drop-shadow-lg" />
                   </div>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white mb-3">Profile Secured</h1>
                  <p className="text-zinc-400 max-w-[250px] mx-auto text-sm leading-relaxed">
                    <span className="text-white font-bold">{businessName}</span> is complete. System administrators have been pinged for active verification.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 pb-10">
          <button 
            onClick={handleNext}
            disabled={step === 1 ? (!isLoginMode ? !step1Valid : (loginEmail.length < 5 || loginPassword.length < 5)) : step === 2 ? !step2Valid : false}
            className={`group relative w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] ${step === 3 ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.3)]" : "bg-white text-black hover:bg-zinc-200"}`}
          >
            <span className="relative z-10">{step === 3 ? "Seek Approval" : isLoginMode ? "Enter Dashboard" : "Continue"}</span>
            {step < 3 && <motion.div whileHover={{ x: 5 }} className="relative z-10"><ArrowRight size={20} /></motion.div>}
          </button>
        </div>
      </div>
    </div>
  );
}
