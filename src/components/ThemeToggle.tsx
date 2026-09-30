"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import type { ThemePreference } from "@/lib/theme";

const ORDER: ThemePreference[] = ["system", "light", "dark"];
const LABELS: Record<ThemePreference, string> = {
  system: "System theme",
  light: "Day theme",
  dark: "Night theme",
};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${LABELS[theme]} — switch to ${LABELS[next].toLowerCase()}`}
      title={`${LABELS[theme]} (click for ${LABELS[next].toLowerCase()})`}
      className={`inline-flex w-9 min-h-9 items-center justify-center text-ink-2 hover:text-ink transition-colors ${className}`}
    >
      <Icon size={18} strokeWidth={1.75} />
    </button>
  );
}
