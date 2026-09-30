import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site";

const channels = [
  { label: "Email", value: siteConfig.email, note: "We reply within one working day.", href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "Phone", value: siteConfig.phoneDisplay, note: "Weekdays, 8:00 to 18:00.", href: `tel:${siteConfig.phone}`, icon: Phone, mono: true },
  { label: "WhatsApp", value: "+254 710 147 123", note: "The fastest way to reach us.", href: `${siteConfig.social.whatsapp}?text=${encodeURIComponent("Hi LisBran team, I need help with")}`, icon: MessageCircle, mono: true, external: true },
];

const social = [
  { label: "Instagram", value: "@lisbranmarketing", href: siteConfig.social.instagram },
  { label: "LinkedIn", value: "LisBran Marketing", href: siteConfig.social.linkedin },
];

export default function ContactPage() {
  return (
    <div>
      <PageHeader title="Contact" description="Talk to the LisBran team. Need a supplier we don't list yet? Tell us the job and we'll find one." />
      <div className="wrap pb-16 grid grid-cols-12 gap-y-10 lg:gap-x-[2.5vw]">
        <ul className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-px bg-rod border-[1.5px] border-rod">
          {channels.map(({ label, value, note, href, icon: Icon, mono, external }) => (
            <li key={label} className="bg-ground">
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex h-full flex-col gap-6 p-5 hover:bg-surface transition-colors">
                <span className="flex items-center justify-between">
                  <Icon size={22} strokeWidth={1.75} />
                  <ArrowUpRight size={18} className="text-ink-3 group-hover:text-cord transition-colors" />
                </span>
                <span>
                  <span className="block text-sm text-ink-3">{label}</span>
                  <span className={`block mt-1 text-base font-semibold [overflow-wrap:anywhere] ${mono ? "font-mono tabular" : ""}`}>{value}</span>
                  <span className="block mt-2 text-sm text-ink-2">{note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="col-span-12 lg:col-span-4">
          <h2 className="font-semibold mb-2">Follow LisBran</h2>
          <ul className="rod-top">
            {social.map((s) => (
              <li key={s.label} className="border-b border-rod-soft">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0 break-anywhere"><span className="text-ink-3 text-sm mr-3">{s.label}</span>{s.value}</span>
                  <ArrowUpRight size={16} className="group-hover:text-cord" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-2">{siteConfig.legalName}, {siteConfig.address.locality}, Kenya.</p>
        </div>
      </div>
    </div>
  );
}
