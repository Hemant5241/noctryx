"use client";

import { useState } from "react";
import { Eye, ShieldCheck } from "lucide-react";

interface DetectedObject {
  id: string;
  trackId: number;
  label: string;
  confidence: number;
  color: string;
  box: { x: number; y: number; w: number; h: number }; // percentage coordinates
  telemetry: {
    velocity: string;
    areaPx: string;
    centroid: string;
  };
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  resolution: string;
  objects: DetectedObject[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "sc-traffic",
    name: "Autonomous Edge Traffic Telemetry",
    description: "Multi-class spatial vehicle and pedestrian tracking with Kalman occlusion association.",
    resolution: "1920x1080 @ 60 FPS",
    objects: [
      {
        id: "obj-01",
        trackId: 104,
        label: "AUTONOMOUS_BUS",
        confidence: 0.984,
        color: "#FF3B00",
        box: { x: 12, y: 22, w: 34, h: 48 },
        telemetry: { velocity: "38.4 km/h", areaPx: "184,200 px²", centroid: "(420, 510)" },
      },
      {
        id: "obj-02",
        trackId: 105,
        label: "CYCLIST",
        confidence: 0.942,
        color: "#CCFF00",
        box: { x: 55, y: 38, w: 14, h: 36 },
        telemetry: { velocity: "18.2 km/h", areaPx: "48,600 px²", centroid: "(1120, 680)" },
      },
      {
        id: "obj-03",
        trackId: 106,
        label: "PEDESTRIAN",
        confidence: 0.916,
        color: "#F4F1EA",
        box: { x: 78, y: 32, w: 10, h: 42 },
        telemetry: { velocity: "4.8 km/h", areaPx: "32,400 px²", centroid: "(1540, 620)" },
      },
    ],
  },
  {
    id: "sc-warehouse",
    name: "Warehouse Robotics SLAM & Spatial Mesh",
    description: "Pallet recognition, AGV clearance cones, and dynamic obstacle distance bounding.",
    resolution: "1920x1080 @ 64 FPS",
    objects: [
      {
        id: "obj-04",
        trackId: 201,
        label: "PALLET_PAYLOAD",
        confidence: 0.991,
        color: "#CCFF00",
        box: { x: 25, y: 45, w: 30, h: 35 },
        telemetry: { velocity: "0.0 km/h [STATIC]", areaPx: "210,000 px²", centroid: "(640, 720)" },
      },
      {
        id: "obj-05",
        trackId: 202,
        label: "AGV_ROBOT",
        confidence: 0.978,
        color: "#FF3B00",
        box: { x: 62, y: 35, w: 26, h: 45 },
        telemetry: { velocity: "8.5 km/h", areaPx: "155,000 px²", centroid: "(1380, 640)" },
      },
    ],
  },
  {
    id: "sc-industrial",
    name: "High-Speed Industrial Surface Inspection",
    description: "Micro-defect boundary localization and surface porosity inspection on steel coil rolling.",
    resolution: "2048x1536 @ 75 FPS",
    objects: [
      {
        id: "obj-06",
        trackId: 301,
        label: "SURFACE_MICRO_SCRATCH",
        confidence: 0.963,
        color: "#FF3B00",
        box: { x: 38, y: 28, w: 18, h: 22 },
        telemetry: { velocity: "CONVEYOR_SYNC", areaPx: "14,800 px²", centroid: "(880, 440)" },
      },
      {
        id: "obj-07",
        trackId: 302,
        label: "EDGE_POROSITY",
        confidence: 0.887,
        color: "#CCFF00",
        box: { x: 68, y: 52, w: 15, h: 18 },
        telemetry: { velocity: "CONVEYOR_SYNC", areaPx: "9,200 px²", centroid: "(1420, 810)" },
      },
    ],
  },
];

