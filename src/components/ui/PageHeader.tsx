import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// One header pattern for every inner page: an optional parent link (the real
// parent, not always Home), the title on a rod, and a short description.
// Service pages pass `art` (the owner's service icon): at the right from 640px,
// above the title on phones so long service names keep the full width.
export function PageHeader({
  title,
  description,
  parent,
  art,
  children,
}: {
  title: string;
  art?: string;
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
        <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.75rem)]">{title}</h1>
          {description && <p className="mt-2 text-ink-2 max-w-[60ch]">{description}</p>}
        </div>
        {children}
        {art && <Image src={art} alt="" width={128} height={128} sizes="128px" priority className="shrink-0 order-first sm:order-none w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32" />}
      </div>
    </header>
  );
}
