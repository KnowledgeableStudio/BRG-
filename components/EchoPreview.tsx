"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CLIP_START = 1.5;
const CLIP_END = 8.5;
const CLIP_DURATION = CLIP_END - CLIP_START;

export default function EchoPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 1, 1, 0]
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [1, 0.4, 0.5, 0.4, 1]
  );

  const titleY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [60, 0, 0, -40]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.7, 0.9],
    [0, 1, 1, 0]
  );

  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.65, 0.8],
    [0, 1, 1, 0]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.4, 0.4, 0]
  );

  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let rafId: number;
    let lastSetTime = -1;

    const update = () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = viewportHeight - rect.top;
      const progress = Math.max(
        0,
        Math.min(1, scrolled / (sectionHeight + viewportHeight))
      );

      const targetTime = CLIP_START + progress * CLIP_DURATION;

      if (Math.abs(targetTime - lastSetTime) > 0.02) {
        try {
          video.currentTime = targetTime;
          lastSetTime = targetTime;
        } catch {
          // Video not ready
        }
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion, isVisible]);

  return (
    <section ref={sectionRef} className="relative h-[160vh] w-full">
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100dvh" }}>
        {/* Video layer */}
        {!reducedMotion && isVisible && (
          <motion.div
            className="absolute inset-0 h-full w-full"
            style={{ opacity: videoOpacity, willChange: "opacity" }}
          >
            <video
              ref={videoRef}
              src="/echo.mp4"
              poster="/echo-poster.jpg"
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={() => {
                setVideoReady(true);
                const v = videoRef.current;
                if (v) v.play().then(() => v.pause()).catch(() => {});
              }}
              className="h-full w-full object-cover"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        )}

        {/* Fallback poster — always present behind video until video is ready */}
        {(reducedMotion || !isVisible || !videoReady) && (
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: "url(/echo-poster.jpg)",
              opacity: reducedMotion ? 0.3 : 0.6,
            }}
          />
        )}

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* BRG blue glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brg-blue/20 blur-[120px]"
          style={{ opacity: glowOpacity }}
        />

        {/* Top/bottom gradient fades */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050507] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050507] to-transparent" />

        {/* Cinematic text overlay */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.h2
            className="font-display text-5xl font-black uppercase tracking-[0.3em] text-white drop-shadow-[0_0_40px_rgba(0,174,239,0.4)] md:text-7xl lg:text-8xl"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            Echo
          </motion.h2>

          <motion.p
            className="mt-5 max-w-xl text-base leading-7 text-white/70 md:text-lg"
            style={{ opacity: subtitleOpacity }}
          >
            Scroll to replay the cinematic sequence — every frame designed for
            the BRG drop.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
