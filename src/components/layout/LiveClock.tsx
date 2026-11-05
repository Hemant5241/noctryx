"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  if (typeof window === "undefined") return "03:45:00 IST";
  try {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-GB", options).format(now) + " IST";
  } catch {
    return "03:45:00 IST";
  }
}

function getServerSnapshot() {
  return "03:45:00 IST";
}

export function LiveClock() {
  const timeString = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider px-2.5 py-1 border border-black/20 bg-black/[0.03]"
      title="Live Local Time (Asia/Kolkata UTC+05:30)"
      aria-label={`Current IST Time: ${timeString}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B00] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3B00]"></span>
      </span>
      <span className="text-black/80">{timeString}</span>
      <span className="hidden sm:inline text-black/40 text-[10px]">{"//"} UTC+5.5</span>
    </div>
  );
}
