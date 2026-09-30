"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Eye, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { budgetLabel, serviceBySlug, urgencyLabel, type Budget, type Urgency } from "@/lib/catalog";
import { supabase } from "@/lib/supabase";

type Enquiry = { id: number; name: string; service: string; time: string; via: string };
type Seller = {
  name: string; slug: string; service: string; city: string; verified: boolean;
  turnaround: Urgency; budget: Budget; priceFrom: number; portfolio: number;
};

export default function SellerDashboardPage() {
  const [seller, setSeller] = useState<Seller | null | undefined>(undefined);
  const [views, setViews] = useState(0);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    let next: Seller | null = null;
    let v = 0;
    let e: Enquiry[] = [];
    try {
      const name = localStorage.getItem("seller_name");
      if (name) {
        const slug = name.toLowerCase().replace(/\s+/g, "-");
        const images = JSON.parse(localStorage.getItem("seller_portfolio_images") || "[]") as string[];
        const videos = JSON.parse(localStorage.getItem("seller_portfolio_videos") || "[]") as string[];
        next = {
          name, slug,
          service: localStorage.getItem("seller_category") || "",
          city: localStorage.getItem("seller_location") || "Nairobi",
          verified: localStorage.getItem("seller_verified") === "true",
          turnaround: (localStorage.getItem("seller_turnaround") as Urgency) || "standard",
          budget: (localStorage.getItem("seller_budget") as Budget) || "mid",
          priceFrom: Number(localStorage.getItem("seller_price_from")) || 0,
          portfolio: images.length + videos.length,
        };
        v = parseInt(localStorage.getItem(`profile_views_${slug}`) || "0", 10);
        e = JSON.parse(localStorage.getItem(`seller_bookings_${slug}`) || "[]");
      }
    } catch {}
    const id = requestAnimationFrame(() => { setSeller(next); setViews(v); setEnquiries(e); });
    return () => { cancelAnimationFrame(id); };
  }, []);

  // Refresh verification status from Supabase when connected.
  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("seller_supabase_id") : null;
    if (!supabase || !id) return;
    void supabase.from("vendors").select("verified").eq("id", id).maybeSingle().then(({ data }) => {
      if (data && typeof data.verified === "boolean") {
        localStorage.setItem("seller_verified", data.verified ? "true" : "false");
        setSeller((s) => (s ? { ...s, verified: data.verified } : s));
      }
    });
  }, []);

  if (seller === undefined) return <div className="wrap py-16 text-ink-3">Loading…</div>;

  if (seller === null) {
    return (
      <div>
        <PageHeader title="Seller dashboard" parent={{ href: "/profile", label: "Account" }} />
        <div className="wrap pb-16">
          <div className="border-[1.5px] border-dashed border-rod-soft p-8 max-w-xl">
            <p className="font-display text-2xl">You don&apos;t have a listing yet</p>
            <p className="mt-2 text-ink-2">Create one in three steps, or sign in if you&apos;ve already listed.</p>
            <Link href="/seller/onboarding" className="mt-5 inline-flex min-h-11 items-center gap-2 px-5 bg-cord text-cord-ink font-bold hover:brightness-110">
              Sell on LisBran <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const checklist = [
    { done: true, label: "Business details" },
    { done: seller.portfolio >= 3, label: "Three or more portfolio items" },
    { done: seller.priceFrom > 0, label: "A starting price" },
    { done: seller.verified, label: "Verified by the LisBran team" },
  ];

  return (
    <div>
      <PageHeader title={seller.name} parent={{ href: "/profile", label: "Account" }} description={`${serviceBySlug(seller.service)?.name ?? seller.service} · ${seller.city}`}>
        <Link href={`/supplier/${seller.slug}`} className="inline-flex min-h-11 items-center gap-2 px-5 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground transition-colors">
          View and edit your profile <ArrowRight size={16} />
        </Link>
      </PageHeader>

      <div className="wrap pb-16 grid grid-cols-12 gap-y-10 lg:gap-x-[2.5vw]">
        <section className="col-span-12" aria-label="Status">
          {seller.verified ? (
            <p className="inline-flex items-center gap-2 border-[1.5px] border-ok text-ok px-3 py-2 font-semibold"><BadgeCheck size={18} /> Verified: your listing is live</p>
          ) : (
            <p className="inline-flex items-center gap-2 border-[1.5px] border-cord text-cord px-3 py-2 font-semibold"><Clock size={18} /> Waiting for review by the LisBran team</p>
          )}
        </section>

        <section className="col-span-12 lg:col-span-7" aria-labelledby="enquiries">
          <div className="flex items-baseline justify-between rod-top pt-3 mb-2">
            <h2 id="enquiries" className="font-display text-2xl">Enquiries</h2>
            <p className="text-sm text-ink-3 inline-flex items-center gap-1.5"><Eye size={14} /> <span className="font-mono tabular">{views}</span> profile views on this device</p>
          </div>
          {enquiries.length === 0 ? (
            <p className="py-6 text-ink-2">No enquiries yet. Buyers who tap &ldquo;Get a quote&rdquo; on your profile appear here.</p>
          ) : (
            <ul>
              {enquiries.map((q) => (
                <li key={q.id} className="border-b border-rod-soft py-3 grid grid-cols-[auto_1fr_auto] gap-x-3 items-center">
                  <MessageCircle size={16} className="text-ink-3" />
                  <span><span className="font-semibold">{q.name}</span> <span className="text-ink-2">asked about {q.service}</span></span>
                  <span className="font-mono tabular text-xs text-ink-3">{q.time}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          <section aria-labelledby="listing">
            <h2 id="listing" className="font-display text-2xl rod-top pt-3 mb-2">Your listing</h2>
            <dl className="grid grid-cols-2 text-sm">
              <dt className="py-2 border-b border-rod-soft text-ink-3">Turnaround</dt><dd className="py-2 border-b border-rod-soft font-semibold text-right">{urgencyLabel[seller.turnaround]}</dd>
              <dt className="py-2 border-b border-rod-soft text-ink-3">Price tier</dt><dd className="py-2 border-b border-rod-soft font-semibold text-right">{budgetLabel[seller.budget]}</dd>
              <dt className="py-2 border-b border-rod-soft text-ink-3">Prices from</dt><dd className="py-2 border-b border-rod-soft font-mono tabular font-semibold text-right">{seller.priceFrom ? `KES ${seller.priceFrom.toLocaleString("en-KE")}` : "Not set"}</dd>
              <dt className="py-2 border-b border-rod-soft text-ink-3">Portfolio</dt><dd className="py-2 border-b border-rod-soft font-mono tabular font-semibold text-right">{seller.portfolio}</dd>
            </dl>
          </section>
          <section aria-labelledby="checklist">
            <h2 id="checklist" className="font-display text-2xl rod-top pt-3 mb-2">Get more enquiries</h2>
            <ul className="text-sm">
              {checklist.map((c) => (
                <li key={c.label} className="flex items-center gap-3 py-2 border-b border-rod-soft">
                  <span aria-hidden className={`w-4 h-4 border-[1.5px] ${c.done ? "bg-ink border-ink" : "border-rod"}`} />
                  <span className={c.done ? "text-ink-3 line-through" : ""}>{c.label}</span>
                  <span className="sr-only">{c.done ? "done" : "to do"}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
