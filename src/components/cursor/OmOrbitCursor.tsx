"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "@/context/ThemeContext";

type CursorTargetType =
  | "default"
  | "interactive"
  | "card"
  | "neural"
  | "text"
  | "hidden";

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
 * Determine contextual cursor state from DOM target element hierarchy.
 * Priority order ensures inputs get native I-beam, Neural Visualizer never enlarges,
 * and buttons/cards trigger appropriate scale feedback.
 */
function resolveTargetType(target: Element | null): CursorTargetType {
  if (!target) return "default";

  // 1. Text input / editable area check -> restore native text cursor
  if (
    target.closest(
      'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'
    )
  ) {
    return "text";
  }

  // 2. Neural Visualizer check -> strictly keep standard cursor scale, NEVER enlarge
  if (
    target.closest(
      '[data-neural-visualizer="true"], [data-neural-visualizer], canvas.cursor-crosshair'
    )
  ) {
    return "neural";
  }

  // 3. High-priority interactive link / button check
  if (
    target.closest(
      'a, button, [role="button"], [role="tab"], [role="option"], [data-cursor="interactive"], input[type="submit"], input[type="button"], select, summary, .cursor-pointer'
    )
  ) {
    return "interactive";
  }

  // 4. Card / architectural container check
  if (
    target.closest(
      '.crosshair-corner, .brutalist-card, [data-cursor="card"], article'
    )
  ) {
    return "card";
  }

  return "default";
}

