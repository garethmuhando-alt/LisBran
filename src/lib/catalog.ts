// Services are the ten LisBran supplies artwork for (public/services/). Suppliers below are SAMPLE
// listings for demonstration until verified vendors are onboarded — every
// surface that shows them labels them as samples.

export type Urgency = "standard" | "24h" | "overnight";
export type Budget = "low" | "mid" | "premium";

export type Service = {
  slug: string;
  name: string;
  blurb: string;
  href: string;
  art?: string;
};

export const services: Service[] = [
  { slug: "graphic-design", name: "Creative design", blurb: "Logos, brand identity, social and print artwork.", href: "/services/graphic-design", art: "/services/creative-design.png" },
  { slug: "social-media", name: "Social media management", blurb: "Content, community and paid social for your brand's channels.", href: "/search/social-media", art: "/services/social-media-management.png" },
  { slug: "brand-strategy", name: "Brand strategy & positioning", blurb: "Positioning, naming and the brand platform every campaign builds on.", href: "/search/brand-strategy", art: "/services/brand-strategy-positioning.png" },
  { slug: "printing", name: "Branding & printing", blurb: "Flyers, banners, merchandise and overnight print runs.", href: "/search/printing", art: "/services/branding-printing.png" },
  { slug: "activations", name: "Brand activation", blurb: "Roadshows, sampling and launches, with brand ambassadors and dance crews.", href: "/search/activations", art: "/services/brand-activation.png" },
  { slug: "materials", name: "Marketing materials procurement", blurb: "Branded merchandise, point-of-sale and promotional materials, sourced at the right price.", href: "/search/materials", art: "/services/marketing-materials-procurement.png" },
  { slug: "3d-modelling", name: "3D modelling", blurb: "Product renders, packaging mock-ups and 3D animation.", href: "/search/3d-modelling", art: "/services/3d-modelling.png" },
  { slug: "photography", name: "Photography & videography", blurb: "Product, event and campaign shoots, edited and delivered.", href: "/search/photography", art: "/services/photography-videography.png" },
  { slug: "consultancy", name: "Sales & marketing consulting", blurb: "Campaign planning, sales strategy and agency support for busy teams.", href: "/search/consultancy", art: "/services/sales-marketing-consulting.png" },
  { slug: "influencer", name: "Influencer management", blurb: "Creators with audiences your brand wants to reach, managed end to end.", href: "/search/influencer", art: "/services/influencer-management.png" },
];

export const cities = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu"] as const;

export type Supplier = {
  id: string;
  name: string;
  service: string;
  city: (typeof cities)[number];
  turnaround: Urgency;
  budget: Budget;
  priceFrom: number;
  rating: number;
  reviews: number;
  verified: boolean;
  bio: string;
  phone: string;
  email: string;
};

