"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const styles = [
  { id: "minimalist", name: "Minimalist", note: "Clean marks, lots of space" },
  { id: "3d", name: "3D", note: "Depth, light and material" },
  { id: "vintage", name: "Vintage", note: "Badges, crests and old type" },
  { id: "signature", name: "Signature", note: "Hand-lettered wordmarks" },
];

const palettes = [
  { id: "monochrome", name: "Monochrome", swatch: ["#111111", "#6b6b6b", "#f2f2f2"] },
  { id: "warm", name: "Warm", swatch: ["#b3261e", "#e8772e", "#f6c453"] },
  { id: "cool", name: "Cool", swatch: ["#0b3d91", "#1f8a9e", "#b8d8e8"] },
  { id: "vibrant", name: "Vibrant", swatch: ["#e6007e", "#ffd400", "#00a3e0"] },
  { id: "earthy", name: "Earthy", swatch: ["#5b3a1e", "#8a9a3b", "#d9c49b"] },
];

const steps = ["Style", "Name", "Colours"] as const;

export default function LogoDesignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState("");
  const [brand, setBrand] = useState("");
  const [slogan, setSlogan] = useState("");
  const [colours, setColours] = useState<string[]>([]);

  const valid = step === 0 ? !!style : step === 1 ? brand.trim().length > 0 : colours.length > 0;
  const toggleColour = (id: string) =>
    { setColours((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 2 ? [...c, id] : c)); };

  const next = () => {
    if (!valid) return;
    if (step < steps.length - 1) setStep(step + 1);
    else router.push(`/search/graphic-design?style=${style}&colors=${colours.join(",")}`);
  };

  return (
    <div>
      <PageHeader
        title="Logo design"
        parent={{ href: "/services/graphic-design", label: "Graphic design" }}
        description="Three quick choices and we'll show designers who work in that style."
      />

      <div className="wrap pb-16 grid grid-cols-12 gap-y-8 lg:gap-x-[2.5vw]">
        <ol className="col-span-12 lg:col-span-3 flex flex-wrap lg:flex-col gap-x-4 lg:gap-0" aria-label="Steps">
          {steps.map((label, i) => (
            <li key={label} className="flex-1 min-w-[6rem] lg:border-b lg:border-rod-soft">
              <button
                type="button"
                disabled={i > step}
                onClick={() => { setStep(i); }}
                aria-current={i === step ? "step" : undefined}
                className={`w-full flex items-center gap-3 py-2 lg:py-3 text-left text-sm font-semibold border-t-[1.5px] disabled:opacity-50 ${i <= step ? "border-rod" : "border-rod-soft text-ink-3"}`}
              >
                <span aria-hidden className={`w-2.5 h-2.5 shrink-0 ${i === step ? "bg-cord" : i < step ? "bg-ink" : "border-[1.5px] border-rod-soft"}`} />
                  <span className="font-mono tabular text-ink-3">{i + 1}</span> {label}
                {i < step && <Check size={14} className="ml-auto" aria-label="done" />}
              </button>
            </li>
          ))}
        </ol>

        <div className="col-span-12 lg:col-span-9 max-w-3xl">
          {step === 0 && (
            <fieldset>
              <legend className="font-display text-3xl mb-4">Which style fits your brand?</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rod border-[1.5px] border-rod">
                {styles.map((s) => (
                  <label key={s.id} className="relative bg-ground cursor-pointer">
                    <input type="radio" name="style" value={s.id} checked={style === s.id} onChange={() => { setStyle(s.id); }} className="peer sr-only" />
                    <span className="block p-5 peer-checked:bg-cord peer-checked:text-cord-ink peer-focus-visible:outline-2 peer-focus-visible:outline-cord">
                      <span className="block font-display text-2xl">{s.name}</span>
                      <span className="block text-sm opacity-80 mt-1">{s.note}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-3xl">What should the logo say?</h2>
              <div>
                <label htmlFor="brand" className="block text-sm font-semibold text-ink-2 mb-1.5">Brand name</label>
                <input id="brand" value={brand} onChange={(e) => { setBrand(e.target.value); }} autoComplete="organization" className="min-h-12 w-full bg-surface border-[1.5px] border-rod px-3 text-lg focus:outline-none focus:border-cord" />
              </div>
              <div>
                <label htmlFor="slogan" className="block text-sm font-semibold text-ink-2 mb-1.5">Slogan <span className="font-normal text-ink-3">(optional)</span></label>
                <input id="slogan" value={slogan} onChange={(e) => { setSlogan(e.target.value); }} className="min-h-12 w-full bg-surface border-[1.5px] border-rod px-3 focus:outline-none focus:border-cord" />
              </div>
            </div>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="font-display text-3xl mb-1">Pick up to two palettes</legend>
              <p className="text-ink-2 mb-4"><span className="font-mono tabular">{colours.length}</span> of 2 chosen</p>
              <div className="flex flex-col rod-top">
                {palettes.map((p) => {
                  const on = colours.includes(p.id);
                  return (
                    <label key={p.id} className="flex items-center gap-4 py-3 border-b border-rod-soft cursor-pointer">
                      <input type="checkbox" checked={on} onChange={() => { toggleColour(p.id); }} disabled={!on && colours.length >= 2} className="w-5 h-5" />
                      <span className="flex h-8 border-[1.5px] border-rod" aria-hidden>
                        {p.swatch.map((c) => <span key={c} className="w-8 h-full" style={{ background: c }} />)}
                      </span>
                      <span className="font-semibold">{p.name}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex items-center gap-3">
            {step > 0 && (
              <button type="button" onClick={() => { setStep(step - 1); }} className="min-h-12 px-5 inline-flex items-center gap-2 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground">
                <ArrowLeft size={18} /> Back
              </button>
            )}
            <button type="button" onClick={next} disabled={!valid} className="min-h-12 px-6 inline-flex items-center gap-2 bg-cord text-cord-ink font-bold hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none">
              {step < steps.length - 1 ? "Continue" : "Show designers"} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
