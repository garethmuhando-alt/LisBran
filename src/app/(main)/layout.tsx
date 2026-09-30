import BottomNav from "@/components/BottomNav";
import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <div className="flex-1 pb-20 lg:pb-0">
        {children}
        <SiteFooter />
      </div>
      <BottomNav />
    </>
  );
}
