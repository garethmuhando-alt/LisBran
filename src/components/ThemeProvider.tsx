"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LIGHT_CLASS, THEME_STORAGE_KEY, type ResolvedTheme, type ThemePreference } from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const lightQuery = () => window.matchMedia("(prefers-color-scheme: light)");

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

function resolve(theme: ThemePreference): ResolvedTheme {
  if (theme === "system") return lightQuery().matches ? "light" : "dark";
  return theme;
}

function apply(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle(LIGHT_CLASS, resolved === "light");
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Server render assumes dark; the inline head script has already applied the
  // real theme to <html>, and this state catches up on mount.
  const [theme, setThemeState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    const initial = readPreference();
    const sync = (pref: ThemePreference) => {
      const resolved = resolve(pref);
      apply(resolved);
      setThemeState(pref);
      setResolvedTheme(resolved);
    };
    sync(initial);

    // Follow the OS setting live while on "system".
    const mq = lightQuery();
    const onSystemChange = () => {
      if (readPreference() === "system") sync("system");
    };
    // Keep multiple tabs in step.
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) sync(readPreference());
    };
    mq.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      mq.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setTheme = useCallback((next: ThemePreference) => {
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable — theme still applies for this page view.
    }
    const resolved = resolve(next);
    apply(resolved);
    setThemeState(next);
    setResolvedTheme(resolved);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
