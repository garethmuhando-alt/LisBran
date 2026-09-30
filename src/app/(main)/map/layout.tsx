import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Kenya Events Map",
  description: "An interactive map of events and marketing vendors across Kenya.",
  path: "/map",
});

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
