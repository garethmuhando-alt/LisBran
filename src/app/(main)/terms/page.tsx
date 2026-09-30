import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of the LisBran marketplace by buyers and vendors.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About LisBran",
    body: (
      <p>
        LisBran is an online marketplace operated by {siteConfig.legalName} that helps businesses (&ldquo;Buyers&rdquo;) discover and contact
        independent providers of marketing, design, printing and related creative services (&ldquo;Vendors&rdquo;). By using the site you agree to these Terms.
        If you do not agree, please do not use LisBran.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and accounts",
    body: (
      <ul>
        <li>You must be at least 18 years old and able to enter a binding contract.</li>
        <li>You are responsible for the accuracy of the information you provide and for keeping your login details confidential.</li>
        <li>If you act for a business, you confirm you are authorised to bind it to these Terms.</li>
      </ul>
    ),
  },
  {
    id: "marketplace",
    title: "Our role as a marketplace",
    body: (
      <>
        <p>
          Contracts for services are made directly between Buyers and Vendors. LisBran is not a party to those contracts and does not employ
          Vendors. Unless we expressly say otherwise, we do not guarantee the quality, safety, legality or timely delivery of any Vendor&apos;s services.
        </p>
        <p>
          &ldquo;Verified&rdquo; badges mean a Vendor has passed our basic checks at the time of verification; they are not an endorsement or warranty.
          Ratings reflect user feedback and may change.
        </p>
      </>
    ),
  },
  {
    id: "vendors",
    title: "Vendor obligations",
    body: (
      <ul>
        <li>Describe your services, prices and turnaround times accurately and honour quotes you give.</li>
        <li>Hold any licences, permits and tax registrations (including KRA PIN) your business requires.</li>
        <li>Only upload portfolio work you created or have the right to show.</li>
        <li>Comply with the Consumer Protection Act, 2012, the Data Protection Act, 2019 and other applicable Kenyan law, including when handling Buyers&apos; data.</li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You must not:</p>
        <ul>
          <li>post false, misleading, defamatory, obscene or unlawful content;</li>
          <li>infringe anyone&apos;s intellectual property or privacy;</li>
          <li>harass, spam or defraud other users;</li>
          <li>scrape, reverse-engineer, overload or attempt to gain unauthorised access to the platform; or</li>
          <li>use LisBran for any purpose prohibited by the Computer Misuse and Cybercrimes Act, 2018.</li>
        </ul>
        <p>We may remove content or suspend accounts that breach these Terms.</p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments, rewards and tokens",
    body: (
      <p>
        Unless a checkout on LisBran states otherwise, payment for services is arranged directly between Buyer and Vendor. LisBran rewards and
        tokens have no cash value, cannot be transferred or exchanged for money, and may be changed or withdrawn with reasonable notice.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        The LisBran name, logo, intro video and site design belong to {siteConfig.legalName}. Vendors keep ownership of their content and grant
        LisBran a non-exclusive, royalty-free licence to display it on the platform and in LisBran promotion for as long as it is listed.
        Ownership of work delivered to a Buyer is governed by the agreement between that Buyer and Vendor.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers and limitation of liability",
    body: (
      <p>
        The platform is provided &ldquo;as is&rdquo;. To the extent permitted by Kenyan law, LisBran is not liable for indirect or consequential loss,
        or for disputes between Buyers and Vendors, and our total liability to you in connection with the platform is limited to KES 10,000 or the
        fees you paid to LisBran in the preceding 12 months, whichever is greater. Nothing in these Terms limits rights you have as a consumer that cannot be excluded by law.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: <p>Our <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookies">Cookie Policy</Link> explain how we handle personal data.</p>,
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: <p>You may close your account at any time. We may suspend or close accounts that breach these Terms or where required by law, and will give notice where reasonable.</p>,
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of Kenya. Please contact us first at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> so
        we can try to resolve any issue informally. Disputes that cannot be resolved within 30 days may be referred to the courts of Kenya.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: <p>We may update these Terms. Continued use after changes take effect means you accept the updated Terms; material changes will be announced on the site.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={<p>Please read these Terms carefully. They set out the rules for using LisBran as a Buyer or a Vendor.</p>}
      sections={sections}
    />
  );
}
