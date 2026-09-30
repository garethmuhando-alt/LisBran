import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Marketing Trends",
  description: "The latest marketing and branding trends to inspire your next campaign in Kenya.",
  path: "/trends",
});

export default function TrendsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
