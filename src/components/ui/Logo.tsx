import Image from "next/image";

// The LisBran "B" mark, from the owner's vector master (public/brand/lisbran-mark.svg).
// It draws in currentColor, so it follows the text colour: ink by day, concrete by
// night, and light over the intro film.
const MARK_PATH =
  "M389.3,222.6c-7.6-8.1-15.7-13.5-24.9-16.8c36.2-32.4,44.3-87.6,18.9-129.2c-10.8-18.9-36.8-34-66.5-40 c-24.9-4.3-74.6-7-127.5,29.7c-7.6-13-20.5-22.7-36.2-24.9c-21.1-3.2-41.6,4.3-55.1,20.5c-15.1,18.4-18.9,44.9-9.7,70.8 c3.8,10.8,7,18.9,13.5,31.3c2.7,5.9,5.4,11.9,9.2,20c9.7,22.2,3.8,41.1-5.4,64.9l-3.2,8.1c-23.8,67.6-23.2,127,2.2,166.5 c18.9,30.3,50.8,48.6,93,53c10.8,0.5,20.5,1.1,30.3,1.1c89.2,0,148.6-43.2,173-84.3C441.2,326.4,438,278.3,389.3,222.6z M365,378.8c-42.2,57.8-133.5,79.5-184.3,43.2c-66.5-47-41.6-194.6-3.2-256.2c20-31.9,44.3-64.3,78.4-69.2h2.7 c8.1,0,17.3,3.8,24.9,10.8c9.7,9.2,14.6,21.6,14.1,33.5c-3.2,28.6-12.4,56.2-27.6,81.1c-3.2,4.9-11.3,17.3-20,30.3 c-10.8,16.8-21.1,32.4-24.3,38.9c-2.7,5.4-5.9,10.8-8.1,16.2c-4.9,13.5-8.6,27-11.4,40.5c-0.5,4.9-1.1,8.6-1.6,10.8 c-1.6,6.5,1.1,13.5,7,16.2c7,3.8,15.1,1.6,20-7c1.1-2.2,1.6-4.9,1.6-7c3.2-25.4,12.4-49.7,27-70.8 c15.1-16.8,65.9-66.5,110.3-28.6C414.7,299.4,381.2,356.7,365,378.8z";

export function Logo({ size, className = "", title = "LisBran" }: { size: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={`shrink-0 ${className}`}
    >
      <path fill="currentColor" d={MARK_PATH} />
    </svg>
  );
}

// The full horizontal lockup: mark, "LisBran Marketing Services" and the
// "Design · Branding · Marketing" line, from the owner's PNG masters (its SVG master
// sets the name as live Poppins text, which would not render without that font).
// Both colourways are in the DOM; CSS shows white on dark grounds, black on light.
export function LogoLockup({ width, className = "", priority = false }: { width: number; className?: string; priority?: boolean }) {
  const height = Math.round(width / 4);
  return (
    <span className={`inline-block ${className}`} style={{ width, height }}>
      <Image src="/brand/lisbran-lockup-white.png" alt="LisBran Marketing Services: design, branding, marketing" width={width} height={height} priority={priority} className="logo-on-dark w-full h-auto" />
      <Image src="/brand/lisbran-lockup-black.png" alt="" aria-hidden width={width} height={height} priority={priority} className="logo-on-light w-full h-auto" />
    </span>
  );
}
