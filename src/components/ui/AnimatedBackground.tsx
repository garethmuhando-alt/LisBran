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
        {/* Rich Ambient Glow Blobs for Light & Dark Mode */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-pink-500/20 theme-light-blob1 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-0 w-[30rem] h-[30rem] bg-blue-500/20 theme-light-blob2 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-5 w-[25rem] h-[25rem] bg-purple-500/20 theme-light-blob3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-10 w-[25rem] h-[25rem] bg-amber-400/20 theme-light-blob4 rounded-full blur-[100px]" />

        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/80 to-[#0b0b0f] theme-light-gradient transition-colors duration-300" />
      </div>
    </>
  );
}
