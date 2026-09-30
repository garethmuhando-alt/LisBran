import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

import { ArrowRight } from "lucide-react";

export default function MarketingTrendsPage() {

  const trends = [
    {
      id: 1,
      title: "TikTok Commerce Acceleration",
      category: "Social Media",
      description: "In the Kenyan market, TikTok has evolved from just entertainment to a primary search engine and marketplace. Brands are shifting from highly polished ads to authentic, lo-fi creator content. Influencers in Nairobi are driving impulse purchases through live streams and direct-to-Mpesa conversions."
    },
    {
      id: 2,
      title: "Hyper-Local Influencer Campaigns",
      category: "Influencer Marketing",
      description: "Macro-influencers are losing trust. Brands are now partnering with 'nano-influencers' (1k - 10k followers) based in specific counties (e.g., Mombasa, Kisumu) who have deep community ties. This local trust often drives stronger engagement than national campaigns."
    },
    {
      id: 3,
      title: "AI-Generated Vernacular Content",
      category: "Content Strategy",
      description: "Generative AI is being used to rapidly A/B test ad copy across different local languages (Sheng, Swahili, Kikuyu). AI localized voice-overs and visually generated culturally relevant imagery are helping teams test more ideas for less."
    },
    {
      id: 4,
      title: "Experiential 'Phygital' Activations",
      category: "Events & Activation",
      description: "Post-pandemic, Kenyans crave physical experiences augmented by digital layers. Mall activations now feature AR filters, QR-code scavenger hunts, and instant digital rewards, merging physical brand presence with digital data capture."
    }
  ];

  return (
    <div>
      <PageHeader title="Marketing trends" description="What's working in Kenyan marketing right now, and who on LisBran can help you run it." />
      <div className="wrap pb-16 grid grid-cols-12 gap-y-10 lg:gap-x-[2.5vw]">
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-20">
            <p className="text-lg leading-relaxed text-ink-2 max-w-[40ch]">
              Four shifts we see in Kenyan campaigns this season. Each links to the suppliers on LisBran who run that kind of work.
            </p>
            <Link href="/categories" className="mt-6 inline-flex min-h-11 items-center gap-2 px-5 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground transition-colors">
              Browse services <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
        <ol className="col-span-12 lg:col-span-8 rod-top">
          {trends.map((t) => (
            <li key={t.id} className="border-b border-rod-soft py-6">
              <h2 className="font-display text-3xl">{t.title}</h2>
              <p className="mt-3 text-ink-2 leading-relaxed max-w-[65ch]">
                <span className="text-ink font-semibold">{t.category}.</span> {t.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <section className="wrap pb-16">
        <div className="border-[1.5px] border-rod p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">Ready to try one?</h2>
            <p className="text-ink-2 mt-1">Find the influencers, designers and activation crews who run these campaigns.</p>
          </div>
          <Link href="/categories" className="inline-flex min-h-12 items-center gap-2 px-6 bg-cord text-cord-ink font-bold hover:brightness-110 transition">
            Explore services <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
