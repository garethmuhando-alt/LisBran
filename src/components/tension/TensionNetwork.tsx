"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import {
  budgetLabel, canTake, formatKes, serviceBySlug, suppliers, urgencyLabel, type Job, type Supplier,
} from "@/lib/catalog";

// Rows have a fixed height in rem, so cord geometry stays exact without
// measuring, and scales with the visitor's text size. The SVG viewBox is
// unitless (ROW units per row) and stretched to the rows' real height.
const ROW = 72;
const ROW_REM = 4.5;
const MAX_ROWS = 8;

const deadline: Record<Job["urgency"], string> = {
  standard: "5–7 working days",
  "24h": "within 24 hours",
  overnight: "by 08:00 tomorrow",
};

// Taut cords run straight; slack ones sag. Both are one quadratic curve so
// the path morphs smoothly between states.
function cord(y0: number, y1: number, taut: boolean, h: number) {
  const mx = 50;
  const my = taut ? (y0 + y1) / 2 : Math.min(h + 6, Math.max(y0, y1) + h * 0.22);
  return `M 0 ${y0} Q ${mx} ${my} 100 ${y1}`;
}

export function rankSuppliers(job: Job) {
  return [...suppliers]
    .map((s) => ({ s, ok: canTake(s, job) }))
    .sort((a, b) => Number(b.ok) - Number(a.ok) || b.s.rating - a.s.rating);
}

export function TensionNetwork({ job }: { job: Job }) {
  const reduce = useReducedMotion();
  const ranked = rankSuppliers(job);
  const matches = ranked.filter((r) => r.ok).length;
  const rows = ranked.slice(0, MAX_ROWS);
  const h = rows.length * ROW;
  const jobY = h / 2;
  const service = job.service === "any" ? "Any service" : serviceBySlug(job.service)?.name ?? job.service;

  return (
    <div className="grid grid-cols-12 gap-y-6 md:gap-x-0">
      {/* The job: the load every cord pulls against */}
      <div className="col-span-12 md:col-span-4 lg:col-span-3 md:self-center">
        <div className="border-[1.5px] border-rod bg-surface p-4">
          <p className="font-display text-2xl">Your job</p>
          <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm break-words">
            <dt className="text-ink-3">Service</dt><dd className="font-semibold">{service}</dd>
            <dt className="text-ink-3">Where</dt><dd className="font-semibold">{job.city === "any" ? "Anywhere in Kenya" : job.city}</dd>
            <dt className="text-ink-3">Deadline</dt>
            <dd className={`font-semibold ${job.urgency === "standard" ? "" : "text-cord"}`}>
              {urgencyLabel[job.urgency]}, {deadline[job.urgency]}
            </dd>
            <dt className="text-ink-3">Budget</dt><dd className="font-semibold">{job.budget === "any" ? "Any" : budgetLabel[job.budget]}</dd>
          </dl>
          <p className="mt-4 pt-3 border-t border-rod-soft text-sm" aria-live="polite">
            <span className="font-mono tabular font-semibold text-base">{matches}</span> of{" "}
            <span className="font-mono tabular">{suppliers.length}</span> sample suppliers can take it
          </p>
        </div>
      </div>

      {/* Cords */}
      <div aria-hidden className="hidden md:block md:col-span-2 lg:col-span-3" style={{ height: `${rows.length * ROW_REM}rem` }}>
        <svg viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {rows.map(({ s, ok }, i) => (
            <motion.path
              key={s.id}
              initial={false}
              animate={{ d: cord(jobY, i * ROW + ROW / 2, ok, h), stroke: ok ? "var(--cord)" : "var(--ink-3)", strokeWidth: ok ? 2 : 1, opacity: ok ? 1 : 0.55 }}
              transition={reduce ? { duration: 0 } : { duration: 0.55, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      {/* Suppliers */}
      <ol className="col-span-12 md:col-span-6 border-t-[1.5px] border-rod">
        {rows.map(({ s, ok }) => (
          <motion.li key={s.id} layout={!reduce} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="border-b border-rod-soft">
            <SupplierRow s={s} ok={ok} />
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function SupplierRow({ s, ok }: { s: Supplier; ok: boolean }) {
  const service = serviceBySlug(s.service)?.name ?? s.service;
  return (
    <Link
      href={`/supplier/${s.id}`}
      style={{ height: `${ROW_REM}rem` }}
      className={`group relative flex items-center gap-4 pl-4 pr-2 transition-colors hover:bg-surface ${ok ? "" : "text-ink-3"}`}
    >
      {/* node where the cord lands; on phones it becomes the tension bar */}
      <span aria-hidden className={`absolute left-0 top-2 bottom-2 w-[3px] md:top-1/2 md:bottom-auto md:w-2 md:h-2 md:-translate-y-1/2 md:-left-1 ${ok ? "bg-cord" : "bg-rod-soft"}`} />
      <div className="min-w-0 flex-1">
        <p className={`font-semibold flex items-center gap-1.5 min-w-0 ${ok ? "text-ink" : ""}`}>
          <span className="truncate">{s.name}</span>
          {s.verified && <BadgeCheck size={15} className={`shrink-0 ${ok ? "text-ok" : ""}`} aria-label="Verified" />}
        </p>
        <p className="text-sm text-ink-2 truncate">{service} · {s.city}</p>
      </div>
      <div className="hidden sm:block text-right font-mono tabular text-xs leading-5">
        <p className={ok && s.turnaround !== "standard" ? "text-cord font-semibold" : ""}>{urgencyLabel[s.turnaround]}</p>
        <p className="text-ink-2">from {formatKes(s.priceFrom)}</p>
      </div>
      <p className="w-12 text-right font-mono tabular text-sm flex items-center justify-end gap-1">
        <Star size={12} className="fill-current" aria-hidden />{s.rating.toFixed(1)}
        <span className="sr-only">out of 5</span>
      </p>
      {!ok && <span className="sr-only">(does not match this job)</span>}
    </Link>
  );
}
