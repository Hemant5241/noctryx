"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Activity } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  activation: number;
  dimension: string;
  isAnchor?: boolean;
}

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerMotionSnapshot() {
  return false;
}

export function NeuralVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isReducedMotion = useSyncExternalStore(subscribeMotion, getMotionSnapshot, getServerMotionSnapshot);
  const { theme } = useTheme();

  const [telemetry, setTelemetry] = useState({
    nodeCount: 38,
    activeConnections: 0,
    cosineMean: "0.842",
    fps: 60,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Generate Nodes
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 48);
    const nodes: Node[] = [];
    const dimensions = ["d768", "d1536", "d3072", "attn.q", "attn.k", "attn.v", "mlp.gate", "ffn.up"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 2,
        baseRadius: Math.random() * 2.5 + 2,
        activation: Math.random(),
        dimension: dimensions[Math.floor(Math.random() * dimensions.length)],
        isAnchor: i % 7 === 0,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let lastTime = typeof performance !== "undefined" ? performance.now() : Date.now();
    let frameCounter = 0;
    let edgeCount = 0;

    const render = (rawTime?: number) => {
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      const time = typeof rawTime === "number" && !isNaN(rawTime) && rawTime > 0 ? rawTime : now;

      frameCounter++;
      const delta = time - lastTime;
      if (delta >= 1000) {
        const measuredFps = Math.round((frameCounter * 1000) / delta);
        const safeFps = Number.isFinite(measuredFps) && measuredFps > 0 && measuredFps <= 144
          ? measuredFps
          : 60;

        setTelemetry((prev) => ({
          ...prev,
          nodeCount: nodes.length,
          activeConnections: edgeCount,
          fps: safeFps,
        }));
        frameCounter = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Theme-specific colors
      let gridStroke = "rgba(13, 13, 13, 0.05)";
      let edgeStrokeNormal = "rgba(13, 13, 13, ";
      let anchorFill = "#FF3B00";
      let anchorStroke = "#0D0D0D";
      let nodeFill = "#0D0D0D";
      let labelFill = "#0D0D0D";

      if (theme === "crimson-noir") {
        gridStroke = "rgba(205, 203, 202, 0.05)";
        edgeStrokeNormal = "rgba(205, 203, 202, ";
        anchorFill = "#D41514";
        anchorStroke = "#CDCBCA";
        nodeFill = "#CDCBCA";
        labelFill = "#CDCBCA";
      } else if (theme === "signal-studio") {
        gridStroke = "rgba(105, 56, 255, 0.08)";
        edgeStrokeNormal = "rgba(105, 56, 255, ";
        anchorFill = "#FF4FA3";
        anchorStroke = "#1B1020";
        nodeFill = "#1B1020";
        labelFill = "#1B1020";
      }

      // Draw subtle coordinate background grid
      ctx.strokeStyle = gridStroke;
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      edgeCount = 0;
      const connectionDist = Math.min(width, height) * 0.28;

      // Draw Inter-node Synaptic Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            edgeCount++;
            const alpha = 1 - dist / connectionDist;
            const isHighlight =
              Math.hypot(nodes[i].x - mouseX, nodes[i].y - mouseY) < 140 ||
              Math.hypot(nodes[j].x - mouseX, nodes[j].y - mouseY) < 140;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            if (isHighlight) {
              if (theme === "crimson-noir") {
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#D41514";
                ctx.strokeStyle = `rgba(255, 69, 58, ${alpha * 0.95})`;
                ctx.lineWidth = 1.8;
              } else if (theme === "signal-studio") {
                ctx.strokeStyle = `rgba(0, 229, 212, ${alpha * 0.95})`;
                ctx.lineWidth = 2.2;
              } else {
                ctx.strokeStyle = `rgba(255, 59, 0, ${alpha * 0.85})`;
                ctx.lineWidth = 1.5;
              }
            } else {
              const baseAlpha = theme === "crimson-noir" ? alpha * 0.32 : theme === "signal-studio" ? alpha * 0.28 : alpha * 0.22;
              ctx.strokeStyle = `${edgeStrokeNormal}${baseAlpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw Nodes and Labels
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!isReducedMotion) {
          // Autonomous movement
          node.x += node.vx;
          node.y += node.vy;

          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          // Mouse gravity
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const mDist = Math.sqrt(dx * dx + dy * dy);
          if (mDist < 120) {
            const angle = Math.atan2(dy, dx);
            node.x += Math.cos(angle) * 1.2;
            node.y += Math.sin(angle) * 1.2;
            node.radius = node.baseRadius * 1.8;
          } else {
            node.radius = node.baseRadius;
          }
        }

        // Theme-specific node decorations
        if (theme === "crimson-noir" && node.isAnchor) {
          // Atmospheric animated pulse ring
          const pulseRadius = node.radius * (2.0 + Math.sin(time / 280 + i) * 0.45);
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 69, 58, ${0.35 + Math.sin(time / 280 + i) * 0.15})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (theme === "signal-studio" && node.isAnchor) {
          // Atelier diamond glyph and acid ring
          ctx.beginPath();
          ctx.moveTo(node.x - 8, node.y);
          ctx.lineTo(node.x, node.y - 8);
          ctx.lineTo(node.x + 8, node.y);
          ctx.lineTo(node.x, node.y + 8);
          ctx.closePath();
          ctx.strokeStyle = "#FF4FA3";
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(198, 255, 0, 0.7)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Draw node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isAnchor) {
          if (theme === "crimson-noir") {
            ctx.shadowBlur = 18;
            ctx.shadowColor = "#D41514";
          }
          ctx.fillStyle = anchorFill;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = anchorStroke;
          ctx.stroke();

          // Anchor coordinate label
          ctx.font = "9px monospace";
          ctx.fillStyle = labelFill;
          ctx.fillText(`[${node.dimension}]`, node.x + 8, node.y - 6);
        } else {
          // Non-anchor nodes
          if (theme === "signal-studio" && i % 4 === 0) {
            // Studio secondary hub node in Toxic Turquoise with Electric Violet halo
            ctx.fillStyle = "#00E5D4";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 1.6, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(105, 56, 255, 0.4)";
            ctx.lineWidth = 1.2;
            ctx.stroke();
          } else if (theme === "signal-studio" && i % 3 === 0) {
            ctx.fillStyle = "#FF7139";
            ctx.fill();
          } else {
            ctx.fillStyle = nodeFill;
            ctx.fill();
          }
        }
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (isReducedMotion) {
      // Single static render for reduced motion
      render(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, [isReducedMotion, theme]);

  // Dynamic HUD classes per theme
  let hudBadgeClass = "bg-white/95 border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  let hudBottomClass = "bg-white/95 border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  let hudAccentColor = "text-[#FF3B00]";
  let hudDotColor = "bg-[#CCFF00]";
  let strongColor = "text-black";
  let subColor = "text-black/70";

  if (theme === "crimson-noir") {
    hudBadgeClass = "bg-[#111115]/95 border-[#2e2e38] text-[#CDCBCA] shadow-[0_4px_12px_rgba(0,0,0,0.8)] rounded-[2px]";
    hudBottomClass = "bg-[#111115]/95 border-[#2e2e38] text-[#CDCBCA] shadow-[0_6px_20px_rgba(0,0,0,0.9)] rounded-[2px]";
    hudAccentColor = "text-[#FF453A]";
    hudDotColor = "bg-[#FF453A]";
    strongColor = "text-white";
    subColor = "text-[#9A9896]";
  } else if (theme === "signal-studio") {
    hudBadgeClass = "bg-[#FFFAEC]/95 border-2 border-[#1B1020] text-[#1B1020] shadow-[3px_3px_0px_0px_#6938FF] rounded-sm font-black";
    hudBottomClass = "bg-[#FFFAEC]/95 border-2 border-[#1B1020] text-[#1B1020] shadow-[4px_4px_0px_0px_#FF4FA3] rounded-sm font-bold";
    hudAccentColor = "text-[#FF4FA3]";
    hudDotColor = "bg-[#C6FF00]";
    strongColor = "text-[#1B1020]";
    subColor = "text-[#543D5B]";
  }

  return (
    <div
      ref={containerRef}
      data-neural-visualizer="true"
      className="relative w-full h-[280px] xs:h-[320px] sm:h-[420px] lg:h-[540px] border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair touch-none"
        aria-label="Interactive Neural Tensor Lattice Visualization"
      />

      {/* Top Left Status Annotation */}
      <div className={`absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] tracking-wider border px-1.5 sm:px-2 py-0.5 sm:py-1 pointer-events-none z-10 ${hudBadgeClass}`}>
        <Activity className={`w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse ${hudAccentColor}`} />
        <span className="font-bold">TENSOR_GRAPH</span>
        <span className="hidden sm:inline">{"//"} NEURAL_LATTICE</span>
      </div>

      {/* Top Right Reduced Motion or Interactivity Badge */}
      <div className={`absolute top-2.5 sm:top-3 right-2.5 sm:right-3 flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] tracking-wider border px-1.5 sm:px-2 py-0.5 sm:py-1 z-10 ${hudBadgeClass}`}>
        <span className={`h-1.5 w-1.5 rounded-full border border-black/40 ${hudDotColor}`}></span>
        <span>{isReducedMotion ? "STATIC [REDUCED MOTION]" : "INTERACTIVE"}</span>
        <span className="hidden sm:inline">{!isReducedMotion && " EMBEDDINGS"}</span>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className={`absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] border px-2 sm:px-3 py-1 sm:py-1.5 z-10 ${hudBottomClass}`}>
        <div className={`flex items-center gap-2 sm:gap-3 ${subColor}`}>
          <span>
            NODES: <strong className={strongColor}>{telemetry.nodeCount}</strong>
          </span>
          <span>{"//"}</span>
          <span>
            SYNAPSES: <strong className={hudAccentColor}>{telemetry.activeConnections}</strong>
          </span>
          <span className="hidden sm:inline">{"//"}</span>
          <span className="hidden sm:inline">
            SIMILARITY_MEAN: <strong className={strongColor}>{telemetry.cosineMean}</strong>
          </span>
        </div>
        <div className={`flex items-center gap-2 sm:gap-3 ${subColor}`}>
          <span>FPS: {Number.isFinite(telemetry.fps) && telemetry.fps > 0 ? telemetry.fps : "--"}</span>
          <span className={`hidden sm:inline font-bold ${hudAccentColor}`}>DRAG / HOVER TO ROTATE</span>
        </div>
      </div>
    </div>
  );
}
