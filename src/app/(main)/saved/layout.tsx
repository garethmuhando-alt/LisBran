import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Saved",
  description: "Your saved vendors and services.",
  path: "/saved", index: false,
});

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
