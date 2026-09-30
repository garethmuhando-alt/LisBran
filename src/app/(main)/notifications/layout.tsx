import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Notifications",
  description: "Your LisBran notifications.",
  path: "/notifications", index: false,
});

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
