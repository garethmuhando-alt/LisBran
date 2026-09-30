import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Service Categories",
  description: "Explore every LisBran service category — graphic design, branding and printing, marketing consultancy, social media, activations, photography and more.",
  path: "/categories",
});

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
