import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

// Child segments replace (not merge) the parent's openGraph/twitter objects, so
// every page builds complete ones here. The OG image comes from
// app/opengraph-image.jpg, which Next applies to all child routes.
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description },
    ...(index ? {} : { robots: { index: false, follow: false } }),
  };
}
