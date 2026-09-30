import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Admin",
  description: "LisBran administration.",
  path: "/admin", index: false,
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
