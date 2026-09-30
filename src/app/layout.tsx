import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { CookieNotice } from "@/components/CookieNotice";
import { themeInitScript } from "@/lib/theme";
import { absoluteUrl, siteConfig } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "business",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: { capable: true, title: siteConfig.name, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e6e1" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      logo: absoluteUrl("/icons/icon-512.png"),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressCountry: siteConfig.address.country,
      },
      sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en-KE",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The head script sets the theme class on <html> before hydration.
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ground text-ink overflow-x-hidden">
        <a href="#content" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <main id="content" className="flex-1 relative w-full min-h-screen">
            {children}
          </main>
          <CookieNotice />
        </ThemeProvider>
      </body>
    </html>
  );
}
