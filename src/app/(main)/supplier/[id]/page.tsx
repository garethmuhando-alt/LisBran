"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, MapPin, MessageCircle, Mail, Star, Play, Pencil, Check, Camera, Bookmark, Plus, ImageIcon, Video, Smartphone, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { use } from "react";

export default function SupplierProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'portfolio'>('description');
  const [saved, setSaved] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; type: 'image' | 'video' } | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [isMpesaOpen, setIsMpesaOpen] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState("0712345678");
  const [mpesaAmount, setMpesaAmount] = useState("1000");
  const [paymentState, setPaymentState] = useState<'idle' | 'pushing' | 'success'>('idle');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const videoUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const sellerName = localStorage.getItem('seller_name') || '';
      const sellerId = sellerName.toLowerCase().replace(/\s+/g, '-');
      const isCurrentSeller = sellerId === resolvedParams.id;

      // Load saved profile picture
      const savedPic = localStorage.getItem('seller_profile_pic');

      let vendorData: any = null;
      let imgs: string[] = [];
      let vids: string[] = [];

      if (isCurrentSeller) {
        vendorData = {
          name: sellerName,
          email: localStorage.getItem('seller_email') || '',
          phone: localStorage.getItem('seller_phone') || '',
          category: localStorage.getItem('seller_category') || '',
          location: localStorage.getItem('seller_location') || 'Nairobi',
          bio: localStorage.getItem('seller_bio') || 'Tell clients about your services. Click the edit icon to update.',
          priceRating: localStorage.getItem('seller_price') || '$$',
          socialLink: localStorage.getItem('seller_social') || '',
          rating: 5.0,
          reviews: 1,
        };
        const imgsRaw = localStorage.getItem('seller_portfolio_images');
        const vidsRaw = localStorage.getItem('seller_portfolio_videos');
        const legacyRaw = localStorage.getItem('seller_portfolio');
        if (imgsRaw || vidsRaw) {
          imgs = imgsRaw ? JSON.parse(imgsRaw) : [];
          vids = vidsRaw ? JSON.parse(vidsRaw) : [];
        } else if (legacyRaw) {
          const legacy: { url: string; type: string }[] = JSON.parse(legacyRaw);
          imgs = legacy.filter(m => m.type === 'image').map(m => m.url);
          vids = legacy.filter(m => m.type === 'video').map(m => m.url);
        }
      } else {
        // ── Track profile view for the seller ────────────────────────────────
        const viewKey = `profile_views_${resolvedParams.id}`;
        const current = parseInt(localStorage.getItem(viewKey) || '0', 10);
        localStorage.setItem(viewKey, String(current + 1));

        const mockVendors: Record<string, unknown> = {
          "pete-barret": { name: "Pete & Barret Designs", category: "Graphic Design", location: "Nairobi", bio: "Premium graphic design specialists delivering unmatched high-end aesthetics for modern brands.", priceRating: "$$$", phone: "+254700000001", email: "pete@petebarret.co.ke", rating: 4.9, reviews: 450 },
          "sps": { name: "SP Design Services", category: "Graphic Design", location: "Nairobi", bio: "SP Design Services delivers fast, reliable, and high-quality logo designs you can trust. We specialize in urgent and last-minute design requests.", priceRating: "$$", phone: "+254700000002", email: "studio@spstudio.co.ke", rating: 3.9, reviews: 157 },
          "personal-designs": { name: "Neon Gravity Co.", category: "Influencer Marketing", location: "Kisumu", bio: "Anti-gravity creative studio using 3D textures and vivid visual storytelling.", priceRating: "$$$", phone: "+254700000003", email: "neon@neongravity.co.ke", rating: 5.0, reviews: 81 },
        };
        vendorData = mockVendors[resolvedParams.id] || null;
      }

      Promise.resolve().then(() => {
        setIsOwner(isCurrentSeller);
        if (savedPic) setProfilePic(savedPic);
        if (isCurrentSeller) {
          setImages(imgs);
          setVideos(vids);
        }
        if (vendorData) {
          setVendor(vendorData);
          setEditValues({ bio: vendorData.bio || '', location: vendorData.location || 'Nairobi' });
        }
      });
    } catch (e) { console.error(e); }
  }, [resolvedParams.id]);


  const handleWhatsApp = () => {
    if (!vendor?.phone) return;
    const cleaned = vendor.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleaned}?text=Hi%20${encodeURIComponent(vendor.name)}%2C%20I%20found%20your%20profile%20on%20LisBran%20and%20I%27m%20interested%20in%20your%20services!`, '_blank');
  };

  const handleBookService = () => {
    if (!vendor?.phone) return;
    const cleaned = vendor.phone.replace(/\D/g, '');
    const msg = `Hi ${vendor.name}! 👋 I found your profile on LisBran and I'd like to book your ${vendor.category || 'services'}. When are you available? Let's connect!`;
    window.open(`https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`, '_blank');

    // Store booking notification for the seller
    const sellerId = resolvedParams.id;
    const bookingKey = `seller_bookings_${sellerId}`;
    const existing = JSON.parse(localStorage.getItem(bookingKey) || '[]');
    existing.unshift({
      id: Date.now(),
      name: 'A LisBran Client',
      service: vendor.category || 'General Service',
      time: new Date().toLocaleString('en-KE', { dateStyle: 'short', timeStyle: 'short' }),
      via: 'WhatsApp',
    });
    localStorage.setItem(bookingKey, JSON.stringify(existing.slice(0, 20)));
  };

  const handleMpesaPayment = () => {
    setPaymentState('pushing');
    setTimeout(() => {
      setPaymentState('success');
      const sellerId = resolvedParams.id;
      const bookingKey = `seller_bookings_${sellerId}`;
      const existing = JSON.parse(localStorage.getItem(bookingKey) || '[]');
      existing.unshift({
        id: Date.now(),
        name: 'M-PESA Client',
        service: `${vendor?.category || 'Service'} Deposit (KSh ${mpesaAmount})`,
        time: new Date().toLocaleString('en-KE', { dateStyle: 'short', timeStyle: 'short' }),
        via: 'M-PESA Express Split (10% LisBran Commission Banked)',
      });
      localStorage.setItem(bookingKey, JSON.stringify(existing.slice(0, 20)));

      setTimeout(() => {
        setIsMpesaOpen(false);
        setPaymentState('idle');
        const cleaned = (vendor?.phone || '254700000000').replace(/\D/g, '');
        const ref = `LB-${Math.floor(Math.random() * 899999 + 100000)}`;
        const msg = `Hi ${vendor?.name || 'Vendor'}! 👋 I have paid KSh ${mpesaAmount} deposit via LisBran M-PESA Express (Ref: ${ref}). 90% (KSh ${Math.round(Number(mpesaAmount) * 0.9)}) has been credited directly to your payout account. Let's discuss details!`;
        window.open(`https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`, '_blank');
      }, 1500);
    }, 2200);
  };

  const saveEdit = (field: string) => {
    const updated = { ...vendor, [field]: editValues[field] };
    setVendor(updated);
    if (field === 'bio') localStorage.setItem('seller_bio', editValues[field]);
    if (field === 'location') localStorage.setItem('seller_location', editValues[field]);
    setEditingField(null);
  };

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setProfilePic(base64);
      localStorage.setItem('seller_profile_pic', base64);
    };
    reader.readAsDataURL(file);
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    if (!e.target.files) return;
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        if (type === 'image') {
          setImages(prev => {
            const updated = [...prev, base64];
            localStorage.setItem('seller_portfolio_images', JSON.stringify(updated));
            return updated;
          });
        } else {
          setVideos(prev => {
            const updated = [...prev, base64];
            localStorage.setItem('seller_portfolio_videos', JSON.stringify(updated));
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  if (!vendor) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );

  const allMedia = [
    ...images.map(src => ({ src, type: 'image' as const })),
    ...videos.map(src => ({ src, type: 'video' as const }))
  ];

  return (
    <div className="relative min-h-screen bg-[#06060a] pb-36 overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Animated ambient background glows */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-100px] right-[-80px] w-[400px] h-[400px] bg-purple-700/25 rounded-full blur-[120px] pointer-events-none z-0" />
      <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-[100px] left-[-80px] w-[350px] h-[350px] bg-pink-700/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="fixed top-[40%] left-[40%] w-[200px] h-[200px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => { setSelectedMedia(null); }}>
            {selectedMedia.type === 'image'
              ? <img src={selectedMedia.src} alt="" className="max-w-full max-h-full rounded-2xl object-contain" />
              : <video src={selectedMedia.src} controls autoPlay className="max-w-full max-h-full rounded-2xl" />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <div className="absolute top-5 left-5 z-30">
        <button onClick={() => { router.back(); }} className="p-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* HERO BANNER */}
      <div className="relative w-full h-72 overflow-hidden z-10">
        {images[0]
          ? <img src={images[0]} alt="banner" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          : <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#0d0d1a] to-[#1a0c2e]" />
        }
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/40 to-transparent" />

        {/* "PORTFOLIO" watermark */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="text-[80px] md:text-[120px] font-black tracking-[0.25em] text-white/[0.06] uppercase leading-none">
            PORTFOLIO
          </span>
        </div>

        {/* Floating star badge */}
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-6 flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white font-black text-sm">{vendor.rating || '5.0'}</span>
          </div>
          <span className="text-zinc-500 text-[11px] pr-1">({vendor.reviews || 1} reviews)</span>
        </motion.div>
      </div>

      {/* AVATAR */}
      <div className="relative z-20 flex justify-center -mt-12 mb-4">
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-[#06060a] shadow-[0_0_40px_rgba(168,85,247,0.5)] overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            {profilePic
              ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              : <span className="text-white font-black text-2xl" style={{ fontFamily: "serif" }}>{vendor.name?.substring(0, 2).toUpperCase()}</span>
            }
          </div>
          {isOwner && (
            <>
              <input type="file" accept="image/*" className="hidden" ref={profilePicRef} onChange={handleProfilePicUpload} />
              <button onClick={() => profilePicRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center border-2 border-[#06060a] shadow-lg transition-colors">
                <Camera size={13} className="text-white" />
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* NAME & LOCATION */}
      <div className="text-center px-6 mb-6 z-10 relative">
        <h1 className="text-white font-black text-2xl tracking-wide uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.12em" }}>
          {vendor.name}
        </h1>
        <p className="text-purple-400 font-semibold text-xs uppercase tracking-widest mb-2">{vendor.category}</p>
        <div className="flex items-center justify-center gap-1">
          <MapPin size={13} className="text-zinc-500" />
          {editingField === 'location' ? (
            <div className="flex items-center gap-1.5">
              <input autoFocus value={editValues.location} onChange={e => { setEditValues(p => ({ ...p, location: e.target.value })); }}
                className="bg-white/10 text-white text-sm px-2 py-0.5 rounded-lg outline-none border border-purple-500 w-32" />
              <button onClick={() => { saveEdit('location'); }} className="text-green-400 hover:text-green-300"><Check size={14} /></button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400 text-sm">{vendor.location || 'Nairobi'}</span>
              {isOwner && <button onClick={() => { setEditingField('location'); }} className="text-zinc-600 hover:text-purple-400 transition-colors"><Pencil size={12} /></button>}
            </div>
          )}
        </div>

        {/* Price badge */}
        {vendor.priceRating && (
          <div className="inline-flex items-center gap-1 mt-3 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            {[...Array(vendor.priceRating.length)].map((_, i) => (
              <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-zinc-400 text-xs ml-1">{vendor.priceRating}</span>
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="relative z-10 mx-6 mb-6">
        <div className="flex bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          {(['description', 'portfolio'] as const).map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); }}
              className={`flex-1 py-2.5 text-sm font-bold capitalize rounded-xl transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="relative z-10 px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'description' ? (
            <motion.div key="desc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="glass-card p-5 relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              {editingField === 'bio' ? (
                <div className="space-y-3">
                  <textarea autoFocus value={editValues.bio} onChange={e => { setEditValues(p => ({ ...p, bio: e.target.value })); }}
                    className="w-full bg-white/5 border border-purple-500/50 rounded-xl px-4 py-3 text-white text-sm leading-relaxed resize-none outline-none min-h-[140px] focus:border-purple-500 transition-colors" />
                  <button onClick={() => { saveEdit('bio'); }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 rounded-xl text-sm hover:from-purple-500 hover:to-pink-500 transition-all">
                    Save Description
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-zinc-300 text-sm leading-relaxed relative z-10">{vendor.bio}</p>
                  {isOwner && (
                    <button onClick={() => { setEditingField('bio'); }}
                      className="absolute top-4 right-4 p-1.5 bg-white/5 border border-white/10 rounded-full text-zinc-600 hover:text-purple-400 transition-colors">
                      <Pencil size={13} />
                    </button>
                  )}
                </>
              )}
            </motion.div>
          ) : (
            <motion.div key="portfolio" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {/* Owner upload buttons */}
              {isOwner && (
                <div className="flex gap-2 mb-4">
                  <input type="file" accept="image/*" multiple className="hidden" ref={imageUploadRef} onChange={e => { handlePortfolioUpload(e, 'image'); }} />
                  <input type="file" accept="video/*" multiple className="hidden" ref={videoUploadRef} onChange={e => { handlePortfolioUpload(e, 'video'); }} />
                  <button onClick={() => imageUploadRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500/40 text-zinc-400 hover:text-purple-400 transition-all py-3 rounded-2xl text-xs font-bold uppercase tracking-widest">
                    <ImageIcon size={14} /> Add Images
                  </button>
                  <button onClick={() => videoUploadRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-pink-500/10 hover:border-pink-500/40 text-zinc-400 hover:text-pink-400 transition-all py-3 rounded-2xl text-xs font-bold uppercase tracking-widest">
                    <Video size={14} /> Add Videos
                  </button>
                </div>
              )}

              {allMedia.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {allMedia.map((media, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      onClick={() => { setSelectedMedia(media); }}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black cursor-pointer group shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                      {media.type === 'image'
                        ? <img src={media.src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <>
                            <video src={media.src} className="w-full h-full object-cover" muted />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <Play size={18} className="text-white ml-1" fill="white" />
                              </div>
                            </div>
                          </>}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-10 text-center flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-2">
                    <Camera size={28} className="text-purple-500/50" />
                  </div>
                  <p className="text-zinc-500 text-sm font-medium">No portfolio media yet.</p>
                  {isOwner
                    ? <p className="text-purple-400/60 text-xs">Use the buttons above to add your images and videos.</p>
                    : <p className="text-zinc-700 text-xs">{"This vendor hasn't uploaded portfolio media yet."}</p>}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONTACT BUTTONS */}
      <div className="relative z-10 px-6 mt-8 space-y-3">
        {/* Book & M-PESA Split CTAs */}
        {!isOwner && (
          <div className="space-y-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => setIsMpesaOpen(true)}
              className="w-full bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all tracking-wide uppercase">
              <Smartphone size={18} /> Pay Deposit via M-PESA Express
            </motion.button>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={handleBookService}
              className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition-all">
              <MessageCircle size={17} /> Direct WhatsApp Quote
            </motion.button>
          </div>
        )}

        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleWhatsApp}
            className="flex-1 bg-white/5 border border-white/15 hover:bg-white/10 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all">
            <MessageCircle size={17} /> Chat
          </motion.button>
          {vendor.email ? (
            <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              href={`mailto:${vendor.email}`}
              className="flex-1 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all text-sm backdrop-blur-sm">
              <Mail size={17} /> Email
            </motion.a>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setSaved(s => !s); }}
              className={`flex-1 border transition-all text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm backdrop-blur-sm ${saved ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/15 hover:bg-white/10'}`}>
              <Bookmark size={17} className={saved ? 'fill-purple-400 text-purple-400' : ''} />
              {saved ? 'Saved' : 'Save'}
            </motion.button>
          )}
        </div>
      </div>

      {/* M-PESA STK Push Split Payment Modal */}
      <AnimatePresence>
        {isMpesaOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setIsMpesaOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#121214] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] text-white overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
                    <Smartphone size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-wide text-white">M-PESA Express Split</h3>
                    <p className="text-[10px] text-emerald-400 font-medium">Instant Automated Bank Split</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMpesaOpen(false)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/15 transition-colors"
                >
                  <X size={18} className="text-zinc-400" />
                </button>
              </div>

              {paymentState === 'idle' && (
                <>
                  <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-4 mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-zinc-400 font-bold">Vendor Payout</span>
                      <span className="text-xs text-white font-black">{vendor?.name || 'Vendor'}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-zinc-400 font-bold">Deposit Amount</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-emerald-400">KSh</span>
                        <input
                          type="number"
                          value={mpesaAmount}
                          onChange={(e) => setMpesaAmount(e.target.value)}
                          className="w-20 bg-black/60 border border-white/15 rounded-lg px-2 py-1 text-right text-xs font-black text-white outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Split Breakdown */}
                    <div className="pt-3 border-t border-emerald-500/20 flex flex-col gap-1.5 text-[11px]">
                      <div className="flex justify-between text-zinc-300">
                        <span>Vendor Direct Account (90%)</span>
                        <span className="font-bold text-emerald-400">KSh {Math.round(Number(mpesaAmount || 0) * 0.9)}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>LisBran Platform Fee (10%)</span>
                        <span className="font-bold text-purple-400">KSh {Math.round(Number(mpesaAmount || 0) * 0.1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Safaricom M-PESA Number</label>
                    <div className="flex items-center gap-3 bg-black/60 border border-white/15 rounded-2xl p-3.5 focus-within:border-emerald-500 transition-colors">
                      <span className="text-xs font-black text-emerald-400">+254</span>
                      <input
                        type="text"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="712345678"
                        className="bg-transparent border-none outline-none text-white w-full text-sm font-bold placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleMpesaPayment}
                    className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wide"
                  >
                    <ShieldCheck size={18} /> Trigger M-PESA STK Push
                  </button>
                </>
              )}

              {paymentState === 'pushing' && (
                <div className="py-10 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mb-4" />
                  <h4 className="text-lg font-black text-white mb-1">STK Push Sent! 📲</h4>
                  <p className="text-xs text-zinc-400 max-w-xs">Check your Safaricom phone ({mpesaPhone}) and enter your M-PESA PIN to complete the deposit.</p>
                </div>
              )}

              {paymentState === 'success' && (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                    <CheckCircle2 size={36} className="text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">Payment Verified! 🎉</h4>
                  <p className="text-xs text-emerald-400 font-bold mb-1">10% Commission Banked • 90% Vendor Direct</p>
                  <p className="text-xs text-zinc-400">Opening WhatsApp chat with vendor...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
