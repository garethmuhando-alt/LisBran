import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { events } from "@/lib/events";


export default function EventsPage() {
  return (
    <div>
      <PageHeader
        title="Events"
        description="The launches, festivals and expos that keep Kenyan marketing suppliers busy, and what they typically need."
      >
        <Link href="/map" className="inline-flex min-h-11 items-center gap-2 px-5 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground transition-colors">
          <MapPin size={16} /> Open the events map
        </Link>
      </PageHeader>

      <div className="wrap pb-16">
        <p className="text-sm text-ink-3 mb-4">Illustrative examples. LisBran is not affiliated with these organisers.</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rod border-[1.5px] border-rod">
          {events.map((e) => (
            <li key={e.id} className="bg-ground p-5 md:p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <h2 className="font-display text-3xl min-w-0">{e.name}</h2>
                <span className="text-xs font-semibold border-[1.5px] border-rod-soft px-2 py-1 shrink-0">{e.type}</span>
              </div>
              <dl className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-4 text-sm">
                <div><dt className="text-ink-3 flex items-center gap-1.5"><CalendarDays size={14} /> When</dt><dd className="font-semibold mt-0.5">{e.month}</dd></div>
                <div><dt className="text-ink-3 flex items-center gap-1.5"><MapPin size={14} /> Where</dt><dd className="font-semibold mt-0.5">{e.venue}, {e.city}</dd></div>
                <div><dt className="text-ink-3 flex items-center gap-1.5"><Users size={14} /> Crowd</dt><dd className="font-mono tabular font-semibold mt-0.5">{e.size}</dd></div>
              </dl>
              <div className="border-t border-rod-soft pt-3">
                <p className="text-sm text-ink-3">Typical supplier needs</p>
                <p className="font-semibold mt-1">{e.need.join(" · ")}</p>
              </div>
              <Link href="/seller/onboarding" className="mt-auto inline-flex min-h-8 items-center gap-2 text-sm font-bold hover:text-cord">
                List your services for events like this <ArrowRight size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
