export function AnimatedBackground() {
  return (
    <>
      {/* Base background canvas */}
      <div className="fixed inset-0 z-0 bg-[#0b0b0f] theme-light-bg pointer-events-none transition-colors duration-300" />

      {/* Ambient glow layer */}
      <div
        className="fixed inset-0 z-0 pointer-events-none anim-bg-breathe"
        style={{
          willChange: 'transform',
          contain: 'strict',
          transform: 'translateZ(0)',
        }}
      >
        {/* Glow blobs — desktop & mobile safe */}
        <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-pink-500/20 theme-light-blob1 rounded-full blur-[80px]" />
        <div className="hidden md:block absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/20 theme-light-blob2 rounded-full blur-[80px]" />
        <div className="hidden md:block absolute top-1/3 left-1/4 w-80 h-80 bg-amber-400/15 theme-light-blob3 rounded-full blur-[90px]" />

        {/* Mobile ambient tint */}
        <div className="md:hidden absolute top-0 right-0 w-72 h-72 bg-pink-600/10 theme-light-blob1 rounded-full" />
        <div className="md:hidden absolute bottom-1/4 left-0 w-72 h-72 bg-blue-600/10 theme-light-blob2 rounded-full" />

        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/80 to-[#0b0b0f] theme-light-gradient transition-colors duration-300" />
      </div>
    </>
  );
}
