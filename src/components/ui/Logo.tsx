import Image from "next/image";

// Renders the white mark on dark themes and the black mark on light themes.
// Both are in the DOM; CSS (.logo-on-dark / .logo-on-light) picks one, so the
// correct logo shows on first paint with no hydration flash.
export function Logo({ size, className = "", priority = false }: { size: number; className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src="/LisBran PNG  Logo (512px by 512px)- White.png"
        alt="LisBran"
        width={size}
        height={size}
        priority={priority}
        className={`logo-on-dark object-contain ${className}`}
      />
      <Image
        src="/LisBran PNG  Logo (512px by 512px)- Black.png"
        alt=""
        aria-hidden
        width={size}
        height={size}
        priority={priority}
        className={`logo-on-light object-contain ${className}`}
      />
    </>
  );
}
