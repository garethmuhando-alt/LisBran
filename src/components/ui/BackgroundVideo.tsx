"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export const INTRO_POSTER = "/video/lisbran-intro-poster.jpg";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Muted, looping decorative video that fills its positioned parent.
 * - Serves 480p to phones and 720p elsewhere (WebM/VP9 first, H.264 fallback).
 * - Only plays while on screen and the tab is visible.
 * - Stays on the poster for prefers-reduced-motion, Save-Data and 2G users.
 * - Exposes a pause button (WCAG 2.2.2 — moving content longer than 5s).
 */
export function BackgroundVideo({
  className = "",
  controlClassName = "bottom-3 right-3",
}: {
  className?: string;
  controlClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const slow = !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType ?? ""));
    const update = () => setAllowed(!reduce.matches && !slow);
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Set as a property too: React does not reliably emit the `muted` attribute,
    // and browsers only allow autoplay for muted media.
    video.muted = true;

    if (!allowed || userPaused) {
      video.pause();
      return;
    }

    let onScreen = false;
    const sync = () => {
      if (onScreen && document.visibilityState === "visible") {
        video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    io.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [allowed, userPaused]);

  return (
    <>
      <video
        ref={ref}
        className={`absolute inset-0 w-full h-full ${className}`}
        poster={INTRO_POSTER}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/video/lisbran-intro-480.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/video/lisbran-intro-480.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/video/lisbran-intro-720.webm" type="video/webm" />
        <source src="/video/lisbran-intro-720.mp4" type="video/mp4" />
      </video>

      {allowed && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className={`theme-preserve absolute z-20 w-9 min-h-9 bg-[#121212]/80 border-[1.5px] border-[#ece9e4]/60 text-[#ece9e4] flex items-center justify-center hover:bg-[#121212] transition-colors ${controlClassName}`}
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="translate-x-px" />}
        </button>
      )}
    </>
  );
}
