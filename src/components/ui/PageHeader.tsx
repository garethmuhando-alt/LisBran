import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// One header pattern for every inner page: an optional parent link (the real
// parent, not always Home), the title on a rod, and a short description.
export function PageHeader({
  title,
  description,
  parent,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  parent?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="wrap pt-6 md:pt-10 pb-6">
      {parent && (
        <Link href={parent.href} className="inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-ink-2 hover:text-ink mb-3">
          <ChevronLeft size={16} /> {parent.label}
        </Link>
      )}
      <div className="rod-bottom pb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.75rem)]">{title}</h1>
          {description && <p className="mt-2 text-ink-2 max-w-[60ch]">{description}</p>}
        </div>
        {children}
      </div>
    </header>
  );
}
