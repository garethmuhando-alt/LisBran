import { Bell, Bookmark, CalendarDays, Grid2x2, Home, User, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; match: string[] };

// Section links in the desktop top bar. `match` lists path prefixes that
// belong to the section, so detail pages keep their parent highlighted.
export const primaryNav: NavItem[] = [
  { href: "/home", label: "Home", match: ["/home"] },
  { href: "/categories", label: "Services", match: ["/categories", "/search", "/services", "/supplier"] },
  { href: "/events", label: "Events", match: ["/events", "/map"] },
  { href: "/trends", label: "Trends", match: ["/trends"] },
  { href: "/contact", label: "Contact", match: ["/contact", "/support"] },
];

export type TabItem = NavItem & { icon: LucideIcon };

// Mobile bottom tab bar — five destinations, always labelled.
export const tabNav: TabItem[] = [
  { href: "/home", label: "Home", icon: Home, match: ["/home"] },
  { href: "/categories", label: "Services", icon: Grid2x2, match: ["/categories", "/search", "/services", "/supplier"] },
  { href: "/events", label: "Events", icon: CalendarDays, match: ["/events", "/map"] },
  { href: "/saved", label: "Saved", icon: Bookmark, match: ["/saved"] },
  { href: "/profile", label: "Account", icon: User, match: ["/profile", "/rewards", "/surveys", "/seller", "/notifications"] },
];

export const utilityNav = [
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Account", icon: User },
] as const;

export const isActive = (pathname: string, match: string[]) =>
  match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
