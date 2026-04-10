export function AnimatedBackground() {
  return (
    <>
      {/* Base dark background */}
      <div className="fixed inset-0 z-0 bg-[#141417] pointer-events-none" />

      {/* CSS-animated background image — no JS, no framer-motion */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl mx-auto origin-center opacity-30 anim-bg-breathe">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bg-home.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover mix-blend-screen" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-[#141417]/80 to-[#141417]" />
      </div>
    </>
  );
}
