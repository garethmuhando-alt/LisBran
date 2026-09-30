"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { useTheme } from "@/components/ThemeProvider";
import type { ThemePreference } from "@/lib/theme";

const appearance: { value: ThemePreference; label: string; note: string }[] = [
  { value: "system", label: "System", note: "Follow this device" },
  { value: "light", label: "Day", note: "Concrete and ink" },
  { value: "dark", label: "Night", note: "Carbon and concrete" },
];

const links = [
  { href: "/seller/onboarding", title: "Sell on LisBran", note: "List your print shop, studio, agency, crew or creator profile." },
  { href: "/seller/dashboard", title: "Seller dashboard", note: "Enquiries, profile views and your listing." },
  { href: "/rewards", title: "Rewards and tokens", note: "Redeem points for merchandise and vouchers." },
  { href: "/surveys", title: "Surveys", note: "Share feedback and earn tokens." },
  { href: "/support", title: "Help", note: "Answers about buying, selling and your account." },
  { href: "/contact", title: "Contact the team", note: "Email, phone or WhatsApp." },
];

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [notice, setNotice] = useState("");

  return (
    <div>
      <PageHeader title="Account" description="Sign up to save suppliers across devices, message suppliers and get quotes." />

      <div className="wrap pb-16 grid grid-cols-12 gap-y-12 lg:gap-x-[2.5vw]">
        <section aria-labelledby="signup" className="col-span-12 lg:col-span-5">
          <h2 id="signup" className="font-display text-3xl">Create an account</h2>
          <form
            className="mt-5 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setNotice("Accounts are opening soon. We'll email you when yours is ready.");
            }}
          >
            <div>
              <label htmlFor="signup-email" className="block text-sm font-semibold text-ink-2 mb-1.5">Email address</label>
              <input id="signup-email" name="email" type="email" required autoComplete="email" className="min-h-11 w-full bg-surface border-[1.5px] border-rod px-3 text-ink focus:outline-none focus:border-cord" />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-semibold text-ink-2 mb-1.5">Password</label>
              <input id="signup-password" name="password" type="password" required minLength={8} autoComplete="new-password" aria-describedby="pw-hint" className="min-h-11 w-full bg-surface border-[1.5px] border-rod px-3 text-ink focus:outline-none focus:border-cord" />
              <p id="pw-hint" className="mt-1 text-xs text-ink-3">At least 8 characters.</p>
            </div>
            <label className="flex items-start gap-2 text-sm text-ink-2">
              <input type="checkbox" name="accept" required className="mt-0.5 w-5 h-5 shrink-0" />
              <span>
                I agree to the <Link href="/terms" className="underline text-ink hover:text-cord">Terms of Service</Link> and have read the{" "}
                <Link href="/privacy" className="underline text-ink hover:text-cord">Privacy Policy</Link>.
              </span>
            </label>
            <Button type="submit" className="self-start">Create account</Button>
            {notice && <p role="status" className="text-sm font-semibold">{notice}</p>}
          </form>
        </section>

        <div className="col-span-12 lg:col-span-7 flex flex-col gap-12">
          <nav aria-label="Account">
            <ul className="rod-top">
              {links.map((l) => (
                <li key={l.href} className="border-b border-rod-soft">
                  <Link href={l.href} className="group grid grid-cols-[1fr_auto] items-center gap-x-4 py-4">
                    <span className="font-display text-2xl group-hover:text-cord transition-colors">{l.title}</span>
                    <ArrowRight size={18} className="row-span-2 group-hover:text-cord" />
                    <span className="text-sm text-ink-2">{l.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <fieldset>
            <legend className="font-display text-2xl mb-3">Appearance</legend>
            <div className="grid grid-cols-3 gap-px bg-rod border-[1.5px] border-rod">
              {appearance.map((a) => (
                <label key={a.value} className="relative bg-ground cursor-pointer">
                  <input type="radio" name="appearance" value={a.value} checked={theme === a.value} onChange={() => setTheme(a.value)} className="peer sr-only" />
                  <span className="block p-4 peer-checked:bg-cord peer-checked:text-cord-ink peer-focus-visible:outline-2 peer-focus-visible:outline-cord">
                    <span className="block font-semibold">{a.label}</span>
                    <span className="block text-sm opacity-75">{a.note}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
