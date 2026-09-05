"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const VIDEO_DURATION = 10;

export default function EchoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll();

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.5, 0.95, 1],
    [0.65, 0.55, 0.7, 0.8, 0.9]
  );

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.97, 1],
    [1, 1, 0.7]
  );

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 1]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 0.35, 0.35, 0]
  );

  const handleLoadedMetadata = useCallback(() => {
    setIsLoaded(true);
    const video = videoRef.current;
    if (video) {
      video.play().then(() => video.pause()).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;
    let lastSetTime = -1;

    const update = () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
      const targetTime = Math.max(0, Math.min(VIDEO_DURATION, progress * VIDEO_DURATION));

      if (Math.abs(targetTime - lastSetTime) > 0.02) {
        try {
          video.currentTime = targetTime;
          lastSetTime = targetTime;
        } catch {
          // Video not ready for seeking yet
        }
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 z-0 w-full overflow-hidden" style={{ height: "100dvh" }}>
      {/* Video layer */}
      {!reducedMotion && (
        <motion.div className="absolute inset-0 h-full w-full" style={{ opacity: videoOpacity, willChange: "opacity" }}>
          <video
            ref={videoRef}
            src="/echo.mp4"
            poster="/echo-poster.jpg"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            className="h-full w-full object-cover"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      )}

      {/* Fallback poster for reduced motion or before video loads */}
      {(reducedMotion || !isLoaded) && (
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url(/echo-poster.jpg)",
            opacity: reducedMotion ? 0.3 : 1,
          }}
        />
      )}

      {/* Dark overlay for content readability */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* BRG blue ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brg-blue/15 blur-[140px]"
        style={{ scale: glowScale, opacity: glowOpacity }}
      />

      {/* Bottom gradient fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050507] to-transparent" />
    </div>
  );
}
