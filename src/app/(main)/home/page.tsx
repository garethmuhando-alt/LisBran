"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VideoMasthead } from "@/components/ui/VideoMasthead";
import { JobControls } from "@/components/tension/JobControls";
import { TensionNetwork, rankSuppliers } from "@/components/tension/TensionNetwork";
import { canTake, services, suppliers, urgencyLabel, type Job, type Urgency } from "@/lib/catalog";

const CITY_KEY = "lisbran_location";

function resultsHref(job: Job) {
  const q = new URLSearchParams();
  if (job.city !== "any") q.set("city", job.city);
  if (job.urgency !== "standard") q.set("urgency", job.urgency);
  if (job.budget !== "any") q.set("budget", job.budget);
  const qs = q.toString();
  return `/search/${job.service === "any" ? "all" : job.service}${qs ? `?${qs}` : ""}`;
}

export default function HomePage() {
  const [job, setJob] = useState<Job>({ service: "printing", city: "any", urgency: "overnight", budget: "any" });

  // Remember the buyer's city between visits.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CITY_KEY);
      if (saved) {
        const city = saved[0].toUpperCase() + saved.slice(1);
        const id = requestAnimationFrame(() => { setJob((j) => ({ ...j, city })); });
        return () => { cancelAnimationFrame(id); };
      }
    } catch {}
  }, []);

  const update = (next: Job) => {
    setJob(next);
    try {
      if (next.city === "any") localStorage.removeItem(CITY_KEY);
      else localStorage.setItem(CITY_KEY, next.city.toLowerCase());
    } catch {}
  };

  const matches = rankSuppliers(job).filter((r) => r.ok).length;
  // The job's city, urgency and budget propagate to every service row:
  // each shows how many suppliers could take this job in that service.
  const fastest = (list: typeof suppliers): Urgency | null =>
    list.some((s) => s.turnaround === "overnight") ? "overnight" : list.some((s) => s.turnaround === "24h") ? "24h" : list.length ? "standard" : null;
  const serviceRows = services.map((s) => {
    const inService = suppliers.filter((x) => x.service === s.slug);
    const able = inService.filter((x) => canTake(x, { ...job, service: s.slug }));
    return { s, total: inService.length, able: able.length, fastest: fastest(inService) };
  });

  return (
    <div>
      {/* ── Masthead: the brand film, full screen ─────────────────── */}
      <VideoMasthead next="#job">
        <div className="grid grid-cols-12 gap-y-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <h1 id="hero-title" className="font-display text-[clamp(2.4rem,4.6vw,4.5rem)]">
              Marketing suppliers, found&nbsp;fast.
            </h1>
            <p className="mt-4 text-ink-2 text-base md:text-lg max-w-[48ch]">
              Printers, designers, agencies, influencers and activation crews across Kenya, compared on
              price and turnaround.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <a href="#job" className="inline-flex min-h-12 items-center gap-2 px-6 bg-cord text-cord-ink font-bold hover:brightness-110 transition">
              Find a supplier <ArrowRight size={18} />
            </a>
            <Link href="/seller/onboarding" className="inline-flex min-h-12 items-center px-6 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground transition-colors">
              Sell on LisBran
            </Link>
          </div>
        </div>
      </VideoMasthead>

      {/* ── The job and the network ──────────────────────────────── */}
      <section id="job" aria-labelledby="job-title" className="wrap scroll-mt-14 pt-10 md:pt-14 pb-14 md:pb-20">
        <div className="rod-bottom pb-4 mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="job-title" className="font-display text-4xl md:text-5xl">Tell us the job</h2>
            <p className="mt-2 text-ink-2">Pick what you need, how soon and where. Suppliers who can take it pull tight.</p>
          </div>
          <Link
            href={resultsHref(job)}
            className="inline-flex min-h-12 items-center gap-2 px-6 bg-cord text-cord-ink font-bold hover:brightness-110 transition"
          >
            See {matches === 1 ? "1 supplier" : `${matches} suppliers`} <ArrowRight size={18} />
          </Link>
        </div>

        <JobControls job={job} onChange={update} layout="row" />

        <div id="network" className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h3 className="font-display text-2xl md:text-3xl">Who can take it</h3>
            <p className="text-sm text-ink-3">Sample listings. Verified supplier profiles open soon.</p>
          </div>
          <TensionNetwork job={job} />
        </div>
      </section>

      {/* ── Services index ───────────────────────────────────────── */}
      <section aria-labelledby="services-title" className="wrap pb-14 md:pb-20">
        <div className="rod-top pt-5 mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="services-title" className="font-display text-3xl md:text-4xl">Services</h2>
          <Link href="/categories" className="text-sm font-semibold inline-flex min-h-8 items-center gap-1 hover:text-cord">
            All services <ArrowRight size={14} />
          </Link>
        </div>

        <ul className="rod-top">
          {serviceRows.map(({ s: svc, total, able, fastest: quickest }) => {
            const selected = job.service === svc.slug;
            return (
              <li key={svc.slug} className="border-b border-rod-soft">
                <Link
                  href={svc.href}
                  className="group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] md:grid-cols-[4.5rem_minmax(0,1.2fr)_minmax(0,2fr)_9rem_auto] items-center gap-x-4 md:gap-x-6 py-3"
                >
                  {svc.art ? (
                    <span className="theme-preserve relative w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] border-[1.5px] border-rod bg-[#13181e] overflow-hidden">
                      <Image src={svc.art} alt="" fill sizes="72px" className="object-cover" />
                    </span>
                  ) : (
                    <span aria-hidden className="w-14 md:w-[4.5rem] flex justify-center">
                      <span className={`w-2.5 h-2.5 ${selected ? "bg-cord" : "border-[1.5px] border-rod"}`} />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className={`block font-display text-2xl md:text-3xl group-hover:text-cord transition-colors ${selected ? "text-cord" : ""}`}>{svc.name}</span>
                    <span className="md:hidden block text-sm text-ink-2">{svc.blurb}</span>
                  </span>
                  <span className="hidden md:block text-ink-2 min-w-0">{svc.blurb}</span>
                  <span className="hidden md:flex items-center gap-2 text-sm">
                    <span aria-hidden className={`w-2 h-2 shrink-0 ${able > 0 ? "bg-cord" : "bg-rod-soft"}`} />
                    <span><span className="font-mono tabular font-semibold">{able}</span> of <span className="font-mono tabular">{total}</span> can take it{quickest && <span className="block text-ink-3 text-xs">fastest: {urgencyLabel[quickest]}</span>}</span>
                  </span>
                  <ArrowRight size={18} className="group-hover:text-cord transition-colors" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Events and trends ────────────────────────────────────── */}
      <section aria-label="Events and trends" className="wrap pb-14 md:pb-20">
        <ul className="rod-top grid grid-cols-1 md:grid-cols-2 md:gap-x-[2.5vw]">
          <li className="border-b border-rod-soft">
            <Link href="/events" className="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 items-end py-5">
              <span>
                <span className="block font-display text-3xl group-hover:text-cord transition-colors">Events around Kenya</span>
                <span className="block mt-1 text-ink-2 max-w-[48ch]">Launches, expos and activations that need suppliers. Find work, or find a crew for yours.</span>
              </span>
              <ArrowRight size={20} className="group-hover:text-cord transition-colors" />
            </Link>
          </li>
          <li className="border-b border-rod-soft">
            <Link href="/trends" className="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 items-end py-5">
              <span>
                <span className="block font-display text-3xl group-hover:text-cord transition-colors">Marketing trends</span>
                <span className="block mt-1 text-ink-2 max-w-[48ch]">What is working in Kenyan marketing now, and who on LisBran can run it for you.</span>
              </span>
              <ArrowRight size={20} className="group-hover:text-cord transition-colors" />
            </Link>
          </li>
        </ul>
      </section>

      {/* ── Sell ─────────────────────────────────────────────────── */}
      <section aria-labelledby="sell-title" className="bg-ink text-ground">
        <div className="wrap py-12 md:py-16 grid grid-cols-12 gap-y-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <h2 id="sell-title" className="font-display text-4xl md:text-6xl">Take the jobs you&apos;re built for.</h2>
            <p className="mt-4 opacity-75 max-w-[52ch]">
              List your print shop, studio, agency, crew or creator profile. Buyers see your portfolio, prices and turnaround,
              and reach you directly.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Link href="/seller/onboarding" className="inline-flex min-h-12 items-center gap-2 px-6 bg-cord text-cord-ink font-bold hover:brightness-110 transition">
              Sell on LisBran <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