export function VisionAiDemo() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCENARIOS[0].id);
  const [runtimeEngine, setRuntimeEngine] = useState<"tensorrt" | "fp16" | "onnx">("tensorrt");
  const [confThreshold, setConfThreshold] = useState(0.85);
  const [selectedObject, setSelectedObject] = useState<DetectedObject | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  // Filter detected objects by confidence threshold
  const activeObjects = scenario.objects.filter((obj) => obj.confidence >= confThreshold);

  const engineSpecs = {
    tensorrt: { fps: "64.8 FPS", latency: "8.6ms", vram: "1.2 GB", precision: "INT8 TensorRT" },
    fp16: { fps: "44.2 FPS", latency: "14.8ms", vram: "2.4 GB", precision: "FP16 CUDA" },
    onnx: { fps: "22.6 FPS", latency: "31.2ms", vram: "0.8 GB", precision: "ONNX Runtime CPU" },
  }[runtimeEngine];

  return (
    <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner font-mono text-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b-2 border-black bg-[#0D0D0D] text-[#F4F1EA]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#CCFF00]" />
          <span className="font-bold text-sm tracking-wide">
            VISION AI EDGE INFERENCE RUNTIME // SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#A39F94]">
          <span className="text-[#CCFF00] font-bold">RATE: {engineSpecs.fps}</span>
          <span>{"//"}</span>
          <span className="text-[#FF3B00] font-bold">LATENCY: {engineSpecs.latency}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Scenario Selection Tabs */}
        <div>
          <label className="text-[10px] text-black/60 font-bold uppercase block mb-2">
            FEED SCENARIOS // SELECT INPUT STREAM:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedScenarioId(s.id);
                  setSelectedObject(null);
                }}
                className={`p-2.5 text-left border transition-all cursor-pointer ${
                  selectedScenarioId === s.id
                    ? "bg-black text-[#F4F1EA] border-black shadow-[3px_3px_0px_0px_rgba(255,59,0,1)]"
                    : "bg-[#F4F1EA] text-black border-black/30 hover:border-black"
                }`}
              >
                <div className="text-[10px] text-[#FF3B00] font-bold">STREAM: {s.resolution}</div>
                <div className="font-bold text-xs truncate mt-0.5">{s.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Viewfinder Canvas Simulation */}
        <div className="relative w-full h-[360px] sm:h-[440px] bg-[#0D0D0D] border-2 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none">
          {/* Simulated scanning line animation */}
          <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none"></div>

          {/* Top telemetry overlay inside viewfinder */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-[#F4F1EA] bg-black/80 border border-[#262626] px-3 py-1.5 z-20">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF3B00] animate-ping"></span>
              <span className="font-bold">INFERENCE ENGINE: {engineSpecs.precision}</span>
            </div>
            <div className="flex items-center gap-3 text-[#A39F94]">
              <span>DETECTIONS: {activeObjects.length}</span>
              <span>{"//"}</span>
              <span>VRAM: {engineSpecs.vram}</span>
            </div>
          </div>

          {/* Center Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-12 h-12 border-t-2 border-b-2 border-l-2 border-r-2 border-[#CCFF00]"></div>
            <div className="absolute w-2 h-2 bg-[#FF3B00]"></div>
          </div>

          {/* Render Bounding Boxes */}
          {activeObjects.map((obj) => {
            const isSelected = selectedObject?.id === obj.id;
            return (
              <div
                key={obj.id}
                onClick={() => setSelectedObject(obj)}
                className={`absolute cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-white z-30" : "z-10 hover:opacity-100"
                }`}
                style={{
                  left: `${obj.box.x}%`,
                  top: `${obj.box.y}%`,
                  width: `${obj.box.w}%`,
                  height: `${obj.box.h}%`,
                  border: `2px solid ${obj.color}`,
                  backgroundColor: `${obj.color}15`,
                }}
              >
                {/* Header tag */}
                <div
                  className="absolute -top-6 left-0 px-1.5 py-0.5 text-[9px] font-bold tracking-tight text-black flex items-center gap-1.5 whitespace-nowrap"
                  style={{ backgroundColor: obj.color }}
                >
                  <span>{obj.label}</span>
                  <span className="opacity-75">{(obj.confidence * 100).toFixed(1)}%</span>
                </div>

                {/* ID marker */}
                <div className="absolute bottom-1 right-1 text-[8px] font-bold text-white bg-black/70 px-1">
                  ID: #{obj.trackId}
                </div>
              </div>
            );
          })}

          {/* Bottom Feed Status */}
          <div className="absolute bottom-3 left-3 text-[10px] text-[#A39F94] bg-black/80 px-2 py-1 border border-[#262626]">
            CLICK ANY BOUNDING BOX TO INSPECT SPATIAL TELEMETRY
          </div>
        </div>

        {/* Runtime Controls & Selected Object Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="md:col-span-6 space-y-4 p-4 border border-black/20 bg-[#F4F1EA]/60">
            <div>
              <label className="text-[10px] text-black/60 font-bold uppercase block mb-1.5">
                EXECUTION PROVIDER:
              </label>
              <div className="grid grid-cols-3 gap-1 border border-black bg-white p-1">
                {(["tensorrt", "fp16", "onnx"] as const).map((eng) => (
                  <button
                    key={eng}
                    type="button"
                    onClick={() => setRuntimeEngine(eng)}
                    className={`py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      runtimeEngine === eng
                        ? "bg-black text-[#F4F1EA]"
                        : "text-black hover:bg-black/5"
                    }`}
                  >
                    {eng}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-black/60 font-bold uppercase mb-1.5">
                <span>CONFIDENCE THRESHOLD:</span>
                <span className="text-[#FF3B00]">{(confThreshold * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0.7}
                max={0.98}
                step={0.02}
                value={confThreshold}
                onChange={(e) => setConfThreshold(Number(e.target.value))}
                className="w-full accent-[#FF3B00] cursor-pointer"
                aria-label="Confidence Threshold Slider"
              />
            </div>
          </div>

          {/* Inspector Column */}
          <div className="md:col-span-6 p-4 border-2 border-black bg-white">
            <div className="text-[10px] text-black/60 font-bold uppercase tracking-wider mb-2 flex items-center justify-between border-b border-black/15 pb-1">
              <span>OBJECT SPATIAL INSPECTOR</span>
              {selectedObject && (
                <span className="text-[#FF3B00] font-bold">
                  ACTIVE ID: #{selectedObject.trackId}
                </span>
              )}
            </div>

            {selectedObject ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-black/60">CLASS LABEL:</span>
                  <span className="font-bold text-black">{selectedObject.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">CONFIDENCE:</span>
                  <span className="font-bold text-[#FF3B00]">
                    {(selectedObject.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">ESTIMATED VELOCITY:</span>
                  <span className="font-bold text-black">{selectedObject.telemetry.velocity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">SPATIAL CENTROID:</span>
                  <span className="font-bold text-black">{selectedObject.telemetry.centroid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">BOUNDING AREA:</span>
                  <span className="font-bold text-black">{selectedObject.telemetry.areaPx}</span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-black/50 text-[11px]">
                Click any bounding box inside the viewfinder above to inspect its Kalman tracker state
                and tensor coordinates.
              </div>
            )}
          </div>
        </div>

        {/* Verification Note */}
        <div className="p-3 border border-black/20 bg-[#F4F1EA] text-[10px] text-black/70 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>
              TRANSPARENCY: Real-time bounding box tracking is simulated in-browser to demonstrate edge CV architecture.
            </span>
          </span>
          <span className="font-bold text-black">LOCAL COMPUTED SIMULATION</span>
        </div>
      </div>
    </div>
  );
}
