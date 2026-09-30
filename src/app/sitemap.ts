import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/lib/catalog";

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/home", priority: 1, changeFrequency: "daily" },
  { path: "/categories", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services/graphic-design", priority: 0.8, changeFrequency: "weekly" },
  { path: "/services/logo-design", priority: 0.8, changeFrequency: "weekly" },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" },
  { path: "/map", priority: 0.6, changeFrequency: "weekly" },
  { path: "/trends", priority: 0.6, changeFrequency: "weekly" },
  { path: "/seller/onboarding", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/support", priority: 0.4, changeFrequency: "monthly" },
  { path: "/rewards", priority: 0.3, changeFrequency: "monthly" },
  { path: "/surveys", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

// Supplier profiles are sample data for now, so they are left out of the sitemap.
const categories = ["all", ...services.map((s) => s.slug)];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), lastModified, changeFrequency: r.changeFrequency, priority: r.priority })),
    ...categories.map((c) => ({ url: absoluteUrl(`/search/${c}`), lastModified, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
