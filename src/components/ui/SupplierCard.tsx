import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import { formatKes, serviceBySlug, urgencyLabel, type Supplier } from "@/lib/catalog";

// A supplier as a ruled listing row: name, what and where, turnaround and price.
export function SupplierCard({ s }: { s: Supplier }) {
  return (
    <Link href={`/supplier/${s.id}`} className="group grid grid-cols-1 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-x-4 gap-y-1 py-4 border-b border-rod-soft hover:bg-surface px-2 -mx-2 transition-colors">
      <p className="font-display text-xl flex items-center gap-1.5 group-hover:text-cord">
        {s.name}
        {s.verified && <BadgeCheck size={16} className="text-ok" aria-label="Verified" />}
      </p>
      <p className="font-mono tabular text-sm flex flex-wrap items-center gap-1 sm:justify-end">
        <Star size={12} className="fill-current" aria-hidden />{s.rating.toFixed(1)}
        <span className="text-ink-3">({s.reviews})</span>
      </p>
      <p className="text-sm text-ink-2">{serviceBySlug(s.service)?.name} · {s.city}</p>
      <p className="font-mono tabular text-xs sm:text-right">
        <span className={s.turnaround === "standard" ? "" : "text-cord font-semibold"}>{urgencyLabel[s.turnaround]}</span>
        {s.priceFrom > 0 && <span className="text-ink-2"> · from {formatKes(s.priceFrom)}</span>}
      </p>
      <p className="sm:col-span-2 text-sm text-ink-2 max-w-[70ch]">{s.bio}</p>
    </Link>
  );
}
