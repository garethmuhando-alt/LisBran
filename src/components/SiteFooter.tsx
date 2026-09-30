import Link from "next/link";
import { services } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";

const company = [
  { href: "/seller/onboarding", label: "Sell on LisBran" },
  { href: "/events", label: "Events" },
  { href: "/trends", label: "Trends" },
  { href: "/support", label: "Help" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
];

export default function SiteFooter() {
  return (
    <footer className="rod-top mt-4">
      <div className="wrap py-10 grid grid-cols-2 md:grid-cols-12 gap-8 text-sm">
        <div className="col-span-2 md:col-span-4">
          <p className="font-display text-3xl">LisBran</p>
          <p className="mt-2 text-ink-2 max-w-[36ch]">The agency of marketing agencies. Nairobi, Kenya.</p>
          <p className="mt-4 flex flex-col gap-1">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-7 items-center break-anywhere hover:text-cord">{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex min-h-7 items-center font-mono tabular hover:text-cord">{siteConfig.phoneDisplay}</a>
          </p>
        </div>
        <nav aria-label="Services" className="md:col-span-3">
          <p className="font-semibold mb-3">Services</p>
          <ul className="flex flex-col gap-0.5 text-ink-2">
            {services.map((s) => <li key={s.slug}><Link href={s.href} className="inline-flex min-h-7 items-center hover:text-ink">{s.name}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Company" className="md:col-span-2">
          <p className="font-semibold mb-3">LisBran</p>
          <ul className="flex flex-col gap-0.5 text-ink-2">
            {company.map((l) => <li key={l.href}><Link href={l.href} className="inline-flex min-h-7 items-center hover:text-ink">{l.label}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Legal" className="md:col-span-3">
          <p className="font-semibold mb-3">Legal</p>
          <ul className="flex flex-col gap-0.5 text-ink-2">
            {legal.map((l) => <li key={l.href}><Link href={l.href} className="inline-flex min-h-7 items-center hover:text-ink">{l.label}</Link></li>)}
            <li><a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-7 items-center hover:text-ink">Instagram</a></li>
            <li><a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-7 items-center hover:text-ink">LinkedIn</a></li>
          </ul>
        </nav>
      </div>
      <div className="wrap pb-8 text-xs text-ink-3 flex flex-wrap justify-between gap-2">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}</p>
        <p>LisBran connects buyers with independent suppliers, who provide services under their own terms.</p>
      </div>
    </footer>
  );
}
