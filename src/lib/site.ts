// Single source of truth for brand, SEO and legal details.
// Set NEXT_PUBLIC_SITE_URL in each environment (e.g. https://lisbranmarketing.com).
export const siteConfig = {
  name: "LisBran",
  legalName: "LisBran Marketing",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://lisbranmarketing.com").replace(/\/$/, ""),
  title: "LisBran — Kenya's Marketing & Creative Services Marketplace",
  description:
    "Find and hire trusted graphic designers, marketers, printers, photographers and influencers across Kenya. LisBran connects brands with verified creative and marketing vendors.",
  keywords: [
    "LisBran",
    "marketing agency Kenya",
    "graphic design Nairobi",
    "branding and printing Kenya",
    "marketing consultancy",
    "influencer marketing Kenya",
    "brand activation",
    "creative marketplace",
    "hire designers Kenya",
  ],
  locale: "en_KE",
  email: "info@lisbranmarketing.com",
  phone: "+254710147123",
  phoneDisplay: "0710 147 123",
  address: { locality: "Nairobi", country: "KE" },
  social: {
    instagram: "https://instagram.com/lisbranmarketing",
    linkedin: "https://linkedin.com/company/lisbranmarketing",
    whatsapp: "https://wa.me/254710147123",
  },
  legalUpdated: "30 September 2026",
} as const;

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
