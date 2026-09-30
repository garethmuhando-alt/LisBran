import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Seller Dashboard",
  description: "Manage your LisBran vendor listing.",
  path: "/seller/dashboard", index: false,
});

export default function SellerDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
