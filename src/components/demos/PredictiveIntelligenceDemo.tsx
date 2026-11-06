"use client";

import { useState } from "react";
import { LineChart, AlertTriangle, RefreshCw, ShieldCheck } from "lucide-react";

const DATASETS = [
  {
    id: "gpu-load",
    name: "GPU Cluster Utilization & Thermal Telemetry",
    unit: "% LOAD",
    horizon: "48H",
    baselinePoints: [
      { time: "00:00", historical: 42 },
      { time: "04:00", historical: 38 },
      { time: "08:00", historical: 54 },
      { time: "12:00", historical: 78 },
      { time: "16:00", historical: 84 },
      { time: "20:00", historical: 68 },
      { time: "24:00", historical: 46 },
    ],
    forecastPoints: [
      { time: "+06H", medianForecast: 52, upperQuantile: 62, lowerQuantile: 44 },
      { time: "+12H", medianForecast: 74, upperQuantile: 88, lowerQuantile: 60 },
      { time: "+24H", medianForecast: 86, upperQuantile: 98, lowerQuantile: 74 },
      { time: "+36H", medianForecast: 70, upperQuantile: 85, lowerQuantile: 55 },
      { time: "+48H", medianForecast: 50, upperQuantile: 65, lowerQuantile: 38 },
    ],
    features: [
      { name: "Batched Tensor Size", contribution: "38.4%" },
      { name: "KV-Cache Memory Footprint", contribution: "29.2%" },
      { name: "Host-to-Device Copy Time", contribution: "19.8%" },
      { name: "Ambient Thermal Sensor", contribution: "12.6%" },
    ],
  },
  {
    id: "api-latency",
    name: "Distributed API P99 Request Latency",
    unit: "MS",
    horizon: "24H",
    baselinePoints: [
      { time: "00:00", historical: 14 },
      { time: "04:00", historical: 12 },
      { time: "08:00", historical: 18 },
      { time: "12:00", historical: 26 },
      { time: "16:00", historical: 24 },
      { time: "20:00", historical: 20 },
      { time: "24:00", historical: 15 },
    ],
    forecastPoints: [
      { time: "+04H", medianForecast: 17, upperQuantile: 22, lowerQuantile: 13 },
      { time: "+08H", medianForecast: 23, upperQuantile: 30, lowerQuantile: 18 },
      { time: "+16H", medianForecast: 29, upperQuantile: 38, lowerQuantile: 22 },
      { time: "+24H", medianForecast: 19, upperQuantile: 26, lowerQuantile: 14 },
    ],
    features: [
      { name: "Concurrent WebSocket Clients", contribution: "44.1%" },
      { name: "Vector Index Partition Lock", contribution: "26.5%" },
      { name: "Redis Serialization Overhead", contribution: "18.2%" },
      { name: "Worker Thread Pool Size", contribution: "11.2%" },
    ],
  },
];

