import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Rewards & Tokens",
  description: "Earn and redeem LisBran tokens for merchandise and vouchers.",
  path: "/rewards",
});

export default function RewardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
