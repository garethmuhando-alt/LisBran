export function generateStaticParams() {
  return [
    { id: "personal-designs" },
    { id: "ht-marketing" },
    { id: "linqia" },
    { id: "sp-studio" },
    { id: "verified-pro" },
    { id: "neon-gravity" },
    { id: "sp-design-services" },
    { id: "a" }, { id: "b" }, { id: "c" } // Edge fallbacks
  ];
}

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
