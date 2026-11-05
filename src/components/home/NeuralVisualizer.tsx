"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Activity } from "lucide-react";

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

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

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
    let lastTime = performance.now();
    let frameCounter = 0;
    let edgeCount = 0;

    const render = (time: number) => {
      frameCounter++;
      if (time - lastTime >= 1000) {
        setTelemetry((prev) => ({
          ...prev,
          nodeCount: nodes.length,
          activeConnections: edgeCount,
          fps: Math.round((frameCounter * 1000) / (time - lastTime)),
        }));
        frameCounter = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw subtle coordinate background grid
      ctx.strokeStyle = "rgba(13, 13, 13, 0.05)";
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
              ctx.strokeStyle = `rgba(255, 59, 0, ${alpha * 0.8})`;
              ctx.lineWidth = 1.5;
            } else {
              ctx.strokeStyle = `rgba(13, 13, 13, ${alpha * 0.22})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
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

        // Draw node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isAnchor) {
          ctx.fillStyle = "#FF3B00";
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "#0D0D0D";
          ctx.stroke();

          // Anchor coordinate label
          ctx.font = "9px monospace";
          ctx.fillStyle = "#0D0D0D";
          ctx.fillText(`[${node.dimension}]`, node.x + 8, node.y - 6);
        } else {
          ctx.fillStyle = "#0D0D0D";
          ctx.fill();
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
      window.removeEventListener("resize", handleResize);
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] border-2 border-black bg-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        aria-label="Interactive Neural Tensor Lattice Visualization"
      />

      {/* Top Left Status Annotation */}
      <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[10px] tracking-wider bg-white/90 border border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] pointer-events-none">
        <Activity className="w-3.5 h-3.5 text-[#FF3B00] animate-pulse" />
        <span className="font-bold">TENSOR_GRAPH {"//"} NEURAL_LATTICE</span>
      </div>

      {/* Top Right Reduced Motion or Interactivity Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-2 font-mono text-[10px] tracking-wider bg-white/90 border border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00] border border-black"></span>
        <span>{isReducedMotion ? "STATIC PROJECTION [REDUCED MOTION]" : "INTERACTIVE EMBEDDINGS"}</span>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] bg-white/95 border border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 text-black/80">
          <span>
            NODES: <strong className="text-black">{telemetry.nodeCount}</strong>
          </span>
          <span>{"//"}</span>
          <span>
            SYNAPSES: <strong className="text-[#FF3B00]">{telemetry.activeConnections}</strong>
          </span>
          <span className="hidden sm:inline">{"//"}</span>
          <span className="hidden sm:inline">
            SIMILARITY_MEAN: <strong className="text-black">{telemetry.cosineMean}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-black/60">
          <span>FPS: {telemetry.fps}</span>
          <span className="hidden sm:inline text-[#FF3B00] font-bold">DRAG / HOVER TO ROTATE</span>
        </div>
      </div>
    </div>
  );
}
