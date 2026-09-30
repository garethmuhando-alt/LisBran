"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ImageIcon, Video, X } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { budgetLabel, cities, services, urgencyLabel, type Budget, type Urgency } from "@/lib/catalog";
import { supabase } from "@/lib/supabase";

type Media = { url: string; type: "image" | "video" };
type VendorRecord = {
  id?: string; business_name: string; phone?: string; email?: string; category?: string; bio?: string;
  social_link?: string; verified?: boolean; city?: string; turnaround?: string; budget?: string; price_from?: number;
};

const IS_DEV = process.env.NODE_ENV !== "production";
const steps = ["Business", "Your work", "Review"] as const;

const field = "min-h-12 w-full bg-surface border-[1.5px] border-rod px-3 text-ink focus:outline-none focus:border-cord";
const labelCls = "block text-sm font-semibold text-ink-2 mb-1.5";

function saveLocal(v: VendorRecord) {
  const set = (k: string, val: string | undefined) => { if (val !== undefined) localStorage.setItem(k, val); };
  set("seller_name", v.business_name);
  set("seller_phone", v.phone);
  set("seller_email", v.email);
  set("seller_category", v.category);
  set("seller_bio", v.bio);
  set("seller_social", v.social_link);
  set("seller_location", v.city);
  set("seller_turnaround", v.turnaround);
  set("seller_budget", v.budget);
  set("seller_price_from", v.price_from ? String(v.price_from) : undefined);
  localStorage.setItem("seller_verified", v.verified ? "true" : "false");
  if (v.id) localStorage.setItem("seller_supabase_id", v.id);
  localStorage.removeItem("seller_password"); // older builds stored this; never keep it
}

