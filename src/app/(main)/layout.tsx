import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
import ThemeProvider from "@/components/ThemeProvider";

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
      <div
        className="flex-1 pb-24 relative z-10 text-white min-h-screen"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch' as never,
          overscrollBehavior: 'none',
          touchAction: 'pan-y',
        }}
      >
        {children}
      </div>
      <FloatingSuggestionBox />
      <BottomNav />
    </ThemeProvider>
  );
}
