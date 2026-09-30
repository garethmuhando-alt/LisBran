import { ArrowUpRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site";

const surveys = [
  { title: "Supplier quality", desc: "Tell us about a recent job with a supplier you found on LisBran.", mins: 3, tokens: 150 },
  { title: "Finding your way", desc: "Is it easy to find the right service and contact a supplier?", mins: 2, tokens: 50 },
  { title: "Where next", desc: "Which counties should LisBran add suppliers in next?", mins: 1, tokens: 100 },
];

export default function SurveysPage() {
  return (
    <div>
      <PageHeader title="Surveys" parent={{ href: "/profile", label: "Account" }} description="Short questions that shape what LisBran builds next." />
      <div className="wrap pb-16">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rod border-[1.5px] border-rod">
        {surveys.map((s) => (
          <li key={s.title} className="bg-ground">
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Survey: ${s.title}`)}&body=${encodeURIComponent(s.desc + "\n\n")}`}
              className="group flex h-full flex-col gap-6 p-5 hover:bg-surface transition-colors"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="font-display text-2xl">{s.title}</span>
                <ArrowUpRight size={18} className="shrink-0 group-hover:text-cord" />
              </span>
              <span className="text-ink-2">{s.desc}</span>
              <span className="mt-auto flex justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 text-ink-3"><Clock size={14} /> {s.mins} min</span>
                <span className="font-mono tabular">+{s.tokens} tokens</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
