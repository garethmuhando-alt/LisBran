import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "My Account",
  description: "Manage your LisBran account.",
  path: "/profile", index: false,
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
