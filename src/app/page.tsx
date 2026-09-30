import type { Metadata } from "next";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return <SplashScreen />;
}
