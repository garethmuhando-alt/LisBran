import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

import { serviceBySlug } from "@/lib/catalog";

const humanize = (slug: string) =>
  slug === "all" ? "All Services" : serviceBySlug(slug)?.name ?? slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const name = humanize(category);
  return pageMetadata({
    title: `${name} Vendors in Kenya`,
    description: `Compare and hire verified ${name.toLowerCase()} vendors on LisBran — ratings, portfolios and direct WhatsApp contact.`,
    path: `/search/${category}`,
  });
}

export function generateStaticParams() {
  return [
    "all", "graphic-design", "printing", "consultancy", "agencies", "influencer", "activations", "ambassadors", "dancers",
  ].map((category) => ({ category }));
}

export default function SearchCategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
