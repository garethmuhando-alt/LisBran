"use client";

import Link from "next/link";
import { SupplierCard } from "@/components/ui/SupplierCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { supplierById } from "@/lib/catalog";
import { useSaved } from "@/lib/saved";

export default function SavedPage() {
  const { ids } = useSaved();
  const saved = ids.map(supplierById).filter((s) => s !== undefined);

  return (
    <div>
      <PageHeader title="Saved" description="Suppliers you've bookmarked on this device." />
      <div className="wrap pb-16">
        {saved.length === 0 ? (
          <div className="border-[1.5px] border-dashed border-rod-soft p-8 max-w-xl">
            <p className="font-display text-2xl">Nothing saved yet</p>
            <p className="mt-2 text-ink-2">Tap the bookmark on any supplier profile to keep it here for later.</p>
            <Link href="/categories" className="mt-5 inline-flex min-h-11 items-center px-5 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink transition-colors">
              Browse services
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl rod-top">{saved.map((s) => <SupplierCard key={s.id} s={s} />)}</div>
        )}
      </div>
    </div>
  );
}
