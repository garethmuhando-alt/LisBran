export function generateStaticParams() {
  return [
    { category: "graphic-design" },
    { category: "influencer" },
    { category: "events" },
    { category: "printing" },
    { category: "music" },
    { category: "photography" },
    { category: "all" }
  ];
}

export default function SearchCategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
