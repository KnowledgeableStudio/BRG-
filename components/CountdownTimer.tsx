"use client";

import { useEffect, useState } from "react";

const DROP_STORAGE_KEY = "brg-drop-end";
const THREE_DAYS_MS = 72 * 60 * 60 * 1000;

function formatRemaining(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
    2,
    "0"
  )}m ${String(seconds).padStart(2, "0")}s`;
}

export default function CountdownTimer() {
  const [remaining, setRemaining] = useState("3d 00h 00m 00s");

  useEffect(() => {
    const storedEnd = window.localStorage.getItem(DROP_STORAGE_KEY);
    const endTime = storedEnd ? Number(storedEnd) : Date.now() + THREE_DAYS_MS;

    if (!storedEnd || Number.isNaN(endTime) || endTime < Date.now()) {
      window.localStorage.setItem(DROP_STORAGE_KEY, String(Date.now() + THREE_DAYS_MS));
    }

    const activeEndTime = Number(window.localStorage.getItem(DROP_STORAGE_KEY));

    const tick = () => {
      setRemaining(formatRemaining(activeEndTime - Date.now()));
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel inline-flex items-center gap-3 rounded-full px-5 py-3 font-display text-sm uppercase tracking-[0.28em] text-white/80">
      <span className="h-2 w-2 rounded-full bg-brg-blue shadow-glow" />
      Limited Drop
      <span className="text-brg-blue">{remaining}</span>
    </div>
  );
}
