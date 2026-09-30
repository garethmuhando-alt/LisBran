import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site";

const faqs: { group: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    group: "Buying",
    items: [
      { q: "How do I find a supplier?", a: <>Start on <Link href="/home">Home</Link>: pick the service, how soon you need it, where and your budget. Suppliers who can take the job are highlighted. Open a profile to see their work and prices.</> },
      { q: "How do I contact a supplier?", a: "Every profile has WhatsApp, phone and email buttons. You reach the supplier directly; LisBran doesn't sit in the conversation." },
      { q: "How do payments work?", a: "For now you agree price and payment directly with the supplier. M-Pesa deposits through LisBran are planned; we'll announce them when they're live." },
      { q: "What does 'Overnight' mean?", a: "The supplier says they can usually turn work around by the next morning. Rush work often costs more, so confirm the price before you commit." },
    ],
  },
  {
    group: "Selling",
    items: [
      { q: "How do I list my services?", a: <>Go to <Link href="/seller/onboarding">Sell on LisBran</Link> and complete your profile. Our team reviews every new supplier before they&apos;re marked verified.</> },
      { q: "What makes a strong profile?", a: "At least three sharp images or a short video of real work, honest prices and turnaround, and a bio written for a marketing manager with a deadline. Link your Instagram so buyers can check your reputation." },
      { q: "Which files can I upload?", a: "Images in PNG, JPEG or WebP and videos in MP4 or MOV. Square (1:1) or widescreen (16:9) crops look best." },
    ],
  },
  {
    group: "Your account",
    items: [
      { q: "Where are my saved suppliers?", a: <>Under <Link href="/saved">Saved</Link>. They&apos;re stored on this device until accounts open.</> },
      { q: "How do I switch between day and night themes?", a: <>Use the theme button in the top bar, or choose under <Link href="/profile">Account</Link>. System follows your phone or computer.</> },
      { q: "How is my data handled?", a: <>See our <Link href="/privacy">Privacy Policy</Link>. You can ask us to access, correct or delete your data at any time.</> },
    ],
  },
];

export default function SupportPage() {
  return (
    <div>
      <PageHeader title="Help" description="Answers for buyers and suppliers. Can't find yours? Ask the team." />
      <div className="wrap pb-16 grid grid-cols-12 gap-y-10 lg:gap-x-[2.5vw]">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
          {faqs.map((g) => (
            <section key={g.group} aria-labelledby={`faq-${g.group}`}>
              <h2 id={`faq-${g.group}`} className="font-display text-2xl mb-2">{g.group}</h2>
              <ul className="rod-top">
                {g.items.map((f) => (
                  <li key={f.q} className="border-b border-rod-soft">
                    <details className="group">
                      <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-semibold [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="pb-5 text-ink-2 leading-relaxed max-w-[65ch] [&_a]:underline [&_a]:text-ink [&_a:hover]:text-cord">{f.a}</div>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-20 border-[1.5px] border-rod p-5">
            <h2 className="font-display text-2xl">Still stuck?</h2>
            <p className="mt-2 text-ink-2">Message us on WhatsApp or email {siteConfig.email}.</p>
            <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center gap-2 px-5 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink transition-colors">
              Contact the team <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
