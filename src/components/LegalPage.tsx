import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalPage({ title, intro, sections }: { title: string; intro: React.ReactNode; sections: LegalSection[] }) {
  return (
    <article>
      <PageHeader title={title} description={<>Last updated <span className="font-mono tabular">{siteConfig.legalUpdated}</span></>} />
      <div className="wrap pb-16 grid grid-cols-12 gap-y-8 lg:gap-x-[2.5vw]">
        <nav aria-label="On this page" className="col-span-12 lg:col-span-3 lg:order-2">
          <div className="lg:sticky lg:top-20 text-sm">
            <p className="font-semibold mb-2">On this page</p>
            <ol className="flex flex-col gap-1.5 text-ink-2">
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="hover:text-ink hover:underline">{s.title}</a></li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="col-span-12 lg:col-span-8 lg:order-1 max-w-[70ch]">
          <div className="text-lg leading-relaxed mb-10">{intro}</div>
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-20 rod-top pt-3">
                <h2 className="font-display text-2xl mb-3">{s.title}</h2>
                <div className="leading-relaxed text-ink-2 space-y-3 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:underline [&_a]:text-ink [&_a:hover]:text-cord">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
