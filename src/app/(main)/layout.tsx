import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
import ThemeProvider from "@/components/ThemeProvider";
import TopNav from "@/components/TopNav";

// Lazy-load heavy components — downloaded only when first rendered
const AnimatedBackground = dynamic(
  () => import("@/components/ui/AnimatedBackground").then(m => ({ default: m.AnimatedBackground }))
);
const FloatingSuggestionBox = dynamic(
  () => import("@/components/ui/FloatingSuggestionBox").then(m => ({ default: m.FloatingSuggestionBox }))
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      {/* Sticky top navigation — visible on every page */}
      <TopNav />
      <div className="flex-1 relative z-10 text-white pb-24">
        {children}
      </div>
      <FloatingSuggestionBox />
      <BottomNav />
    </ThemeProvider>
  );
}
