export function AnimatedBackground() {
  return (
    <>
      {/* Base dark background — solid color, no repaint */}
      <div className="fixed inset-0 z-0 bg-[#141417] pointer-events-none" />

      {/* Ambient glow layer — GPU composited, no blur on mobile */}
      <div
        className="fixed inset-0 z-0 pointer-events-none anim-bg-breathe"
        style={{
          willChange: 'transform',
          contain: 'strict',
          transform: 'translateZ(0)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg-home.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-20"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        {/* Glow blobs — hidden on mobile via CSS, visible on desktop */}
        <div className="hidden md:block absolute top-0 right-0 w-80 h-80 bg-pink-600/20 rounded-full blur-[70px]" />
        <div className="hidden md:block absolute bottom-1/4 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[70px]" />
        {/* Mobile-safe: solid color tint instead of blur */}
        <div className="md:hidden absolute top-0 right-0 w-80 h-80 bg-pink-900/10 rounded-full" />
        <div className="md:hidden absolute bottom-1/4 left-0 w-80 h-80 bg-blue-900/10 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-[#141417]/80 to-[#141417]" />
      </div>
    </>
  );
}
