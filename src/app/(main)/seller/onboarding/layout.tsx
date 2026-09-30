import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Become a Seller",
  description: "List your agency, freelance or marketing services on LisBran and reach buyers across Kenya.",
  path: "/seller/onboarding",
});

export default function SellerOnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
