"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "@/context/ThemeContext";

type CursorTargetType = "default" | "interactive" | "card" | "text" | "hidden";

function subscribeFinePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

/**
 * OM ORBIT: Custom Cursor Experience
 * High-performance, zero React re-render custom cursor system.
 * Powered by requestAnimationFrame direct DOM manipulation with theme-aware
 * orbital physics, precision crosshairs, and device accessibility guards.
 */
export function OmOrbitCursor() {
  const { theme } = useTheme();
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerFinePointerSnapshot
  );

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const orbitSatelliteRef = useRef<HTMLDivElement | null>(null);

  // Position state refs to avoid React re-renders on mousemove
  const pointerPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isMouseDown = useRef(false);
  const isVisible = useRef(false);
  const targetType = useRef<CursorTargetType>("default");
  const orbitAngle = useRef(0);
  const isReducedMotion = useRef(false);

  // Manage pointer listeners and RAF animation loop
  useEffect(() => {
    if (!isFinePointer) return;

    // Check prefers-reduced-motion
    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = mediaReduced.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };
    mediaReduced.addEventListener("change", handleMotionChange);

    document.body.classList.add("has-custom-cursor");

    const onPointerMove = (e: PointerEvent) => {
      pointerPos.current.x = e.clientX;
      pointerPos.current.y = e.clientY;
      isVisible.current = true;

      // Inspect target element to determine contextual cursor state
      const target = e.target as Element | null;
      if (!target) {
        targetType.current = "default";
        return;
      }

      // 1. Text input / selectable area check -> preserve native cursor
      if (
        target.closest(
          'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'
        )
      ) {
        targetType.current = "text";
        return;
      }

      // 2. High-priority interactive link / button check
      if (
        target.closest(
          'a, button, [role="button"], [role="tab"], [role="option"], [data-cursor="interactive"], input[type="submit"], input[type="button"], select, summary, .cursor-pointer'
        )
      ) {
        targetType.current = "interactive";
        return;
      }

      // 3. Card / architectural container check
      if (
        target.closest(
          '.crosshair-corner, .brutalist-card, [data-cursor="card"], article'
        )
      ) {
        targetType.current = "card";
        return;
      }

      targetType.current = "default";
    };

    const onPointerDown = () => {
      isMouseDown.current = true;
    };

    const onPointerUp = () => {
      isMouseDown.current = false;
    };

    const onMouseLeave = () => {
      isVisible.current = false;
    };

    const onMouseEnter = () => {
      isVisible.current = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Continuous Animation Loop via requestAnimationFrame
    let animationFrameId: number;

    const render = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const satellite = orbitSatelliteRef.current;

      if (dot && ring) {
        // Theme-specific fluid damping parameters
        const lerpFactor = isReducedMotion.current
          ? 1
          : theme === "signal-studio"
          ? 0.22
          : theme === "crimson-noir"
          ? 0.14
          : 0.18;

        // Smooth physics-based ring trailing interpolation
        const dx = pointerPos.current.x - ringPos.current.x;
        const dy = pointerPos.current.y - ringPos.current.y;
        const distance = Math.hypot(dx, dy);

        ringPos.current.x += dx * lerpFactor;
        ringPos.current.y += dy * lerpFactor;

        // Orbit rotation speed based on cursor velocity + resting drift
        if (!isReducedMotion.current) {
          orbitAngle.current = (orbitAngle.current + distance * 0.12 + 0.6) % 360;
        }

        // Determine visibility & active opacity
        const isHidden =
          !isVisible.current ||
          targetType.current === "text" ||
          pointerPos.current.x <= 0 ||
          pointerPos.current.y <= 0;

        dot.style.opacity = isHidden ? "0" : "1";
        ring.style.opacity = isHidden ? "0" : "1";

        // Dot scale calculation
        let dotScale = 1;
        if (isMouseDown.current) {
          dotScale = 0.6;
        } else if (targetType.current === "interactive") {
          dotScale = 1.35;
        } else if (targetType.current === "card") {
          dotScale = 1.5;
        }

        // Ring scale & appearance state calculation
        let ringScale = 1;
        if (isMouseDown.current) {
          ringScale = 0.8;
        } else if (targetType.current === "interactive") {
          ringScale = 1.45;
        } else if (targetType.current === "card") {
          ringScale = 1.85;
        }

        // Apply high-performance hardware-accelerated 3D transforms
        dot.style.transform = `translate3d(${pointerPos.current.x}px, ${pointerPos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;

        // Rotate orbit satellite / crosshair tick elements
        if (satellite) {
          satellite.style.transform = `rotate(${orbitAngle.current}deg)`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaReduced.removeEventListener("change", handleMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [isFinePointer, theme]);

  if (!isFinePointer) {
    return null;
  }

  // Visual appearance styles based on the active theme
  const isOriginal = theme === "original";
  const isCrimson = theme === "crimson-noir";
  const isSignal = theme === "signal-studio";

  // Central Pointer Dot Styles
  let dotClasses =
    "fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] transition-opacity duration-150 will-change-transform";
  if (isOriginal) {
    dotClasses += " bg-[#FF3B00] shadow-[0_0_2px_rgba(0,0,0,0.8)]";
  } else if (isCrimson) {
    dotClasses +=
      " bg-white shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_12px_rgba(212,21,20,0.6)]";
  } else if (isSignal) {
    dotClasses += " bg-[#FF4FA3] shadow-[0_0_4px_#1B1020]";
  }

  // Outer Ring Orbit Styles
  let ringClasses =
    "fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] transition-opacity duration-150 will-change-transform flex items-center justify-center";
  if (isOriginal) {
    ringClasses +=
      " border-2 border-[#CCFF00] bg-[#CCFF00]/10 shadow-[0_0_0_1px_rgba(13,13,13,0.35)]";
  } else if (isCrimson) {
    ringClasses +=
      " border border-[#D41514] bg-[#D41514]/10 shadow-[0_0_14px_rgba(212,21,20,0.5),inset_0_0_6px_rgba(212,21,20,0.25)]";
  } else if (isSignal) {
    ringClasses +=
      " border-2 border-[#6938FF] bg-[#6938FF]/15 shadow-[2px_2px_0px_0px_#1B1020]";
  }

  return (
    <>
      {/* Central Precision Pointer Dot */}
      <div ref={dotRef} aria-hidden="true" className={dotClasses} />

      {/* Smoothly Trailing Orbit Ring */}
      <div ref={ringRef} aria-hidden="true" className={ringClasses}>
        {/* Orbital Satellite Node / Crosshair Tick Marks */}
        <div
          ref={orbitSatelliteRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {isOriginal && (
            <>
              {/* Technical Precision Crosshair Ticks */}
              <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#FF3B00]" />
              <span className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#FF3B00]" />
              <span className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-[#FF3B00]" />
              <span className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-[#FF3B00]" />
            </>
          )}

          {isCrimson && (
            <>
              {/* Atmospheric Crimson Orbital Spark */}
              <span className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFFFFF] shadow-[0_0_8px_#D41514]" />
            </>
          )}

          {isSignal && (
            <>
              {/* Acid Pop Acid-Lime Orbital Satellite */}
              <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C6FF00] border border-[#1B1020] shadow-[1px_1px_0px_0px_#1B1020]" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
