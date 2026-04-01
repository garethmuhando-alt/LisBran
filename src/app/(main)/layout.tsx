import BottomNav from "@/components/BottomNav";
import { FloatingSuggestionBox } from "@/components/ui/FloatingSuggestionBox";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatedBackground />
      <div className="flex-1 overflow-y-auto pb-24 relative z-10 text-white min-h-screen">
        {children}
      </div>
      <FloatingSuggestionBox />
      <BottomNav />
    </>
  );
}
