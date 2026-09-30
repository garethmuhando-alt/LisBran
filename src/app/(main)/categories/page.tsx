import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { PageHeader } from "@/components/ui/PageHeader";
import { services, suppliers } from "@/lib/catalog";

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader title="Services" description="Everything a marketing team buys, from overnight printing to dancers for a launch.">
        <div className="w-full md:w-96"><SearchInput placeholder="Search services, e.g. banners" /></div>
      </PageHeader>

      <ul className="wrap pb-16">
        {services.map((s) => {
          const count = suppliers.filter((x) => x.service === s.slug).length;
          return (
            <li key={s.slug} className="border-b border-rod-soft">
              <Link href={s.href} className="group grid grid-cols-[56px_minmax(0,1fr)_auto] md:grid-cols-[72px_minmax(0,1fr)_minmax(0,2fr)_auto_auto] items-center gap-x-4 md:gap-x-8 py-4">
                {s.art ? (
                  <span className="theme-preserve relative w-14 h-14 md:w-[72px] md:h-[72px] bg-[#13181e] border-[1.5px] border-rod overflow-hidden">
                    <Image src={s.art} alt="" fill sizes="72px" className="object-cover" />
                  </span>
                ) : (
                  <span aria-hidden className="w-14 md:w-[72px] flex justify-center">
                    <span className="w-2.5 h-2.5 border-[1.5px] border-rod" />
                  </span>
                )}
                <span className="font-display text-2xl md:text-3xl group-hover:text-cord transition-colors">{s.name}</span>
                <span className="hidden md:block text-ink-2">{s.blurb}</span>
                <span className="hidden md:block font-mono tabular text-sm text-ink-3">{count} {count === 1 ? "supplier" : "suppliers"}</span>
                <ArrowRight size={20} className="group-hover:text-cord transition-colors" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