export const suppliers: Supplier[] = [
  { id: "pete-barret", name: "Pete & Barret Designs", service: "graphic-design", city: "Nairobi", turnaround: "24h", budget: "premium", priceFrom: 15000, rating: 4.9, reviews: 450, verified: true, bio: "Brand identity and campaign artwork for consumer brands.", phone: "+254700000001", email: "hello@example.com" },
  { id: "sps", name: "SP Design Services", service: "graphic-design", city: "Nairobi", turnaround: "overnight", budget: "mid", priceFrom: 4500, rating: 4.6, reviews: 157, verified: true, bio: "Fast, reliable logo and social design, including last-minute requests.", phone: "+254700000002", email: "hello@example.com" },
  { id: "river-road-print", name: "River Road Print Works", service: "printing", city: "Nairobi", turnaround: "overnight", budget: "low", priceFrom: 2500, rating: 4.7, reviews: 312, verified: true, bio: "Digital and offset printing with overnight runs for flyers and banners.", phone: "+254700000003", email: "hello@example.com" },
  { id: "coast-press", name: "Coast Press", service: "printing", city: "Mombasa", turnaround: "24h", budget: "mid", priceFrom: 3000, rating: 4.5, reviews: 96, verified: true, bio: "Large-format print, branded merchandise and signage on the coast.", phone: "+254700000004", email: "hello@example.com" },
  { id: "ht-marketing", name: "H&T Marketing", service: "consultancy", city: "Nairobi", turnaround: "standard", budget: "premium", priceFrom: 40000, rating: 4.9, reviews: 64, verified: true, bio: "Campaign strategy and brand positioning for FMCG teams.", phone: "+254700000005", email: "hello@example.com" },
  { id: "lakeside-influence", name: "Lakeside Influence", service: "influencer", city: "Kisumu", turnaround: "standard", budget: "mid", priceFrom: 12000, rating: 4.8, reviews: 58, verified: true, bio: "A roster of Western Kenya creators for launches and campaigns.", phone: "+254700000006", email: "hello@example.com" },
  { id: "neon-gravity", name: "Neon Gravity Co.", service: "influencer", city: "Nairobi", turnaround: "24h", budget: "premium", priceFrom: 25000, rating: 5.0, reviews: 81, verified: false, bio: "Creator partnerships with 3D and motion content.", phone: "+254700000007", email: "hello@example.com" },
  { id: "kilele-activations", name: "Kilele Activations", service: "activations", city: "Nakuru", turnaround: "24h", budget: "mid", priceFrom: 35000, rating: 4.6, reviews: 41, verified: true, bio: "Roadshows, sampling and in-store activations in the Rift Valley.", phone: "+254700000008", email: "hello@example.com" },
  { id: "mtaa-ambassadors", name: "Mtaa Ambassadors", service: "activations", city: "Nairobi", turnaround: "overnight", budget: "low", priceFrom: 3500, rating: 4.4, reviews: 120, verified: true, bio: "Trained brand ambassadors available at short notice, per day.", phone: "+254700000009", email: "hello@example.com" },
  { id: "ngoma-motion", name: "Ngoma Motion Crew", service: "activations", city: "Mombasa", turnaround: "24h", budget: "mid", priceFrom: 20000, rating: 4.7, reviews: 37, verified: true, bio: "Dance crew for launches, activations and music-video shoots.", phone: "+254700000010", email: "hello@example.com" },
  { id: "sp-studio", name: "SP Studio", service: "brand-strategy", city: "Kiambu", turnaround: "standard", budget: "mid", priceFrom: 30000, rating: 4.7, reviews: 157, verified: true, bio: "A small studio for brand strategy, positioning and overflow campaign work.", phone: "+254700000011", email: "hello@example.com" },
  { id: "pixel-safari", name: "Pixel Safari Social", service: "social-media", city: "Nairobi", turnaround: "24h", budget: "mid", priceFrom: 18000, rating: 4.6, reviews: 74, verified: true, bio: "Monthly content and community management for consumer brands.", phone: "+254700000012", email: "hello@example.com" },
  { id: "sokoni-merch", name: "Sokoni Merchandise", service: "materials", city: "Nairobi", turnaround: "overnight", budget: "low", priceFrom: 5000, rating: 4.5, reviews: 132, verified: true, bio: "Branded T-shirts, caps, POS stands and giveaways, sourced and delivered fast.", phone: "+254700000013", email: "hello@example.com" },
  { id: "kipande-3d", name: "Kipande 3D", service: "3d-modelling", city: "Kiambu", turnaround: "standard", budget: "premium", priceFrom: 28000, rating: 4.8, reviews: 29, verified: true, bio: "Product renders and packaging mock-ups for launches and pitches.", phone: "+254700000014", email: "hello@example.com" },
  { id: "lens-lakeside", name: "Lens Lakeside Studio", service: "photography", city: "Kisumu", turnaround: "24h", budget: "mid", priceFrom: 15000, rating: 4.7, reviews: 88, verified: true, bio: "Event and product photography, with short-form video edits.", phone: "+254700000015", email: "hello@example.com" },
];

export const urgencyLabel: Record<Urgency, string> = {
  standard: "Standard",
  "24h": "24 hours",
  overnight: "Overnight",
};

export const budgetLabel: Record<Budget, string> = { low: "Low", mid: "Mid", premium: "Premium" };

const urgencyRank: Record<Urgency, number> = { standard: 0, "24h": 1, overnight: 2 };

export type Job = { service: string | "any"; city: string | "any"; urgency: Urgency; budget: Budget | "any" };

// A supplier can take a job when it offers the service, is in the city, and
// turns work around at least as fast as the job needs.
export function canTake(s: Supplier, job: Job) {
  return (
    (job.service === "any" || s.service === job.service) &&
    (job.city === "any" || s.city === job.city) &&
    urgencyRank[s.turnaround] >= urgencyRank[job.urgency] &&
    (job.budget === "any" || s.budget === job.budget)
  );
}

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const supplierById = (id: string) => suppliers.find((s) => s.id === id);

export const formatKes = (n: number) => `KES ${n.toLocaleString("en-KE")}`;
