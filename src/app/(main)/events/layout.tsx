import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description: "Upcoming events and brand activations across Kenya where LisBran vendors can offer their services.",
  path: "/events",
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
