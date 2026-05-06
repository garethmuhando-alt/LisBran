export function AnimatedBackground() {
  return (
    <>
      {/* Base dark background */}
      <div className="fixed inset-0 z-0 bg-[#141417] pointer-events-none" />

      {/* CSS-animated background — no JS, no framer-motion */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl mx-auto origin-center opacity-25 anim-bg-breathe" style={{ contain: 'strict' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bg-home.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover mix-blend-screen" loading="lazy" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/20 rounded-full blur-[70px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[70px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-[#141417]/80 to-[#141417]" />
      </div>
    </>
  );
}
