"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#141417] pointer-events-none" />
      <motion.div 
        animate={{ scale: [1.05, 1.15, 1.05], rotate: [0, -1, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 z-0 pointer-events-none w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl mx-auto origin-center opacity-30"
      >
        <Image src="/bg-home.png" alt="Deep Space" fill className="object-cover mix-blend-screen" priority />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-[#141417]/80 to-[#141417]" />
      </motion.div>
    </>
  );
}
