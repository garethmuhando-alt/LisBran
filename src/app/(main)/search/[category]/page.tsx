"use client";

import { Suspense, use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { JobControls } from "@/components/tension/JobControls";
import { PageHeader } from "@/components/ui/PageHeader";
import { SupplierCard } from "@/components/ui/SupplierCard";
import { canTake, serviceBySlug, suppliers as sampleSuppliers, type Budget, type Job, type Supplier, type Urgency } from "@/lib/catalog";
import { supabase } from "@/lib/supabase";

type VendorRow = { business_name: string; category?: string; bio?: string; phone?: string; email?: string; location?: string; city?: string; turnaround?: string; budget?: string; price_from?: number | null };

const slugify = (v: string) => v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Map a live vendor record (Supabase or this device's onboarding) onto the catalog shape.
function toSupplier(v: VendorRow): Supplier {
  const cat = slugify(v.category || "");
  const service = ["graphic-design", "printing", "consultancy", "agencies", "influencer", "activations", "ambassadors", "dancers"].find(
    (s) => cat.includes(s.split("-")[0]),
  ) ?? "agencies";
  return {
    id: slugify(v.business_name),
    name: v.business_name,
    service,
    city: (["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu"].find((c) => c === (v.city ?? v.location)) ?? "Nairobi") as Supplier["city"],
    turnaround: (["standard", "24h", "overnight"].includes(v.turnaround ?? "") ? v.turnaround : "standard") as Supplier["turnaround"],
    budget: (["low", "mid", "premium"].includes(v.budget ?? "") ? v.budget : "mid") as Supplier["budget"],
    priceFrom: v.price_from ?? 0,
    rating: 5,
    reviews: 0,
    verified: true,
    bio: v.bio || "Verified LisBran supplier.",
    phone: v.phone || "",
    email: v.email || "",
  };
}

function Results({ category }: { category: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const known = category === "all" || !!serviceBySlug(category);
  const [live, setLive] = useState<Supplier[]>([]);

  const job: Job = {
    service: known ? (category === "all" ? "any" : category) : "any",
    city: params.get("city") ?? "any",
    urgency: (params.get("urgency") as Urgency) ?? "standard",
    budget: (params.get("budget") as Budget) ?? "any",
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found: Supplier[] = [];
      if (supabase) {
        const { data } = await supabase.from("vendors").select("*").eq("verified", true);
        if (data) found.push(...(data as VendorRow[]).map(toSupplier));
      }
      try {
        if (localStorage.getItem("seller_verified") === "true") {
          found.push(toSupplier({
            business_name: localStorage.getItem("seller_name") || "Verified Seller",
            category: localStorage.getItem("seller_category") || "",
            city: localStorage.getItem("seller_location") || "Nairobi",
            turnaround: localStorage.getItem("seller_turnaround") || undefined,
            budget: localStorage.getItem("seller_budget") || undefined,
            price_from: Number(localStorage.getItem("seller_price_from")) || null,
          }));
        }
      } catch {}
      if (!cancelled && found.length) setLive(found);
    })();
    return () => { cancelled = true; };
  }, []);

  const all = useMemo(() => [...live, ...sampleSuppliers], [live]);
  const term = category.replace(/-/g, " ");
  const results = known
    ? all.filter((s) => canTake(s, job))
    : all.filter((s) => `${s.name} ${s.bio} ${serviceBySlug(s.service)?.name}`.toLowerCase().includes(term.toLowerCase()));

  const setJob = (next: Job) => {
    const q = new URLSearchParams();
    if (next.city !== "any") q.set("city", next.city);
    if (next.urgency !== "standard") q.set("urgency", next.urgency);
    if (next.budget !== "any") q.set("budget", next.budget);
    const qs = q.toString();
    router.replace(`/search/${next.service === "any" ? "all" : next.service}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const title = category === "all" ? "All suppliers" : serviceBySlug(category)?.name ?? `Results for “${term}”`;

  return (
    <div>
      <PageHeader title={title} parent={{ href: "/categories", label: "Services" }} description={serviceBySlug(category)?.blurb} />
      <div className="wrap pb-16 grid grid-cols-12 gap-y-8 md:gap-x-[2.5vw]">
        {known && (
          <aside className="col-span-12 lg:col-span-4 min-w-0" aria-label="Filters">
            <div className="lg:sticky lg:top-20"><JobControls job={job} onChange={setJob} /></div>
          </aside>
        )}
        <section className={`col-span-12 min-w-0 ${known ? "lg:col-span-8" : ""}`} aria-live="polite">
          <p className="text-sm text-ink-2 mb-2">
            <span className="font-mono tabular font-semibold text-ink">{results.length}</span> {results.length === 1 ? "supplier" : "suppliers"}
            {live.length === 0 && <span className="text-ink-3"> · sample listings</span>}
          </p>
          <div className="rod-top">
            {results.map((s) => <SupplierCard key={s.id} s={s} />)}
          </div>
          {results.length === 0 && (
            <div className="py-10">
              <p className="font-display text-2xl">No one matches that yet</p>
              <p className="mt-2 text-ink-2 max-w-[52ch]">
                Try a longer deadline, another city, or any budget. Or tell us what you need and we&apos;ll find a supplier for you.
              </p>
              <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center px-5 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink transition-colors">
                Ask the LisBran team
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function SearchResultsPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  return (
    <Suspense fallback={<div className="wrap py-16 text-ink-3">Loading suppliers…</div>}>
      <Results category={decodeURIComponent(category)} />
    </Suspense>
  );
}