export function PredictiveIntelligenceDemo() {
  const [selectedDatasetId, setSelectedDatasetId] = useState(DATASETS[0].id);
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);
  const [hasAnomaly, setHasAnomaly] = useState(false);

  const dataset = DATASETS.find((d) => d.id === selectedDatasetId) || DATASETS[0];

  const handleInjectAnomaly = () => {
    setHasAnomaly(true);
  };

  const handleReset = () => {
    setHasAnomaly(false);
  };

  return (
    <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner font-mono text-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b-2 border-black bg-[#0D0D0D] text-[#F4F1EA]">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-[#CCFF00]" />
          <span className="font-bold text-sm tracking-wide">
            TEMPORAL QUANTILE FORECASTER // REAL-TIME MODEL
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#A39F94]">
          <span className="text-[#CCFF00] font-bold">MAE: 0.042</span>
          <span>{"//"}</span>
          <span className="text-[#FF3B00] font-bold">ANOMALY F1: 0.938</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Dataset Selection */}
        <div>
          <label className="text-[10px] text-black/60 font-bold uppercase block mb-2">
            TELEMETRY STREAM // SELECT VARIABLE FOR TIME-SERIES:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DATASETS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDatasetId(d.id);
                  handleReset();
                }}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  selectedDatasetId === d.id
                    ? "bg-black text-[#F4F1EA] border-black shadow-[3px_3px_0px_0px_rgba(255,59,0,1)]"
                    : "bg-[#F4F1EA] text-black border-black/30 hover:border-black"
                }`}
              >
                <div className="font-bold text-xs truncate">{d.name}</div>
                <div className="text-[10px] text-[#FF3B00] font-bold mt-1">
                  TARGET: {d.unit} {"//"} HORIZON: {d.horizon}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Controls Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 border border-black/20 bg-[#F4F1EA]/60">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowConfidenceBands(!showConfidenceBands)}
              className={`px-3 py-1.5 text-xs font-bold border border-black transition-colors cursor-pointer ${
                showConfidenceBands ? "bg-black text-[#F4F1EA]" : "bg-white text-black"
              }`}
            >
              QUANTILE BANDS [10%-90%]: {showConfidenceBands ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={handleInjectAnomaly}
              className="px-3 py-1.5 bg-[#FF3B00] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>INJECT SYNTHETIC DRIFT</span>
            </button>

            {hasAnomaly && (
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 border border-black bg-white text-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESTORE</span>
              </button>
            )}
          </div>

          <div className="text-[10px] text-black/60 font-bold">
            CONFIDENCE CALIBRATION: 95.4%
          </div>
        </div>

        {/* Dynamic SVG Visual Chart */}
        <div className="border-2 border-black bg-[#0D0D0D] p-5 relative select-none">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-4 text-[10px] text-[#A39F94]">
            <div className="flex items-center gap-2">
              <span className="text-[#CCFF00] font-bold">HISTORICAL TELEMETRY</span>
              <span>{"//"}</span>
              <span className="text-[#FF3B00] font-bold">ATTENTION FORECAST</span>
            </div>
            {hasAnomaly && (
              <span className="bg-[#FF3B00] text-black font-bold px-1.5 py-0.5 animate-pulse">
                DRIFT DETECTED: WASSERSTEIN DIST = 0.482
              </span>
            )}
          </div>

          {/* SVG Chart Rendering */}
          <div className="h-56 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#262626" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#262626" strokeDasharray="3 3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#262626" strokeDasharray="3 3" />

              {/* Dividing Now Line */}
              <line x1="260" y1="0" x2="260" y2="200" stroke="#FF3B00" strokeWidth="1.5" />
              <text x="265" y="20" fill="#FF3B00" fontSize="10" fontFamily="monospace">
                NOW (t=0)
              </text>

              {/* Confidence Band Polygon */}
              {showConfidenceBands && (
                <polygon
                  points="260,110 320,80 380,45 440,75 500,115 500,165 440,140 380,110 320,135 260,110"
                  fill="rgba(255, 59, 0, 0.2)"
                />
              )}

              {/* Historical Path */}
              <polyline
                points="10,120 50,130 90,95 130,50 170,40 210,70 260,110"
                fill="none"
                stroke="#CCFF00"
                strokeWidth="2.5"
              />

              {/* Projected Future Median Path */}
              <polyline
                points={
                  hasAnomaly
                    ? "260,110 320,40 380,15 440,30 500,45"
                    : "260,110 320,105 380,75 440,105 500,140"
                }
                fill="none"
                stroke="#FF3B00"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* Anomaly Callout Circle */}
              {hasAnomaly && (
                <g>
                  <circle cx="380" cy="15" r="8" fill="none" stroke="#FF3B00" strokeWidth="2" />
                  <circle cx="380" cy="15" r="4" fill="#FF3B00" />
                  <text x="340" y="35" fill="#FF3B00" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    ANOMALY SPIKE +88%
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="border-t border-[#262626] pt-2 mt-2 flex justify-between text-[10px] text-[#A39F94]">
            <span>-24H HISTORICAL TICKS</span>
            <span className="text-[#FF3B00]">CURRENT PROJECTION HORIZON: +48H</span>
          </div>
        </div>

        {/* Feature Importance Attribution Breakdown */}
        <div className="border-2 border-black bg-white p-4">
          <div className="text-[10px] text-black/60 font-bold uppercase tracking-wider mb-3 border-b border-black/15 pb-1">
            FEATURE IMPORTANCE ATTRIBUTION // DRIVING FACTORS
          </div>

          <div className="space-y-2">
            {dataset.features.map((feat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="font-bold text-black">{feat.name}</span>
                <span className="text-[#FF3B00] font-bold">{feat.contribution}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Note */}
        <div className="p-3 border border-black/20 bg-[#F4F1EA] text-[10px] text-black/70 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>
              TRANSPARENCY: Temporal forecasting simulation generated using client-side mathematical projection models.
            </span>
          </span>
          <span className="font-bold text-black">OFFLINE CAPABLE ENGINE</span>
        </div>
      </div>
    </div>
  );
}