/**
 * OM ORBIT: Custom Cursor Experience
 * Ultra-smooth, zero React re-render custom cursor system.
 *
 * Performance & Architecture:
 * - Direct DOM transform manipulation via requestAnimationFrame
 * - Dual-stage eased interpolation: central dot smoothly follows pointer,
 *   outer ring follows central dot with subtle natural delay
 * - Dynamic responsiveness prevents lag during fast mouse sweeps
 * - Scroll and resize listeners maintain accurate spatial targeting
 * - Neural Visualizer isolation: custom cursor stays at standard scale (never enlarges)
 * - Safe device detection: completely disabled on mobile/touch devices
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

  // Raw pointer coordinates from window events
  const rawPointerPos = useRef({ x: -100, y: -100 });
  // Interpolated coordinates for central dot and outer ring
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  // Interpolated scale values for organic hover transitions
  const currentDotScale = useRef(1);
  const currentRingScale = useRef(1);

  const isMouseDown = useRef(false);
  const isVisible = useRef(false);
  const hasInitialized = useRef(false);
  const targetType = useRef<CursorTargetType>("default");
  const orbitAngle = useRef(0);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    if (!isFinePointer) return;

    // Monitor prefers-reduced-motion
    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion.current = mediaReduced.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };
    mediaReduced.addEventListener("change", handleMotionChange);

    document.body.classList.add("has-custom-cursor");

    const onPointerMove = (e: PointerEvent) => {
      rawPointerPos.current.x = e.clientX;
      rawPointerPos.current.y = e.clientY;

      // On first pointer movement or re-entry, snap immediately to eliminate jumps
      if (!hasInitialized.current) {
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        hasInitialized.current = true;
      }

      isVisible.current = true;
      targetType.current = resolveTargetType(e.target as Element | null);
    };

    const onPointerDown = () => {
      isMouseDown.current = true;
    };

    const onPointerUp = () => {
      isMouseDown.current = false;
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      hasInitialized.current = false;
    };

    const onMouseEnter = (e: MouseEvent) => {
      isVisible.current = true;
      if (e.clientX > 0 && e.clientY > 0) {
        rawPointerPos.current.x = e.clientX;
        rawPointerPos.current.y = e.clientY;
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        hasInitialized.current = true;
      }
    };

    // Re-evaluate target element when scrolling or resizing under stationary pointer
    const onScrollOrResize = () => {
      if (!isVisible.current || rawPointerPos.current.x < 0) return;
      const el = document.elementFromPoint(
        rawPointerPos.current.x,
        rawPointerPos.current.y
      );
      targetType.current = resolveTargetType(el);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Continuous Animation Loop via requestAnimationFrame
    let animationFrameId: number;

    const render = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const satellite = orbitSatelliteRef.current;

      if (dot && ring) {
        // Theme-specific fluid damping parameters for outer ring
        const ringLerpFactor = isReducedMotion.current
          ? 1
          : theme === "signal-studio"
          ? 0.24
          : theme === "crimson-noir"
          ? 0.16
          : 0.20;

        // Stage 1: Central Dot smoothly follows raw pointer
        if (isReducedMotion.current) {
          dotPos.current.x = rawPointerPos.current.x;
          dotPos.current.y = rawPointerPos.current.y;
        } else {
          const dotDx = rawPointerPos.current.x - dotPos.current.x;
          const dotDy = rawPointerPos.current.y - dotPos.current.y;
          const dotDist = Math.hypot(dotDx, dotDy);

          if (dotDist < 0.1) {
            dotPos.current.x = rawPointerPos.current.x;
            dotPos.current.y = rawPointerPos.current.y;
          } else {
            // Adaptive lerp: snappy and direct during sweeps, silky-smooth during micro movements
            const dotLerp = dotDist > 80 ? 0.75 : 0.60;
            dotPos.current.x += dotDx * dotLerp;
            dotPos.current.y += dotDy * dotLerp;
          }
        }

        // Stage 2: Outer Ring smoothly follows central dot with subtle natural delay
        if (isReducedMotion.current) {
          ringPos.current.x = dotPos.current.x;
          ringPos.current.y = dotPos.current.y;
        } else {
          const ringDx = dotPos.current.x - ringPos.current.x;
          const ringDy = dotPos.current.y - ringPos.current.y;
          const ringDist = Math.hypot(ringDx, ringDy);

          if (ringDist < 0.1) {
            ringPos.current.x = dotPos.current.x;
            ringPos.current.y = dotPos.current.y;
          } else {
            ringPos.current.x += ringDx * ringLerpFactor;
            ringPos.current.y += ringDy * ringLerpFactor;
          }

          // Orbit rotation speed driven by velocity + resting ambient drift
          orbitAngle.current = (orbitAngle.current + ringDist * 0.12 + 0.6) % 360;
        }

        // Determine visibility & active opacity
        const isHidden =
          !isVisible.current ||
          targetType.current === "text" ||
          rawPointerPos.current.x < 0 ||
          rawPointerPos.current.y < 0;

        dot.style.opacity = isHidden ? "0" : "1";
        ring.style.opacity = isHidden ? "0" : "1";

        // Calculate target scale states
        let targetDotScale = 1;
        let targetRingScale = 1;

        if (targetType.current === "neural") {
          // Requirement: strictly NEVER enlarge or expand inside Neural Visualizer
          targetDotScale = 1;
          targetRingScale = 1;
        } else if (isMouseDown.current) {
          // Tactile click compression
          targetDotScale = 0.6;
          targetRingScale = 0.8;
        } else if (targetType.current === "interactive") {
          // Links, buttons, interactive controls
          targetDotScale = 1.35;
          targetRingScale = 1.45;
        } else if (targetType.current === "card") {
          // Architecture cards, brutalist containers
          targetDotScale = 1.5;
          targetRingScale = 1.85;
        }

        // Smoothly ease scale factors to avoid sudden pop
        if (isReducedMotion.current) {
          currentDotScale.current = targetDotScale;
          currentRingScale.current = targetRingScale;
        } else {
          currentDotScale.current += (targetDotScale - currentDotScale.current) * 0.28;
          currentRingScale.current += (targetRingScale - currentRingScale.current) * 0.22;
        }

        // Apply hardware-accelerated 3D transforms
        dot.style.transform = `translate3d(${dotPos.current.x.toFixed(2)}px, ${dotPos.current.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentDotScale.current.toFixed(3)})`;
        ring.style.transform = `translate3d(${ringPos.current.x.toFixed(2)}px, ${ringPos.current.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentRingScale.current.toFixed(3)})`;

        // Rotate orbit satellite / crosshair tick elements
        if (satellite) {
          satellite.style.transform = `rotate(${orbitAngle.current.toFixed(1)}deg)`;
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
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
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
