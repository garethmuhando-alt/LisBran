"use client";

import { budgetLabel, cities, services, urgencyLabel, type Budget, type Job, type Urgency } from "@/lib/catalog";

type Props = { job: Job; onChange: (job: Job) => void; layout?: "stack" | "row" };

const chip =
  "inline-flex min-h-9 items-center px-3 text-sm font-semibold border-[1.5px] border-rod-soft cursor-pointer select-none transition-colors hover:border-rod " +
  "peer-checked:bg-cord peer-checked:border-cord peer-checked:text-cord-ink peer-focus-visible:outline-2 peer-focus-visible:outline-cord peer-focus-visible:outline-offset-2";

function Choice<T extends string>({
  name, value, current, label, onPick,
}: { name: string; value: T; current: T; label: string; onPick: (v: T) => void }) {
  return (
    <label className="relative">
      <input
        type="radio"
        name={name}
        value={value}
        checked={current === value}
        onChange={() => onPick(value)}
        className="peer sr-only"
      />
      <span className={chip}>{label}</span>
    </label>
  );
}

export function JobControls({ job, onChange, layout = "stack" }: Props) {
  const set = (patch: Partial<Job>) => onChange({ ...job, ...patch });

  return (
    <div className={layout === "row" ? "grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.3fr)] gap-6 lg:gap-10 items-start" : "flex flex-col gap-5"}>
      <fieldset>
        <legend className="text-sm font-semibold text-ink-2 mb-2">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          <Choice name="service" value="any" current={job.service} label="Anything" onPick={(v) => set({ service: v })} />
          {services.map((s) => (
            <Choice key={s.slug} name="service" value={s.slug} current={job.service} label={s.name} onPick={(v) => set({ service: v })} />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-ink-2 mb-2">How soon?</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(urgencyLabel) as Urgency[]).map((u) => (
            <Choice key={u} name="urgency" value={u} current={job.urgency} label={urgencyLabel[u]} onPick={(v) => set({ urgency: v })} />
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-5">
        <div>
          <label htmlFor="job-city" className="block text-sm font-semibold text-ink-2 mb-2">Where?</label>
          <select
            id="job-city"
            value={job.city}
            onChange={(e) => set({ city: e.target.value })}
            className="min-h-9 w-full bg-ground border-[1.5px] border-rod-soft hover:border-rod px-2 text-sm font-semibold text-ink"
          >
            <option value="any">Anywhere in Kenya</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-ink-2 mb-2">Budget</legend>
          <div className="flex flex-wrap gap-2">
            <Choice name="budget" value="any" current={job.budget} label="Any" onPick={(v) => set({ budget: v })} />
            {(Object.keys(budgetLabel) as Budget[]).map((b) => (
              <Choice key={b} name="budget" value={b} current={job.budget} label={budgetLabel[b]} onPick={(v) => set({ budget: v })} />
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
