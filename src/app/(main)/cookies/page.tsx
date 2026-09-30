import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "What cookies and browser storage LisBran uses and how to control them.",
  path: "/cookies",
});

const storage = [
  { name: "lisbran_theme", purpose: "Remembers whether you chose light, dark or system theme.", duration: "Until cleared" },
  { name: "lisbran_location", purpose: "Remembers the city you selected on the home page.", duration: "Until cleared" },
  { name: "lisbran_cookie_notice", purpose: "Remembers that you have seen the cookie notice.", duration: "Until cleared" },
  { name: "seller_* / saved items", purpose: "Keeps your onboarding progress and saved vendors on this device.", duration: "Until cleared" },
];

const sections: LegalSection[] = [
  {
    id: "what",
    title: "What we use",
    body: (
      <>
        <p>
          LisBran uses only <strong>strictly necessary</strong> browser storage (local storage) to make the site work as you expect. We do not use
          advertising cookies, and we do not currently run analytics or tracking scripts.
        </p>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-rod-soft text-ink-2">
                <th className="py-2 px-1 font-bold">Name</th>
                <th className="py-2 px-1 font-bold">Purpose</th>
                <th className="py-2 px-1 font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {storage.map((row) => (
                <tr key={row.name} className="border-b border-rod-soft align-top">
                  <td className="py-2 px-1 font-mono text-ink">{row.name}</td>
                  <td className="py-2 px-1">{row.purpose}</td>
                  <td className="py-2 px-1 whitespace-nowrap">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services",
    body: (
      <p>
        When you open the <Link href="/map">Events Map</Link>, the page loads Google Maps, which may set its own cookies and receive your IP
        address under Google&apos;s privacy policy. Links to WhatsApp, Instagram and LinkedIn take you to those services, which apply their own policies.
      </p>
    ),
  },
  {
    id: "control",
    title: "Managing storage",
    body: (
      <p>
        You can clear or block local storage and cookies in your browser settings. If you do, preferences such as your theme and city will reset,
        but the site will still work.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        If we add analytics or marketing tools we will update this policy and ask for your consent before they run. Questions? Email{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro={<p>This policy explains the cookies and similar technologies used on LisBran. See also our <Link href="/privacy" className="underline hover:text-cord">Privacy Policy</Link>.</p>}
      sections={sections}
    />
  );
}
