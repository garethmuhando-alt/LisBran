"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { VideoMasthead } from "@/components/ui/VideoMasthead";

// The one Persuade moment: the brand film owns the whole screen, with the
// two ways in laid over it.
export default function SplashScreen() {
  return (
    <div className="relative min-h-[100svh] bg-[#13181e]">
      <header className="on-dark theme-preserve absolute inset-x-0 top-0 z-20">
        <div className="wrap h-16 flex items-center justify-between">
          <Link href="/home" aria-label="LisBran home" className="flex items-center gap-2">
            <Logo size={24} />
            <span className="font-display text-2xl leading-none">LisBran</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/home" className="hidden sm:inline-flex text-sm font-semibold text-ink-2 hover:text-ink px-2">Browse the marketplace</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <VideoMasthead underNav={false} controlClassName="top-3 right-3 wide:top-20 wide:right-8">
        <div className="grid grid-cols-12 gap-y-6 md:gap-x-[2.5vw] items-end">
          <div className="col-span-12 md:col-span-6">
            <h1 className="font-display text-[clamp(2.2rem,4.4vw,4.25rem)]">
              Your marketing needs, all in one place.
            </h1>
            <p className="mt-3 text-ink-2 max-w-[48ch]">
              Kenya&apos;s marketplace for printers, designers, agencies, influencers and activation crews.
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/home" className="group flex min-h-16 items-center p-4 bg-cord text-cord-ink hover:brightness-110 transition">
              <span className="flex w-full items-center justify-between gap-3 font-display text-2xl">
                Find a supplier <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/seller/onboarding" className="group flex min-h-16 items-center p-4 border-[1.5px] border-rod bg-[#121212]/40 hover:bg-ink hover:text-ground transition-colors">
              <span className="flex w-full items-center justify-between gap-3 font-display text-2xl">
                List your services <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <p className="col-span-12 text-xs text-ink-3 border-t border-rod-soft pt-3">
            By continuing you agree to our <Link href="/terms" className="underline hover:text-ink">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.
          </p>
        </div>
      </VideoMasthead>
    </div>
  );
}
