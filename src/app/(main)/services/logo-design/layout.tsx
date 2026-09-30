import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Logo Design",
  description: "Professional logo design from verified Kenyan designers — 2D, 3D and animated logos.",
  path: "/services/logo-design",
});

export default function ServicesLogoDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
