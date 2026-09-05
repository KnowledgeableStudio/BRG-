"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      setIsActive(Boolean(target?.closest("a, button, input, textarea, select, [data-cursor='active']")));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block" aria-hidden="true">
      <motion.div
        className="fixed h-3 w-3 rounded-full bg-brg-blue shadow-glow"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isActive ? 1.7 : 1
        }}
        transition={{ type: "spring", stiffness: 550, damping: 32, mass: 0.35 }}
      />
      <motion.div
        className="fixed h-10 w-10 rounded-full border border-brg-blue/55"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isActive ? 1.6 : 1
        }}
        transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.4 }}
      />
    </div>
  );
}
