"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

type Enquiry = { id: number; name: string; service: string; time: string; via: string };

export default function NotificationsPage() {
  const [items, setItems] = useState<Enquiry[]>([]);

  // Suppliers see enquiries recorded on this device when buyers tap "Get a quote".
  useEffect(() => {
    try {
      const seller = (localStorage.getItem("seller_name") || "").toLowerCase().replace(/\s+/g, "-");
      if (!seller) return;
      const list = JSON.parse(localStorage.getItem(`seller_bookings_${seller}`) || "[]") as Enquiry[];
      const id = requestAnimationFrame(() => setItems(list));
      return () => cancelAnimationFrame(id);
    } catch {}
  }, []);

  return (
    <div>
      <PageHeader title="Notifications" description="Quotes, enquiries and updates about your jobs." />
      <div className="wrap pb-16 max-w-4xl">
        {items.length === 0 ? (
          <div className="border-[1.5px] border-dashed border-rod-soft p-8">
            <p className="font-display text-2xl">You&apos;re all caught up</p>
            <p className="mt-2 text-ink-2 max-w-[56ch]">
              When suppliers reply to a quote request, or buyers contact your listing, it shows up here.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/home" className="inline-flex min-h-11 items-center gap-2 px-5 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink transition-colors">Find a supplier <ArrowRight size={16} /></Link>
              <Link href="/events" className="inline-flex min-h-11 items-center px-5 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground transition-colors">See events</Link>
            </div>
          </div>
        ) : (
          <ul className="rod-top">
            {items.map((n) => (
              <li key={n.id} className="border-b border-rod-soft py-4 grid grid-cols-[1fr_auto] gap-x-4">
                <p className="font-semibold">{n.name} asked about {n.service}</p>
                <p className="font-mono tabular text-xs text-ink-3">{n.time}</p>
                <p className="text-sm text-ink-2">via {n.via}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
