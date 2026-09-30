import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SupplierCard } from "@/components/ui/SupplierCard";
import { suppliers } from "@/lib/catalog";

const sections = [
  { title: "Logo and brand identity", items: [
    { name: "Logo design", href: "/services/logo-design" },
    { name: "Brand style guides", href: "/search/brand-style-guides" },
    { name: "Business cards and stationery", href: "/search/business-cards" },
    { name: "Brand identity", href: "/search/brand-identity" },
  ] },
  { title: "Marketing design", items: [
    { name: "Social media design", href: "/search/social-media-design" },
    { name: "Email design", href: "/search/email-design" },
  ] },
  { title: "Web and app design", items: [
    { name: "Website design", href: "/search/website-design" },
    { name: "App design", href: "/search/app-design" },
    { name: "UI/UX design", href: "/search/ui-ux-design" },
    { name: "Landing page design", href: "/search/landing-page-design" },
  ] },
];

export default function GraphicDesignServices() {
  const designers = suppliers.filter((s) => s.service === "graphic-design");
  return (
    <div>
      <PageHeader title="Graphic design" parent={{ href: "/categories", label: "Services" }} description="Logos, brand identity, social and print artwork from Kenyan designers.">
        <div className="theme-preserve relative w-24 h-24 md:w-32 md:h-32 border-[1.5px] border-rod bg-[#0d0d0f] overflow-hidden">
          <Image src="/icon-graphic.png" alt="" fill sizes="128px" className="object-cover" priority />
        </div>
      </PageHeader>

      <div className="wrap pb-16 grid grid-cols-12 gap-y-10 lg:gap-x-[2.5vw]">
        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((sec) => (
            <nav key={sec.title} aria-label={sec.title}>
              <h2 className="font-semibold mb-2">{sec.title}</h2>
              <ul className="rod-top">
                {sec.items.map((item) => (
                  <li key={item.href} className="border-b border-rod-soft">
                    <Link href={item.href} className="group flex items-center justify-between py-3 text-ink-2 hover:text-ink">
                      {item.name} <ArrowRight size={14} className="group-hover:text-cord" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <section className="col-span-12 lg:col-span-5" aria-labelledby="designers">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-2">
            <h2 id="designers" className="font-display text-2xl">Designers</h2>
            <Link href="/search/graphic-design" className="inline-flex min-h-8 items-center text-sm font-semibold hover:text-cord">Compare all</Link>
          </div>
          <div className="rod-top">{designers.map((s) => <SupplierCard key={s.id} s={s} />)}</div>
          <p className="mt-3 text-xs text-ink-3">Sample listings.</p>
        </section>
      </div>
    </div>
  );
}