export default function SellerOnboardingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // business
  const [businessName, setBusinessName] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState<string>("Nairobi");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // work
  const [bio, setBio] = useState("");
  const [turnaround, setTurnaround] = useState<Urgency>("standard");
  const [budget, setBudget] = useState<Budget>("mid");
  const [priceFrom, setPriceFrom] = useState("");
  const [social, setSocial] = useState("");
  const [media, setMedia] = useState<Media[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLInputElement>(null);

  // email verification (signup) and sign-in codes
  const [codeSentTo, setCodeSentTo] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [verified, setVerified] = useState(false);
  const [signinBy, setSigninBy] = useState<"email" | "phone">("email");
  const [signinValue, setSigninValue] = useState("");

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const fullPhone = (p: string) => `+254${p.replace(/\D/g, "").replace(/^0/, "").replace(/^254/, "")}`;

  // ── Codes ────────────────────────────────────────────────────────────────
  const sendCode = async (target: { email?: string; phone?: string }, createUser: boolean) => {
    setError("");
    setBusy(true);
    try {
      if (supabase) {
        const { error: err } = target.email
          ? await supabase.auth.signInWithOtp({ email: target.email, options: { shouldCreateUser: createUser } })
          : await supabase.auth.signInWithOtp({ phone: target.phone!, options: { shouldCreateUser: createUser } });
        if (err) throw err;
      } else if (IS_DEV) {
        setDevCode(String(Math.floor(100000 + Math.random() * 900000)));
      }
      setCodeSentTo(target.email ?? target.phone ?? "");
      setResendIn(60);
    } catch (e) {
      setError((e as Error).message || "We couldn't send the code. Check the address and try again.");
    }
    setBusy(false);
  };

  const checkCode = async (target: { email?: string; phone?: string }) => {
    if (code.length < 6) { setError("Enter the 6-digit code."); return false; }
    setError("");
    setBusy(true);
    try {
      if (supabase) {
        const { error: err } = target.email
          ? await supabase.auth.verifyOtp({ email: target.email, token: code, type: "email" })
          : await supabase.auth.verifyOtp({ phone: target.phone!, token: code, type: "sms" });
        if (err) throw err;
      } else if (IS_DEV && code !== devCode) {
        throw new Error("That code doesn't match.");
      }
      setBusy(false);
      return true;
    } catch (e) {
      setError((e as Error).message || "That code didn't work. Try again or resend it.");
      setBusy(false);
      return false;
    }
  };

  // ── Signup ───────────────────────────────────────────────────────────────
  const businessValid = businessName.trim().length > 1 && !!service && /\S+@\S+\.\S+/.test(email) && phone.replace(/\D/g, "").length >= 9;

  const continueFromBusiness = async () => {
    if (!businessValid) { setError("Fill in your business name, service, email and phone."); return; }
    if (verified) { setStep(1); return; }
    // Without Supabase in production there is nothing to verify against: listings stay on this device.
    if (!supabase && !IS_DEV) { setVerified(true); setStep(1); return; }
    if (!codeSentTo) { await sendCode({ email }, true); return; }
    if (await checkCode({ email })) { setVerified(true); setCodeSentTo(null); setCode(""); setStep(1); }
  };

  const addMedia = (type: Media["type"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => setMedia((m) => [...m, { url: ev.target?.result as string, type }]);
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const submit = async () => {
    setBusy(true);
    setError("");
    const record: VendorRecord = {
      business_name: businessName.trim(),
      category: service,
      email,
      phone: fullPhone(phone),
      bio,
      social_link: social,
      verified: false,
      city,
      turnaround,
      budget,
      price_from: priceFrom ? Number(priceFrom) : undefined,
    };
    try {
      saveLocal(record);
      try {
        localStorage.setItem("seller_portfolio_images", JSON.stringify(media.filter((m) => m.type === "image").map((m) => m.url)));
        localStorage.setItem("seller_portfolio_videos", JSON.stringify(media.filter((m) => m.type === "video").map((m) => m.url)));
      } catch {
        // Browser storage is ~5 MB; large portfolios are skipped rather than corrupting the profile.
        localStorage.removeItem("seller_portfolio_images");
        localStorage.removeItem("seller_portfolio_videos");
      }

      if (supabase) {
        const legacy = { business_name: record.business_name, category: record.category, email: record.email, phone: record.phone, bio: record.bio, social_link: record.social_link, verified: false };
        // Newer schema (see supabase/migrations) adds city/turnaround/budget/price_from; fall back if absent.
        let res = await supabase.from("vendors").insert({ ...legacy, city, turnaround, budget, price_from: record.price_from ?? null }).select().single();
        if (res.error) res = await supabase.from("vendors").insert(legacy).select().single();
        if (res.data?.id) {
          localStorage.setItem("seller_supabase_id", res.data.id);
          void supabase.from("admin_notifications").insert({
            type: "new_vendor", message: `New seller "${record.business_name}" (${service}) is waiting for approval.`, vendor_id: res.data.id, read: false,
          }).then(() => {}, () => {});
        }
      }
      router.push("/seller/dashboard");
    } catch {
      setError("Something went wrong saving your listing. Please try again.");
      setBusy(false);
    }
  };

  // ── Sign in ──────────────────────────────────────────────────────────────
  const signinTarget = () => (signinBy === "email" ? { email: signinValue.trim() } : { phone: fullPhone(signinValue) });

  const signin = async () => {
    const target = signinTarget();
    if (!codeSentTo) {
      if (signinBy === "email" ? !/\S+@\S+\.\S+/.test(signinValue) : signinValue.replace(/\D/g, "").length < 9) {
        setError(signinBy === "email" ? "Enter a valid email address." : "Enter a valid phone number.");
        return;
      }
      if (!supabase) {
        const saved = signinBy === "email" ? localStorage.getItem("seller_email") : localStorage.getItem("seller_phone");
        const value = target.email ?? target.phone;
        if (saved && saved === value) router.push("/seller/dashboard");
        else setError("No listing on this device matches that. Create one below.");
        return;
      }
      await sendCode(target, false);
      return;
    }
    if (!(await checkCode(target))) return;
    setBusy(true);
    const col = target.email ? "email" : "phone";
    const { data } = await supabase!.from("vendors").select("*").eq(col, target.email ?? target.phone!).maybeSingle();
    if (!data) { setError("You're signed in, but there's no listing for this contact yet. Create one below."); setBusy(false); return; }
    saveLocal(data as VendorRecord);
    router.push("/seller/dashboard");
  };

  // ── UI ───────────────────────────────────────────────────────────────────
  return (
    <div>
      <PageHeader
        title={mode === "signup" ? "Sell on LisBran" : "Sign in to your listing"}
        parent={{ href: "/profile", label: "Account" }}
        description={mode === "signup"
          ? "List your services in three steps. Our team reviews every new supplier before they're marked verified."
          : "We'll send a one-time code. No password needed."}
      >
        <button
          type="button"
          onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(""); setCodeSentTo(null); setCode(""); }}
          className="min-h-8 py-1 text-sm font-semibold underline hover:text-cord"
        >
          {mode === "signup" ? "Already listed? Sign in" : "New here? Create a listing"}
        </button>
      </PageHeader>

      <div className="wrap pb-16 grid grid-cols-12 gap-y-8 lg:gap-x-[2.5vw]">
        {mode === "signup" && (
          <ol className="col-span-12 lg:col-span-3 flex flex-wrap lg:flex-col gap-x-4 lg:gap-0" aria-label="Steps">
            {steps.map((label, i) => (
              <li key={label} className="flex-1 min-w-[6rem] lg:border-b lg:border-rod-soft">
                <span
                  aria-current={i === step ? "step" : undefined}
                  className={`flex items-center gap-3 py-2 lg:py-3 text-sm font-semibold border-t-[1.5px] ${i <= step ? "border-rod" : "border-rod-soft text-ink-3"}`}
                >
                  <span aria-hidden className={`w-2.5 h-2.5 shrink-0 ${i === step ? "bg-cord" : i < step ? "bg-ink" : "border-[1.5px] border-rod-soft"}`} />
                  <span className="font-mono tabular text-ink-3">{i + 1}</span> {label}
                  {i < step && <Check size={14} className="ml-auto" aria-label="done" />}
                </span>
              </li>
            ))}
          </ol>
        )}

        <div className={`col-span-12 ${mode === "signup" ? "lg:col-span-9" : "lg:col-span-6"} max-w-3xl`}>
          {mode === "signin" ? (
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); void signin(); }}>
              <div role="radiogroup" aria-label="Sign in with" className="flex border-[1.5px] border-rod self-start">
                {(["email", "phone"] as const).map((k) => (
                  <button key={k} type="button" role="radio" aria-checked={signinBy === k}
                    onClick={() => { setSigninBy(k); setCodeSentTo(null); setCode(""); setError(""); }}
                    className={`min-h-10 px-4 text-sm font-semibold ${signinBy === k ? "bg-cord text-cord-ink" : "hover:bg-surface"}`}>
                    {k === "email" ? "Email" : "Phone"}
                  </button>
                ))}
              </div>
              <div>
                <label htmlFor="signin-value" className={labelCls}>{signinBy === "email" ? "Email address" : "Phone number"}</label>
                <input id="signin-value" value={signinValue} onChange={(e) => setSigninValue(e.target.value)} disabled={!!codeSentTo}
                  type={signinBy === "email" ? "email" : "tel"} autoComplete={signinBy === "email" ? "email" : "tel"}
                  placeholder={signinBy === "email" ? "you@business.co.ke" : "0712 345 678"} className={field} />
              </div>
              {codeSentTo && <CodeField code={code} setCode={setCode} sentTo={codeSentTo} devCode={IS_DEV ? devCode : ""} resendIn={resendIn} onResend={() => sendCode(signinTarget(), false)} onChange={() => { setCodeSentTo(null); setCode(""); }} />}
              {error && <p role="alert" className="text-sm font-semibold text-cord">{error}</p>}
              <button type="submit" disabled={busy} className="self-start min-h-12 px-6 inline-flex items-center gap-2 bg-cord text-cord-ink font-bold hover:brightness-110 disabled:opacity-50">
                {busy ? "Please wait…" : codeSentTo ? "Sign in" : "Send code"} <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); if (step === 0) void continueFromBusiness(); else if (step === 1) setStep(2); else void submit(); }}>
              {step === 0 && (
                <>
                  <div>
                    <label htmlFor="biz" className={labelCls}>Business name</label>
                    <input id="biz" value={businessName} onChange={(e) => setBusinessName(e.target.value)} autoComplete="organization" required className={field} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="service" className={labelCls}>Main service</label>
                      <select id="service" value={service} onChange={(e) => setService(e.target.value)} required className={field}>
                        <option value="" disabled>Choose one</option>
                        {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="city" className={labelCls}>City</label>
                      <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className={field}>
                        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className={labelCls}>Email</label>
                      <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setVerified(false); setCodeSentTo(null); }} autoComplete="email" required disabled={!!codeSentTo} className={field} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone (WhatsApp)</label>
                      <div className="flex">
                        <span className="min-h-12 px-3 inline-flex items-center border-[1.5px] border-r-0 border-rod bg-surface-2 font-mono tabular text-sm">+254</span>
                        <input id="phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel-national" placeholder="712 345 678" required className={field} />
                      </div>
                    </div>
                  </div>
                  {codeSentTo && (
                    <CodeField code={code} setCode={setCode} sentTo={codeSentTo} devCode={IS_DEV ? devCode : ""} resendIn={resendIn}
                      onResend={() => sendCode({ email }, true)} onChange={() => { setCodeSentTo(null); setCode(""); }} />
                  )}
                  {verified && <p className="text-sm font-semibold text-ok flex items-center gap-1.5"><Check size={16} /> Email verified</p>}
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <label htmlFor="bio" className={labelCls}>What you do</label>
                    <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="Who you've worked with, what you're best at, how fast you deliver." className="w-full bg-surface border-[1.5px] border-rod p-3 text-ink focus:outline-none focus:border-cord" />
                  </div>
                  <fieldset>
                    <legend className={labelCls}>How fast can you usually deliver?</legend>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(urgencyLabel) as Urgency[]).map((u) => (
                        <Chip key={u} name="turnaround" checked={turnaround === u} onPick={() => setTurnaround(u)} label={urgencyLabel[u]} />
                      ))}
                    </div>
                  </fieldset>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <fieldset>
                      <legend className={labelCls}>Price tier</legend>
                      <div className="flex flex-wrap gap-2">
                        {(Object.keys(budgetLabel) as Budget[]).map((b) => (
                          <Chip key={b} name="budget" checked={budget === b} onPick={() => setBudget(b)} label={budgetLabel[b]} />
                        ))}
                      </div>
                    </fieldset>
                    <div>
                      <label htmlFor="price" className={labelCls}>Prices from (KES) <span className="font-normal text-ink-3">optional</span></label>
                      <input id="price" type="number" inputMode="numeric" min={0} step={100} value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} className={`${field} font-mono tabular`} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="social" className={labelCls}>Instagram or website <span className="font-normal text-ink-3">optional</span></label>
                    <input id="social" type="url" value={social} onChange={(e) => setSocial(e.target.value)} placeholder="https://instagram.com/yourbusiness" className={field} />
                  </div>
                  <div>
                    <p className={labelCls}>Portfolio</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <input ref={imgRef} type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={addMedia("image")} />
                      <input ref={vidRef} type="file" accept="video/mp4,video/quicktime" multiple className="sr-only" onChange={addMedia("video")} />
                      <button type="button" onClick={() => imgRef.current?.click()} className="min-h-10 px-4 inline-flex items-center gap-2 border-[1.5px] border-rod text-sm font-semibold hover:bg-ink hover:text-ground"><ImageIcon size={15} /> Add images</button>
                      <button type="button" onClick={() => vidRef.current?.click()} className="min-h-10 px-4 inline-flex items-center gap-2 border-[1.5px] border-rod text-sm font-semibold hover:bg-ink hover:text-ground"><Video size={15} /> Add videos</button>
                    </div>
                    {media.length > 0 ? (
                      <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {media.map((m, i) => (
                          <li key={i} className="relative aspect-square border-[1.5px] border-rod bg-surface overflow-hidden">
                            {m.type === "image" ? <Image src={m.url} alt="" fill unoptimized className="object-cover" /> : <video src={m.url} className="absolute inset-0 w-full h-full object-cover" muted />}
                            <button type="button" aria-label="Remove" onClick={() => setMedia((all) => all.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-7 h-7 bg-ink text-ground inline-flex items-center justify-center"><X size={14} /></button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-ink-3">Three or more images of real work get the most enquiries.</p>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 rod-top text-sm">
                  {[
                    ["Business", businessName],
                    ["Service", services.find((s) => s.slug === service)?.name ?? ""],
                    ["City", city],
                    ["Email", email],
                    ["Phone", fullPhone(phone)],
                    ["Turnaround", urgencyLabel[turnaround]],
                    ["Price tier", budgetLabel[budget] + (priceFrom ? `, from KES ${Number(priceFrom).toLocaleString("en-KE")}` : "")],
                    ["Portfolio", `${media.length} item${media.length === 1 ? "" : "s"}`],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="py-3 border-b border-rod-soft text-ink-3">{k}</dt>
                      <dd className="py-3 border-b border-rod-soft font-semibold break-words">{v || "—"}</dd>
                    </div>
                  ))}
                  <p className="col-span-2 pt-4 text-ink-2">
                    By submitting you agree to our <Link href="/terms" className="underline text-ink hover:text-cord">Terms of Service</Link>, including the supplier obligations.
                  </p>
                </dl>
              )}

              {error && <p role="alert" className="text-sm font-semibold text-cord">{error}</p>}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {step > 0 && (
                  <button type="button" onClick={() => { setStep(step - 1); setError(""); }} className="min-h-12 px-5 inline-flex items-center gap-2 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground">
                    <ArrowLeft size={18} /> Back
                  </button>
                )}
                <button type="submit" disabled={busy} className="min-h-12 px-6 inline-flex items-center gap-2 bg-cord text-cord-ink font-bold hover:brightness-110 disabled:opacity-50">
                  {busy ? "Please wait…" : step === 0 ? (codeSentTo ? "Verify and continue" : verified || (!supabase && !IS_DEV) ? "Continue" : "Send verification code") : step === 1 ? "Review" : "Submit listing"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ name, checked, onPick, label }: { name: string; checked: boolean; onPick: () => void; label: string }) {
  return (
    <label className="relative">
      <input type="radio" name={name} checked={checked} onChange={onPick} className="peer sr-only" />
      <span className="inline-flex min-h-10 items-center px-4 text-sm font-semibold border-[1.5px] border-rod-soft cursor-pointer hover:border-rod peer-checked:bg-cord peer-checked:border-cord peer-checked:text-cord-ink peer-focus-visible:outline-2 peer-focus-visible:outline-cord peer-focus-visible:outline-offset-2">
        {label}
      </span>
    </label>
  );
}

function CodeField({
  code, setCode, sentTo, devCode, resendIn, onResend, onChange,
}: { code: string; setCode: (v: string) => void; sentTo: string; devCode: string; resendIn: number; onResend: () => void; onChange: () => void }) {
  return (
    <div className="border-[1.5px] border-rod p-4 bg-surface">
      <label htmlFor="otp" className="block font-semibold">Enter the 6-digit code sent to {sentTo}</label>
      <input id="otp" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" autoFocus
        className="mt-2 min-h-12 w-48 bg-ground border-[1.5px] border-rod px-3 font-mono tabular text-2xl tracking-[0.3em] focus:outline-none focus:border-cord" />
      {devCode && <p className="mt-2 text-xs text-ink-3">Development build, no Supabase: use code <span className="font-mono">{devCode}</span></p>}
      <div className="mt-3 flex gap-4 text-sm">
        <button type="button" onClick={onResend} disabled={resendIn > 0} className="font-semibold underline disabled:no-underline disabled:text-ink-3">
          {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
        </button>
        <button type="button" onClick={onChange} className="font-semibold underline">Change</button>
      </div>
    </div>
  );
}
