import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Earn With Surveys",
  description: "Share feedback with LisBran and earn tokens.",
  path: "/surveys",
});

export default function SurveysLayout({ children }: { children: React.ReactNode }) {
  return children;
}
