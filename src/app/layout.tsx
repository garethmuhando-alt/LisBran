import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LisBran",
  description: "LisBran Premium Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-purple-500/30">
        <main className="flex-1 relative w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl mx-auto min-h-screen bg-[#141417] overflow-x-hidden shadow-2xl border-x border-white/5">
          {children}
        </main>
      </body>
    </html>
  );
}
