import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Graphic Design Services",
  description: "Hire vetted graphic designers in Kenya for logos, brand identity, social media creatives and print design.",
  path: "/services/graphic-design",
});

export default function ServicesGraphicDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
