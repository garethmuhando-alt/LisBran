import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

import { supplierById, suppliers } from "@/lib/catalog";

const humanize = (slug: string) => supplierById(slug)?.name ?? slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const name = humanize(id);
  return pageMetadata({
    title: `${name} — Vendor Profile`,
    description: `View ${name}'s portfolio, services, ratings and contact details on LisBran.`,
    path: `/supplier/${id}`,
    // Sample listings stay out of search results until real vendors are onboarded.
    index: false,
  });
}

export function generateStaticParams() {
  return suppliers.map((s) => ({ id: s.id }));
}

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
