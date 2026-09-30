"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Bookmark, Camera, Check, ImageIcon, Mail, MessageCircle, Pencil, Phone, Play, Star, Video, X } from "lucide-react";
import { formatKes, serviceBySlug, supplierById, urgencyLabel } from "@/lib/catalog";
import { useSaved } from "@/lib/saved";

type Vendor = {
  name: string;
  service?: string;
  category: string;
  location: string;
  bio: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  verified: boolean;
  turnaround?: string;
  priceFrom?: number;
  sample: boolean;
};

type Media = { src: string; type: "image" | "video" };

const initials = (name: string) =>
  name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export default function SupplierProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { has, toggle } = useSaved();
  const [vendor, setVendor] = useState<Vendor | null | undefined>(undefined);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [editing, setEditing] = useState<"bio" | "location" | null>(null);
  const [draft, setDraft] = useState({ bio: "", location: "" });
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<Media | null>(null);
  const picRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let data: Vendor | null = null;
    let owner = false;
    let imgs: string[] = [];
    let vids: string[] = [];
    let pic: string | null = null;
    try {
      const sellerName = localStorage.getItem("seller_name") || "";
      owner = !!sellerName && sellerName.toLowerCase().replace(/\s+/g, "-") === id;
      if (owner) {
        data = {
          name: sellerName,
          service: localStorage.getItem("seller_category") || undefined,
          category: serviceBySlug(localStorage.getItem("seller_category") || "")?.name ?? (localStorage.getItem("seller_category") || ""),
          location: localStorage.getItem("seller_location") || "Nairobi",
          bio: localStorage.getItem("seller_bio") || "Tell buyers what you do, who you've worked with and how fast you deliver.",
          phone: localStorage.getItem("seller_phone") || "",
          email: localStorage.getItem("seller_email") || "",
          rating: 5,
          reviews: 0,
          verified: localStorage.getItem("seller_verified") === "true",
          turnaround: urgencyLabel[(localStorage.getItem("seller_turnaround") || "standard") as keyof typeof urgencyLabel],
          priceFrom: Number(localStorage.getItem("seller_price_from")) || undefined,
          sample: false,
        };
        imgs = JSON.parse(localStorage.getItem("seller_portfolio_images") || "[]");
        vids = JSON.parse(localStorage.getItem("seller_portfolio_videos") || "[]");
        pic = localStorage.getItem("seller_profile_pic");
      } else {
        const viewKey = `profile_views_${id}`;
        localStorage.setItem(viewKey, String(parseInt(localStorage.getItem(viewKey) || "0", 10) + 1));
      }
    } catch {}
    if (!owner) {
      const s = supplierById(id);
      if (s) {
        data = {
          name: s.name, service: s.service, category: serviceBySlug(s.service)?.name ?? s.service, location: s.city, bio: s.bio,
          phone: s.phone, email: s.email, rating: s.rating, reviews: s.reviews, verified: s.verified,
          turnaround: urgencyLabel[s.turnaround], priceFrom: s.priceFrom, sample: true,
        };
      }
    }
    const frame = requestAnimationFrame(() => {
      setIsOwner(owner);
      setImages(imgs);
      setVideos(vids);
      setProfilePic(pic);
      setVendor(data);
      if (data) setDraft({ bio: data.bio, location: data.location });
    });
    return () => cancelAnimationFrame(frame);
  }, [id]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (vendor === undefined) return <div className="wrap py-16 text-ink-3">Loading profile…</div>;
  if (vendor === null) {
    return (
      <div className="wrap py-16 max-w-xl">
        <h1 className="font-display text-4xl">Supplier not found</h1>
        <p className="mt-2 text-ink-2">This profile doesn&apos;t exist or has been removed.</p>
        <Link href="/categories" className="mt-5 inline-flex min-h-11 items-center px-5 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink transition-colors">Browse services</Link>
      </div>
    );
  }

  const phoneDigits = vendor.phone.replace(/\D/g, "");
  const quoteText = `Hi ${vendor.name}, I found your profile on LisBran and I'd like a quote for ${vendor.category || "your services"}. When are you available?`;

  const recordEnquiry = () => {
    try {
      const key = `seller_bookings_${id}`;
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      list.unshift({ id: Date.now(), name: "A LisBran buyer", service: vendor.category || "General enquiry", time: new Date().toLocaleString("en-KE", { dateStyle: "short", timeStyle: "short" }), via: "WhatsApp" });
      localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
    } catch {}
  };

  const saveEdit = (field: "bio" | "location") => {
    setVendor({ ...vendor, [field]: draft[field] });
    try { localStorage.setItem(`seller_${field}`, draft[field]); } catch {}
    setEditing(null);
  };

  const readFiles = (files: FileList | null, onEach: (dataUrl: string) => void) => {
    Array.from(files ?? []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => onEach(ev.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const addMedia = (type: "image" | "video") => (e: React.ChangeEvent<HTMLInputElement>) =>
    readFiles(e.target.files, (src) => {
      const set = type === "image" ? setImages : setVideos;
      set((prev) => {
        const next = [...prev, src];
        try { localStorage.setItem(type === "image" ? "seller_portfolio_images" : "seller_portfolio_videos", JSON.stringify(next)); } catch {}
        return next;
      });
    });

  const media: Media[] = [...images.map((src) => ({ src, type: "image" as const })), ...videos.map((src) => ({ src, type: "video" as const }))];
  const saved = has(id);
  const serviceHref = vendor.service ? serviceBySlug(vendor.service)?.href : undefined;

  return (
    <div className="pb-16">
      <header className="wrap pt-6 md:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-2 flex flex-wrap items-center gap-1.5 mb-3">
          <Link href="/categories" className="inline-flex min-h-7 items-center hover:text-ink font-semibold">Services</Link>
          {serviceHref && <><span aria-hidden>/</span><Link href={serviceHref} className="inline-flex min-h-7 items-center hover:text-ink font-semibold">{vendor.category}</Link></>}
          <span aria-hidden>/</span><span className="text-ink-3">{vendor.name}</span>
        </nav>

        <div className="rod-bottom pb-5 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5">
          <div className="relative w-20 h-20 md:w-24 md:h-24 border-[1.5px] border-rod bg-surface overflow-hidden shrink-0">
            {profilePic ? (
              <Image src={profilePic} alt="" fill unoptimized className="object-cover" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center font-display text-3xl">{initials(vendor.name)}</span>
            )}
            {isOwner && (
              <>
                <input type="file" accept="image/*" className="sr-only" ref={picRef} onChange={(e) => readFiles(e.target.files, (src) => { setProfilePic(src); try { localStorage.setItem("seller_profile_pic", src); } catch {} })} />
                <button type="button" onClick={() => picRef.current?.click()} aria-label="Change profile photo" className="absolute bottom-0 right-0 w-7 h-7 bg-ink text-ground flex items-center justify-center">
                  <Camera size={14} />
                </button>
              </>
            )}
          </div>
          <div className="min-w-[min(100%,16rem)] flex-1">
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.75rem)]">
              {vendor.name}
              {vendor.verified && <>{"\u00a0"}<BadgeCheck className="inline-block align-[-0.08em] w-[0.7em] h-[0.7em] text-ok" aria-label="Verified supplier" /></>}
            </h1>
            <p className="mt-1 text-ink-2 flex flex-wrap items-center gap-x-5 gap-y-1">
              <span>{vendor.category}</span>
              {editing === "location" ? (
                <span className="inline-flex items-center gap-1">
                  <label htmlFor="edit-location" className="sr-only">Location</label>
                  <input id="edit-location" autoFocus value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} className="min-h-8 w-36 bg-surface border-[1.5px] border-rod px-2 text-ink" />
                  <button type="button" onClick={() => saveEdit("location")} aria-label="Save location" className="w-8 min-h-8 inline-flex items-center justify-center bg-ink text-ground"><Check size={14} /></button>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  {vendor.location}
                  {isOwner && <button type="button" onClick={() => setEditing("location")} aria-label="Edit location" className="text-ink-3 hover:text-ink"><Pencil size={13} /></button>}
                </span>
              )}
              <span className="inline-flex max-w-full flex-wrap items-center gap-1"><Star size={12} className="fill-current" aria-hidden /><span className="font-mono tabular">{vendor.rating.toFixed(1)}</span> <span className="text-ink-3">(<span className="font-mono tabular">{vendor.reviews}</span> reviews)</span></span>
            </p>
          </div>
        </div>
        {vendor.sample && <p className="mt-3 text-xs text-ink-3">Sample listing for demonstration. Contact details are placeholders.</p>}
      </header>

      <div className="wrap mt-8 grid grid-cols-12 gap-y-10 lg:gap-x-[2.5vw]">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
          <section aria-labelledby="about">
            <div className="flex items-baseline justify-between rod-top pt-3 mb-3">
              <h2 id="about" className="font-display text-2xl">About</h2>
              {isOwner && editing !== "bio" && (
                <button type="button" onClick={() => setEditing("bio")} className="text-sm font-semibold inline-flex items-center gap-1 hover:text-cord"><Pencil size={13} /> Edit</button>
              )}
            </div>
            {editing === "bio" ? (
              <div className="flex flex-col gap-3 max-w-[70ch]">
                <label htmlFor="edit-bio" className="sr-only">About your business</label>
                <textarea id="edit-bio" autoFocus value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} className="min-h-36 bg-surface border-[1.5px] border-rod p-3 text-ink leading-relaxed" />
                <button type="button" onClick={() => saveEdit("bio")} className="self-start min-h-11 px-5 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink transition-colors">Save</button>
              </div>
            ) : (
              <p className="text-lg leading-relaxed max-w-[65ch]">{vendor.bio}</p>
            )}
          </section>

          <section aria-labelledby="work">
            <div className="flex items-baseline justify-between rod-top pt-3 mb-4">
              <h2 id="work" className="font-display text-2xl">Work</h2>
              {isOwner && (
                <div className="flex gap-2">
                  <input type="file" accept="image/*" multiple className="sr-only" ref={imgRef} onChange={addMedia("image")} />
                  <input type="file" accept="video/*" multiple className="sr-only" ref={vidRef} onChange={addMedia("video")} />
                  <button type="button" onClick={() => imgRef.current?.click()} className="min-h-9 px-3 text-sm font-semibold border-[1.5px] border-rod inline-flex items-center gap-1.5 hover:bg-ink hover:text-ground"><ImageIcon size={14} /> Add images</button>
                  <button type="button" onClick={() => vidRef.current?.click()} className="min-h-9 px-3 text-sm font-semibold border-[1.5px] border-rod inline-flex items-center gap-1.5 hover:bg-ink hover:text-ground"><Video size={14} /> Add videos</button>
                </div>
              )}
            </div>
            {media.length > 0 ? (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-rod border-[1.5px] border-rod">
                {media.map((m, i) => (
                  <li key={i} className="bg-ground">
                    <button type="button" onClick={() => setLightbox(m)} aria-label={`Open ${m.type} ${i + 1}`} className="group relative block w-full aspect-square overflow-hidden">
                      {m.type === "image" ? (
                        <Image src={m.src} alt="" fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      ) : (
                        <>
                          <video src={m.src} className="absolute inset-0 w-full h-full object-cover" muted />
                          <span className="absolute inset-0 flex items-center justify-center"><span className="w-12 min-h-12 bg-[#121212]/80 text-[#ece9e4] flex items-center justify-center"><Play size={18} className="translate-x-px" /></span></span>
                        </>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border-[1.5px] border-dashed border-rod-soft p-8 text-ink-2">
                {isOwner ? "Add images and videos of your best work. Buyers judge suppliers on portfolios first." : "This supplier hasn't added portfolio work yet."}
              </div>
            )}
          </section>
        </div>

        <aside className="col-span-12 lg:col-span-4" aria-label="Contact and details">
          <div className="lg:sticky lg:top-20 border-[1.5px] border-rod bg-surface">
            <dl className="grid grid-cols-2 text-sm">
              {vendor.turnaround && (<><dt className="p-3 border-b border-rod-soft text-ink-3">Turnaround</dt><dd className="p-3 border-b border-rod-soft font-semibold text-right">{vendor.turnaround}</dd></>)}
              {vendor.priceFrom ? (<><dt className="p-3 border-b border-rod-soft text-ink-3">Prices from</dt><dd className="p-3 border-b border-rod-soft font-mono tabular font-semibold text-right">{formatKes(vendor.priceFrom)}</dd></>) : null}
              <dt className="p-3 border-b border-rod-soft text-ink-3">Location</dt><dd className="p-3 border-b border-rod-soft font-semibold text-right">{vendor.location}</dd>
              <dt className="p-3 border-b border-rod-soft text-ink-3">Status</dt><dd className="p-3 border-b border-rod-soft font-semibold text-right">{vendor.verified ? "Verified" : "Not yet verified"}</dd>
            </dl>
            <div className="p-4 flex flex-col gap-2">
              {!isOwner && phoneDigits && (
                <a href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent(quoteText)}`} target="_blank" rel="noopener noreferrer" onClick={recordEnquiry}
                  className="min-h-12 inline-flex items-center justify-center gap-2 bg-cord text-cord-ink font-bold hover:brightness-110 transition">
                  <MessageCircle size={18} /> Get a quote on WhatsApp
                </a>
              )}
              <div className="grid grid-cols-3 gap-2">
                {phoneDigits && <a href={`tel:+${phoneDigits}`} className="min-h-11 inline-flex items-center justify-center gap-1.5 border-[1.5px] border-rod text-sm font-semibold hover:bg-ink hover:text-ground"><Phone size={15} /> Call</a>}
                {vendor.email && <a href={`mailto:${vendor.email}`} className="min-h-11 inline-flex items-center justify-center gap-1.5 border-[1.5px] border-rod text-sm font-semibold hover:bg-ink hover:text-ground"><Mail size={15} /> Email</a>}
                <button type="button" onClick={() => toggle(id)} aria-pressed={saved}
                  className={`min-h-11 inline-flex items-center justify-center gap-1.5 border-[1.5px] text-sm font-semibold transition-colors ${saved ? "border-cord text-cord" : "border-rod hover:bg-ink hover:text-ground"}`}>
                  <Bookmark size={15} className={saved ? "fill-current" : ""} /> {saved ? "Saved" : "Save"}
                </button>
              </div>
              <p className="mt-2 text-xs text-ink-3">M-Pesa deposits through LisBran are coming soon. For now, agree payment directly with the supplier.</p>
            </div>
          </div>
        </aside>
      </div>

      {lightbox && (
        <div role="dialog" aria-modal="true" aria-label="Portfolio item" className="fixed inset-0 z-[100] bg-[#121212]/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button type="button" aria-label="Close" onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 min-h-10 border-[1.5px] border-[#ece9e4]/60 text-[#ece9e4] flex items-center justify-center"><X size={18} /></button>
          {lightbox.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL shown at natural size
            <img src={lightbox.src} alt="" className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
          ) : (
            <video src={lightbox.src} controls autoPlay className="max-w-full max-h-full" onClick={(e) => e.stopPropagation()} />
          )}
        </div>
      )}
    </div>
  );
}
