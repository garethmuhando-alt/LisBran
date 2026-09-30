import { ChevronDown } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

// The brand film as the page's masthead.
//
// wide (landscape and tall enough, see the `wide` variant in globals.css):
//   the film covers the whole screen and the words sit on a carbon wash at
//   its foot, with the header floating over the top (Dairyland-style).
// otherwise (portrait phones and tablets, short landscape phones):
//   the film keeps its own 16:9 shape (no letterbox, nothing cropped) and the
//   words stack directly beneath it, on the film's own edge colour.
//
// FILM_EDGE is sampled from the film's darkest field so the two meet without a seam.
const FILM_EDGE = "#13181e";

export function VideoMasthead({
  children,
  next,
  underNav = true,
  controlClassName = "top-3 right-3 wide:top-20 wide:right-8",
}: {
  children: React.ReactNode;
  next?: string;
  underNav?: boolean;
  controlClassName?: string;
}) {
  return (
    <section
      data-masthead
      aria-label="LisBran intro film"
      style={{ backgroundColor: FILM_EDGE }}
      className={`on-dark theme-preserve relative isolate overflow-hidden wide:h-[100svh] ${underNav ? "-mt-14" : ""}`}
    >
      <div
        className={`relative w-full aspect-video max-h-[calc(100svh-4rem)] ${underNav ? "mt-14" : "mt-16"}
          wide:absolute wide:inset-0 wide:mt-0 wide:aspect-auto wide:max-h-none`}
      >
        <BackgroundVideo className="object-cover" controlClassName={controlClassName} />
      </div>

      {/* legibility washes: under the header, and beneath the words when they sit on the film */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(18,18,18,0.7),rgba(18,18,18,0))]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden wide:block h-[60%] bg-[linear-gradient(to_top,rgba(18,18,18,0.96)_40%,rgba(18,18,18,0))]" />

      <div className="relative wide:absolute wide:inset-x-0 wide:bottom-0">
        {/* In the app the phone/tablet tab bar (4rem) overlays the bottom edge below lg. */}
        <div className={`wrap pt-6 pb-10 wide:pt-0 ${underNav
          ? "wide:pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:wide:pb-14"
          : "wide:pb-14"}`}>
          {children}
        </div>
      </div>

      {next && (
        <a
          href={next}
          aria-label="Scroll to content"
          className="absolute left-1/2 -translate-x-1/2 bottom-3 hidden lg:wide:flex text-ink-2 hover:text-ink"
        >
          <ChevronDown size={20} />
        </a>
      )}
    </section>
  );
}
