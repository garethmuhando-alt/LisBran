"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Briefcase, Image as ImageIcon, Video, CheckCircle2, Phone, Mail, X, Lock, Link as LinkIcon, Edit, DollarSign, ShieldCheck, RefreshCw, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function SellerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // New-seller form state
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("$$");
  const [socialLink, setSocialLink] = useState("");

  // Login / OTP state
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginStep, setLoginStep] = useState<'credentials' | 'otp'>('credentials');
  const [otpCode, setOtpCode] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Signup verification state
  const [signupVerifying, setSignupVerifying] = useState(false);
  const [signupOtpCode, setSignupOtpCode] = useState('');
  const [signupOtpError, setSignupOtpError] = useState('');
  const [signupResendCountdown, setSignupResendCountdown] = useState(0);
  const [signupDevCode, setSignupDevCode] = useState(''); // dev mode only
  const [isSendingSignupOtp, setIsSendingSignupOtp] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginError, setLoginError] = useState("");

  // Media state
  const [mediaUrls, setMediaUrls] = useState<{url: string, type: string}[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Login OTP countdown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => { setResendCountdown(c => c - 1); }, 1000);
    return () => { clearTimeout(t); };
  }, [resendCountdown]);

  // Signup OTP countdown
  useEffect(() => {
    if (signupResendCountdown <= 0) return;
    const t = setTimeout(() => { setSignupResendCountdown(c => c - 1); }, 1000);
    return () => { clearTimeout(t); };
  }, [signupResendCountdown]);

  // ─── OTP: Send code ──────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    setLoginError("");
    const target = loginMethod === 'email' ? loginEmail : `+254${loginPhone}`;

    if (!supabase) {
      // No Supabase — fall back to localStorage password check (dev mode)
      setLoginError("⚠️ Live OTP requires Supabase credentials. Checking saved account instead…");
      setTimeout(async () => {
        const savedEmail = localStorage.getItem('seller_email');
        const savedPhone = localStorage.getItem('seller_phone');
        const match = loginMethod === 'email' ? savedEmail === loginEmail : savedPhone === `+254${loginPhone}`;
        if (!match) {
          setLoginError("No account found. Please sign up first.");
          return;
        }
        // In dev mode skip OTP and go straight to dashboard
        loadSellerFromLocalStorage();
        router.push("/seller/dashboard");
      }, 800);
      return;
    }

    setIsSendingOtp(true);
    try {
      if (loginMethod === 'email') {
        const { error } = await supabase.auth.signInWithOtp({
          email: loginEmail,
          options: { shouldCreateUser: false },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          phone: `+254${loginPhone}`,
        });
        if (error) throw error;
      }
      setLoginStep('otp');
      setResendCountdown(60);
    } catch (err: unknown) {
      setLoginError((err as Error).message || "Failed to send code. Please try again.");
    }
    setIsSendingOtp(false);
  };

  // ─── OTP: Verify code ────────────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    setLoginError("");
    try {
      let verifyErr: unknown = null;
      if (loginMethod === 'email') {
        const res = await supabase?.auth.verifyOtp({ email: loginEmail, token: otpCode, type: 'email' });
        verifyErr = res?.error;
      } else {
        const res = await supabase?.auth.verifyOtp({ phone: `+254${loginPhone}`, token: otpCode, type: 'sms' });
        verifyErr = res?.error;
      }
      if (verifyErr) throw verifyErr;

      // Load vendor data from DB
      const field = loginMethod === 'email' ? 'email' : 'phone';
      const value = loginMethod === 'email' ? loginEmail : `+254${loginPhone}`;
      const vendorRes = await supabase?.from('vendors').select('*').eq(field, value).single();
      const data = vendorRes?.data;
      if (!data) {
        setLoginError("No seller account found with this contact. Please sign up first.");
        setIsSubmitting(false);
        return;
      }
      loadSellerFromDB(data);
      router.push("/seller/dashboard");
    } catch (err: unknown) {
      setLoginError((err as Error).message || "Invalid code. Please check and try again.");
    }
    setIsSubmitting(false);
  };

  const loadSellerFromDB = (data: any) => {
    localStorage.setItem('seller_name', data.business_name);
    localStorage.setItem('seller_phone', data.phone);
    localStorage.setItem('seller_email', data.email);
    localStorage.setItem('seller_category', data.category);
    localStorage.setItem('seller_bio', data.bio || '');
    localStorage.setItem('seller_price', data.price_rating || '$$');
    localStorage.setItem('seller_social', data.social_link || '');
    localStorage.setItem('seller_verified', data.verified ? 'true' : 'false');
    localStorage.setItem('seller_supabase_id', data.id || '');
  };

  const loadSellerFromLocalStorage = () => { /* already in localStorage */ };

  // ─── Signup OTP: Send verification code to new seller's email ────────────────
  const handleSendSignupOtp = async () => {
    setSignupOtpError('');
    setIsSendingSignupOtp(true);

    if (!supabase) {
      // Dev mode: generate a visible code for testing
      const devCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSignupDevCode(devCode);
      setSignupVerifying(true);
      setSignupResendCountdown(60);
      setIsSendingSignupOtp(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      setSignupVerifying(true);
      setSignupResendCountdown(60);
    } catch (err: any) {
      setSignupOtpError(err.message || 'Failed to send code. Please try again.');
    }
    setIsSendingSignupOtp(false);
  };

  // ─── Signup OTP: Verify the code entered ─────────────────────────────────────
  const handleVerifySignupOtp = async () => {
    if (signupOtpCode.length < 6) {
      setSignupOtpError('Please enter the full 6-digit code.');
      return;
    }
    setSignupOtpError('');
    setIsSubmitting(true);

    if (!supabase) {
      // Dev mode: check against generated code
      if (signupOtpCode !== signupDevCode) {
        setSignupOtpError(`Incorrect code. (Dev hint: ${signupDevCode})`);
        setIsSubmitting(false);
        return;
      }
      setSignupVerifying(false);
      setSignupOtpCode('');
      setStep(2);
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: signupOtpCode, type: 'email' });
      if (error) throw error;
      setSignupVerifying(false);
      setSignupOtpCode('');
      setStep(2);
    } catch (err: any) {
      setSignupOtpError(err.message || 'Invalid code. Please try again.');
    }
    setIsSubmitting(false);
  };

  const categories = [
    { id: "graphic-design", name: "Graphic Design Services" },
    { id: "influencer", name: "Influencer Marketing Services" },
    { id: "promotion", name: "Influencer and Promotion Services" },
    { id: "events", name: "Event and Activation Services" },
    { id: "printing", name: "Printing Services" }
  ];

  const handleNext = async () => {
    setErrorMsg("");
    setLoginError("");

    if (isLoginMode) {
      if (loginStep === 'credentials') {
        // Validate input then send OTP
        const hasTarget = loginMethod === 'email' ? loginEmail.includes('@') : loginPhone.length >= 6;
        if (!hasTarget) {
          setLoginError(loginMethod === 'email' ? "Enter a valid email address." : "Enter a valid phone number.");
          return;
        }
        void handleSendOtp();
        return;
      }
      // OTP verification step
      if (otpCode.length < 6) {
        setLoginError("Enter the 6-digit code sent to you.");
        return;
      }
      void handleVerifyOtp();
      return;
    }

    if (step < 3) {
      if (step === 1) {
        // Step 1 → send signup OTP before advancing
        void handleSendSignupOtp();
      } else {
        setStep(step + 1);
      }
    } else {
      // Step 3 = final submission
      setIsSubmitting(true);
      try {
        // Generate a local ID for offline use
        const localId = `local_${Date.now()}`;

        // Save to localStorage
        localStorage.setItem('seller_id', localId);
        localStorage.setItem('seller_name', businessName);
        localStorage.setItem('seller_phone', `+254${phone}`);
        localStorage.setItem('seller_email', email);
        localStorage.setItem('seller_password', password);
        localStorage.setItem('seller_category', category);
        localStorage.setItem('seller_bio', bio);
        localStorage.setItem('seller_price', price);
        localStorage.setItem('seller_social', socialLink);
        localStorage.setItem('seller_verified', 'false');

        // Save portfolio to localStorage — wrapped separately as base64 images can exceed the 5MB quota
        try {
          const images = mediaUrls.filter(m => m.type === 'image').map(m => m.url);
          const videos = mediaUrls.filter(m => m.type === 'video').map(m => m.url);
          localStorage.setItem('seller_portfolio_images', JSON.stringify(images));
          localStorage.setItem('seller_portfolio_videos', JSON.stringify(videos));
          localStorage.setItem('seller_portfolio', JSON.stringify(mediaUrls));
        } catch (quotaErr) {
          console.warn('Portfolio too large for localStorage — skipping portfolio save:', quotaErr);
          // Clear any partial portfolio data so the app doesn\'t read corrupt data
          localStorage.removeItem('seller_portfolio');
          localStorage.removeItem('seller_portfolio_images');
          localStorage.removeItem('seller_portfolio_videos');
        }

        // Supabase cloud save (if keys are configured) — with a 10-second timeout
        if (supabase) {
          try {
            const timeoutPromise = new Promise<null>((_, reject) =>
              setTimeout(() => { reject(new Error('Supabase timeout')); }, 10000)
            );
            const insertPromise = supabase
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
              .single()
              .then(({ data, error }) => ({ data, error }));

            const result = await Promise.race([insertPromise, timeoutPromise]) as { data: any; error: any } | null;

            if (result && !result.error && result.data) {
              const vendorData = result.data;
              localStorage.setItem('seller_supabase_id', vendorData.id);
              localStorage.setItem('seller_id', vendorData.id);
              // Fire-and-forget notification (no await to avoid blocking)
              supabase.from('admin_notifications').insert({
                type: 'new_vendor',
                message: `New seller "${businessName}" (${category}) has applied and is pending approval.`,
                vendor_id: vendorData.id,
                read: false,
              }).then(() => {}, () => {});
            }
          } catch (err) {
            console.warn('Supabase save failed or timed out, using localStorage fallback:', err);
          }
        }

        setIsSubmitting(false);
        router.push("/seller/dashboard");
      } catch (err) {
        setErrorMsg("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
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
      const imgs = updated.filter(m => m.type === 'image').map(m => m.url);
      const vids = updated.filter(m => m.type === 'video').map(m => m.url);
      localStorage.setItem('seller_portfolio', JSON.stringify(updated));
      localStorage.setItem('seller_portfolio_images', JSON.stringify(imgs));
      localStorage.setItem('seller_portfolio_videos', JSON.stringify(vids));
      return updated;
    });
  };

  const passwordsMatch = confirmPassword === "" || password === confirmPassword;
  const step1Valid = businessName.trim() !== "" && category !== "" && phone.length > 5 && email.includes("@") && password.length >= 6 && password === confirmPassword;
  const step2Valid = bio.trim().length > 0; // portfolio is optional

  return (
    <div className="relative p-6 pt-12 min-h-screen bg-[#141417] overflow-hidden scrollbar-hide">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      {/* ── Signup Email Verification Overlay ────────────────────────────── */}
      <AnimatePresence>
        {signupVerifying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-0 z-50 bg-[#141417] flex flex-col items-center justify-center p-6"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm">
              {/* Icon */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                  <ShieldCheck size={36} className="text-purple-400" />
                </div>
                <h1 className="text-2xl font-black text-white text-center">Verify Your Email</h1>
                <p className="text-zinc-400 text-sm text-center mt-2 leading-relaxed">
                  We sent a 6-digit code to<br/>
                  <strong className="text-purple-300">{email}</strong>
                </p>
                {!supabase && (
                  <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2 text-center">
                    <p className="text-amber-400 text-xs font-bold">DEV MODE — Your code: <span className="text-white tracking-widest">{signupDevCode}</span></p>
                  </div>
                )}
              </div>

              {/* OTP input */}
              <div className="space-y-4 mb-6">
                <input
                  type="number"
                  maxLength={6}
                  value={signupOtpCode}
                  onChange={e => { setSignupOtpCode(e.target.value.slice(0, 6)); }}
                  placeholder="— — — — — —"
                  autoFocus
                  className="w-full bg-white/5 border border-purple-500/40 rounded-2xl px-5 py-5 text-white text-center text-3xl font-black tracking-[0.6em] placeholder-zinc-700 focus:outline-none focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all"
                />
                {signupOtpError && (
                  <p className="text-red-400 text-sm font-bold text-center">{signupOtpError}</p>
                )}
              </div>

              {/* Verify button */}
              <button
                onClick={handleVerifySignupOtp}
                disabled={isSubmitting || signupOtpCode.length < 6}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 rounded-2xl text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] mb-4"
              >
                {isSubmitting ? 'Verifying…' : 'Verify & Continue →'}
              </button>

              {/* Resend + back */}
              <div className="flex items-center justify-between text-xs">
                {signupResendCountdown > 0 ? (
                  <p className="text-zinc-500">Resend in <span className="text-purple-400 font-bold">{signupResendCountdown}s</span></p>
                ) : (
                  <button
                    onClick={() => { setSignupOtpCode(''); void handleSendSignupOtp(); }}
                    disabled={isSendingSignupOtp}
                    className="flex items-center gap-1.5 text-purple-400 font-bold hover:text-purple-300 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={12} /> Resend Code
                  </button>
                )}
                <button
                  onClick={() => { setSignupVerifying(false); setSignupOtpCode(''); setSignupOtpError(''); }}
                  className="text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  ← Change email
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto">
        <div className="flex items-center mb-8 sticky top-0 bg-[#141417]/80 backdrop-blur-xl z-20 py-2">
          <button 
            onClick={() => { step === 1 ? router.back() : setStep(step - 1); }} 
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
                  <button onClick={() => { setIsLoginMode(false); }} className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${!isLoginMode ? 'bg-purple-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>New Seller</button>
                  <button onClick={() => { setIsLoginMode(true); }} className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${isLoginMode ? 'bg-purple-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Existing</button>
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
                          onChange={(e) => { setBusinessName(e.target.value); }}
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
                            onChange={(e) => { setEmail(e.target.value); }}
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
                            onChange={(e) => { setPhone(e.target.value); }}
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
                              onClick={() => { setCategory(c.id); }}
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
                            <input type="password" placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); }} className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-600 text-sm font-bold" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2">Confirm Key</label>
                          <div className={`flex items-center gap-3 bg-white/5 border rounded-2xl p-4 focus-within:border-purple-500/50 transition-colors ${confirmPassword.length > 0 && confirmPassword !== password ? 'border-red-500/70' : 'border-white/10'}`}>
                            <Lock className="text-zinc-500" size={16} />
                            <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); }} className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-600 text-sm font-bold" />
                          </div>
                          {confirmPassword.length > 0 && confirmPassword !== password && (
                            <p className="text-red-400 text-[11px] font-bold pl-2">{"⚠ Passwords don't match"}</p>
                          )}
                        </div>
                      </div>

                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-black text-white leading-tight mb-1">Welcome<br/><span className="text-purple-400">Back</span></h1>
                    <p className="text-zinc-400 text-sm mb-5">We&apos;ll send a secure code to verify it&apos;s you.</p>

                    <AnimatePresence mode="wait">
                      {loginStep === 'credentials' ? (
                        <motion.div key="creds" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                          {/* Email / Phone toggle */}
                          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                            <button
                              onClick={() => { setLoginMethod('email'); }}
                              className={`flex-1 py-2 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                                loginMethod === 'email' ? 'bg-purple-500 text-white shadow-md' : 'text-zinc-500'
                              }`}
                            >
                              <Mail size={14} /> Email
                            </button>
                            <button
                              onClick={() => { setLoginMethod('phone'); }}
                              className={`flex-1 py-2 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                                loginMethod === 'phone' ? 'bg-purple-500 text-white shadow-md' : 'text-zinc-500'
                              }`}
                            >
                              <Smartphone size={14} /> Phone
                            </button>
                          </div>

                          {loginMethod === 'email' ? (
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Email Address</label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                  type="email"
                                  value={loginEmail}
                                  onChange={e => { setLoginEmail(e.target.value); }}
                                  placeholder="name@business.co.ke"
                                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all font-bold"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Phone Number (WhatsApp)</label>
                              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-purple-500 transition-all">
                                <Phone className="ml-4 text-zinc-500 flex-shrink-0" size={18} />
                                <span className="px-3 py-4 text-zinc-400 font-bold bg-white/5 border-r border-white/10">+254</span>
                                <input
                                  type="tel"
                                  value={loginPhone}
                                  onChange={e => { setLoginPhone(e.target.value.replace(/\D/g, '')); }}
                                  placeholder="712 345 678"
                                  className="w-full bg-transparent px-4 py-4 text-white placeholder-zinc-600 focus:outline-none font-bold"
                                />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div key="otp" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
                          {/* Sent confirmation */}
                          <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl px-4 py-3">
                            <ShieldCheck size={18} className="text-purple-400 flex-shrink-0" />
                            <p className="text-purple-200 text-sm font-medium">
                              Code sent to <strong>{loginMethod === 'email' ? loginEmail : `+254${loginPhone}`}</strong>
                            </p>
                          </div>

                          {/* OTP Input */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">6-Digit Code</label>
                            <input
                              type="number"
                              maxLength={6}
                              value={otpCode}
                              onChange={e => { setOtpCode(e.target.value.slice(0, 6)); }}
                              placeholder="——  ——  ——"
                              className="w-full bg-white/5 border border-purple-500/40 rounded-2xl px-5 py-5 text-white text-center text-2xl font-black tracking-[0.5em] placeholder-zinc-700 focus:outline-none focus:border-purple-500 transition-all"
                            />
                          </div>

                          {/* Resend */}
                          <div className="flex items-center justify-center gap-2">
                            {resendCountdown > 0 ? (
                              <p className="text-zinc-500 text-xs">Resend code in <span className="text-purple-400 font-bold">{resendCountdown}s</span></p>
                            ) : (
                              <button
                                onClick={() => { setOtpCode(''); void handleSendOtp(); }}
                                disabled={isSendingOtp}
                                className="flex items-center gap-1.5 text-purple-400 text-xs font-bold hover:text-purple-300 transition-colors disabled:opacity-50"
                              >
                                <RefreshCw size={12} /> Resend Code
                              </button>
                            )}
                          </div>

                          {/* Change contact */}
                          <button
                            onClick={() => { setLoginStep('credentials'); setOtpCode(''); setLoginError(''); }}
                            className="w-full text-center text-zinc-500 text-xs hover:text-zinc-300 transition-colors"
                          >
                            ← Change {loginMethod === 'email' ? 'email' : 'phone'}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                    onChange={(e) => { setBio(e.target.value); }}
                    placeholder="Sell yourself! E.g. Award winning agency focusing on hyper-growth scaling inside Nairobi..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-all font-medium min-h-[120px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-2 flex items-center gap-1"><DollarSign size={12}/> Price Range</label>
                    <select 
                      value={price}
                      onChange={(e) => { setPrice(e.target.value); }}
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
                      onChange={(e) => { setSocialLink(e.target.value); }}
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
                             onClick={() => { removeMedia(idx); }}
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
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pb-20">
                <div>
                  <h1 className="text-3xl font-black text-white leading-tight mb-2">Review &amp; <span className="text-orange-400">Submit</span></h1>
                  <p className="text-zinc-400 text-sm">Double-check your details before submitting for admin approval.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Business Name", value: businessName },
                    { label: "Category", value: category },
                    { label: "Email", value: email },
                    { label: "Phone", value: `+254${phone}` },
                    { label: "Price Range", value: price },
                    { label: "Bio", value: bio.length > 60 ? bio.slice(0, 60) + "…" : bio },
                    { label: "Social Link", value: socialLink || "—" },
                    { label: "Portfolio Files", value: `${mediaUrls.length} file(s) uploaded` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between bg-white/5 border border-white/10 rounded-2xl px-5 py-3 gap-4">
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap pt-0.5">{label}</span>
                      <span className="text-white font-semibold text-sm text-right break-all">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/30 rounded-2xl px-5 py-4">
                  <Briefcase size={18} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-orange-300 text-sm leading-relaxed">Once submitted, our admin team will review and verify your profile before it goes live on the marketplace.</p>
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-sm font-bold text-center">{errorMsg}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 pb-10 space-y-3">
          {/* Login error message */}
          {isLoginMode && loginError && (
            <p className="text-red-400 text-sm font-bold text-center px-2">{loginError}</p>
          )}

          {/* Step 1 new seller hint */}
          {step === 1 && !isLoginMode && !step1Valid && (
            <p className="text-zinc-500 text-xs text-center">
              {!businessName.trim() ? "Enter your business name" :
               !category ? "Select a service category" :
               !email.includes("@") ? "Enter a valid email address" :
               phone.length <= 5 ? "Enter your phone number" :
               password.length < 6 ? "Password must be at least 6 characters" :
               password !== confirmPassword ? "Passwords do not match" : ""}
            </p>
          )}

          <button 
            onClick={handleNext}
            disabled={
              isSubmitting || isSendingOtp || isSendingSignupOtp ||
              (step === 1
                ? (!isLoginMode
                    ? !step1Valid
                    : loginStep === 'credentials'
                      ? (loginMethod === 'email' ? !loginEmail.includes('@') : loginPhone.length < 6)
                      : otpCode.length < 6)
                : step === 2 ? !step2Valid : false)
            }
            className={`group relative w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
              step === 3 ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.3)]" : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            <span className="relative z-10">
              {isSubmitting || isSendingOtp || isSendingSignupOtp
                ? "Sending code…"
                : step === 3
                  ? "Submit for Approval"
                  : isLoginMode
                    ? loginStep === 'credentials' ? "Send Code →" : "Verify & Enter Dashboard"
                    : step === 1
                      ? "Verify Email & Continue →"
                      : "Continue"}
            </span>
            {!isSubmitting && !isSendingOtp && !isSendingSignupOtp && step < 3 && !isLoginMode && step !== 1 && (
              <motion.div whileHover={{ x: 5 }} className="relative z-10"><ArrowRight size={20} /></motion.div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
