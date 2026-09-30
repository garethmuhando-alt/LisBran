import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Find Marketing & Creative Services in Kenya",
  description: "Browse top-ranked designers, marketers, printers, photographers and influencers across Nairobi, Mombasa, Kisumu, Nakuru and Kiambu.",
  path: "/home",
});

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
