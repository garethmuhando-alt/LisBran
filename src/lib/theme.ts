export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "lisbran_theme";
export const LIGHT_CLASS = "theme-light";

// Runs in <head> before first paint so the page never flashes the wrong theme.
// Kept dependency-free and wrapped in try/catch (storage can throw in private mode).
export const themeInitScript = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}");if(p!=="light"&&p!=="dark")p="system";var l=p==="light"||(p==="system"&&window.matchMedia("(prefers-color-scheme: light)").matches);var r=document.documentElement;r.classList.toggle("${LIGHT_CLASS}",l);r.dataset.theme=l?"light":"dark";r.style.colorScheme=l?"light":"dark";}catch(e){}})();`;
