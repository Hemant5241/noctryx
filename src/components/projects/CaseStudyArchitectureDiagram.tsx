"use client";

import React from "react";

export type ArchitectureDiagramType =
  | "vector-cascade"
  | "vision-edge"
  | "agent-dag"
  | "temporal-forecast"
  | "grounded-rag";

interface CaseStudyArchitectureDiagramProps {
  type: ArchitectureDiagramType;
  projectTitle: string;
}

export function CaseStudyArchitectureDiagram({
  type,
  projectTitle,
}: CaseStudyArchitectureDiagramProps) {
  return (
    <figure
      role="figure"
      aria-label={`System Architecture Flow Diagram for ${projectTitle}`}
      className="architecture-diagram p-6 sm:p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4 mb-6">
        <div>
          <span className="text-[10px] text-[#FF3B00] font-bold uppercase tracking-wider block">
            ARCHITECTURAL SCHEMATIC //
          </span>
          <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
            SYSTEM TOPOLOGY & DATA EXECUTION GRAPH
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 border border-black bg-[#CCFF00] text-black font-bold">
            CLIENT SIMULATION
          </span>
          <span className="px-2 py-0.5 border border-black bg-black text-[#F4F1EA] font-bold">
            CONCEPTUAL BACKEND
          </span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="w-full overflow-x-auto py-2">
        <div className="min-w-[680px]">
          {type === "vector-cascade" && <VectorCascadeSvg />}
          {type === "vision-edge" && <VisionEdgeSvg />}
          {type === "agent-dag" && <AgentDagSvg />}
          {type === "temporal-forecast" && <TemporalForecastSvg />}
          {type === "grounded-rag" && <GroundedRagSvg />}
        </div>
      </div>

      <figcaption className="mt-4 pt-3 border-t border-black/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-black/60 font-mono">
        <span>FIGURE: Formal execution pipeline stages, vector transformations, and deterministic boundaries.</span>
        <span className="text-[#FF3B00] font-bold">BRUTALIST SCHEMATIC SPEC V2.4</span>
      </figcaption>
    </figure>
  );
}

// -----------------------------------------------------------------------------
// DIAGRAM 1: NEURAL SEARCH CASCADE
// -----------------------------------------------------------------------------
function VectorCascadeSvg() {
  return (
    <svg
      viewBox="0 0 760 220"
      className="w-full h-auto text-black font-mono select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrowhead-orange"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#FF3B00" />
        </marker>
        <marker
          id="arrowhead-black"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#0D0D0D" />
        </marker>
      </defs>

      {/* Stage 1: User Query */}
      <g transform="translate(10, 40)">
        <rect width="120" height="90" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="120" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">01. INGESTION</text>
        <text x="10" y="44" fill="#0D0D0D" fontSize="10" fontWeight="bold">USER QUERY</text>
        <text x="10" y="62" fill="#595650" fontSize="8">Token Normalize</text>
        <text x="10" y="76" fill="#595650" fontSize="8">Payload Filters</text>
        <rect x="10" y="86" width="100" height="4" fill="#CCFF00" />
      </g>

      {/* Arrow 1 */}
      <line
        x1="130"
        y1="85"
        x2="165"
        y2="85"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrowhead-orange)"
      />

      {/* Stage 2: Bi-Encoder */}
      <g transform="translate(170, 40)">
        <rect width="130" height="90" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="130" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">02. ENCODING</text>
        <text x="10" y="44" fill="#0D0D0D" fontSize="10" fontWeight="bold">BI-ENCODER</text>
        <text x="10" y="62" fill="#595650" fontSize="8">MiniLM 384-Dim</text>
        <text x="10" y="76" fill="#595650" fontSize="8">FP32 Vector Float</text>
        <text x="10" y="100" fill="#FF3B00" fontSize="8" fontWeight="bold">T &lt; 4.2ms</text>
      </g>

      {/* Arrow 2 */}
      <line
        x1="300"
        y1="85"
        x2="335"
        y2="85"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrowhead-orange)"
      />

      {/* Stage 3: HNSW & PQ8 */}
      <g transform="translate(340, 20)">
        <rect width="145" height="130" fill="#F4F1EA" stroke="#FF3B00" strokeWidth="2" strokeDasharray="4 2" />
        <rect x="0" y="0" width="145" height="22" fill="#FF3B00" />
        <text x="6" y="15" fill="#FFFFFF" fontSize="9" fontWeight="bold">03. VECTOR INDEX</text>
        <text x="10" y="46" fill="#0D0D0D" fontSize="11" fontWeight="bold">HNSW GRAPH</text>
        <text x="10" y="64" fill="#595650" fontSize="8">M=16, ef=128</text>
        <text x="10" y="80" fill="#0D0D0D" fontSize="9" fontWeight="bold">PQ8 COMPRESSION</text>
        <text x="10" y="96" fill="#595650" fontSize="8">4.1x Memory Cut</text>
        <text x="10" y="112" fill="#0D0D0D" fontSize="8">Top-50 Candidates</text>
        <rect x="10" y="126" width="125" height="4" fill="#0D0D0D" />
      </g>

      {/* Arrow 3 */}
      <line
        x1="485"
        y1="85"
        x2="520"
        y2="85"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrowhead-orange)"
      />

      {/* Stage 4: Cross-Encoder Re-Ranker */}
      <g transform="translate(525, 40)">
        <rect width="130" height="90" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="130" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">04. RE-RANKING</text>
        <text x="10" y="44" fill="#0D0D0D" fontSize="10" fontWeight="bold">CROSS-ENCODER</text>
        <text x="10" y="62" fill="#595650" fontSize="8">Full Cross-Attention</text>
        <text x="10" y="76" fill="#595650" fontSize="8">Reciprocal Rank Fuse</text>
        <text x="10" y="100" fill="#0D0D0D" fontSize="8" fontWeight="bold">Score Top-10</text>
      </g>

      {/* Arrow 4 */}
      <line
        x1="655"
        y1="85"
        x2="685"
        y2="85"
        stroke="#0D0D0D"
        strokeWidth="2"
        markerEnd="url(#arrowhead-black)"
      />

      {/* Output */}
      <g transform="translate(690, 50)">
        <rect width="60" height="70" fill="#CCFF00" stroke="#0D0D0D" strokeWidth="2" />
        <text x="8" y="28" fill="#0D0D0D" fontSize="9" fontWeight="black">RANKED</text>
        <text x="8" y="44" fill="#0D0D0D" fontSize="9" fontWeight="black">RESULTS</text>
        <text x="8" y="60" fill="#0D0D0D" fontSize="8">P99&lt;15ms</text>
      </g>

      {/* Parallel Lexical Sparse Track */}
      <path
        d="M 130 115 L 150 170 L 515 170 L 525 110"
        fill="none"
        stroke="#595650"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <text x="280" y="185" fill="#595650" fontSize="8" fontWeight="bold">
        PARALLEL BM25 SPARSE LEXICAL SCORING (HYBRID FALLBACK)
      </text>
    </svg>
  );
}

// -----------------------------------------------------------------------------
// DIAGRAM 2: VISION EDGE PIPELINE
// -----------------------------------------------------------------------------
function VisionEdgeSvg() {
  return (
    <svg
      viewBox="0 0 760 220"
      className="w-full h-auto text-black font-mono select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrow-vision-orange"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#FF3B00" />
        </marker>
        <marker
          id="arrow-vision-black"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#0D0D0D" />
        </marker>
      </defs>

      {/* Input Frame */}
      <g transform="translate(10, 40)">
        <rect width="115" height="95" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="115" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">CAMERA STREAM</text>
        <text x="8" y="44" fill="#0D0D0D" fontSize="10" fontWeight="bold">1080p60 RTSP</text>
        <text x="8" y="62" fill="#595650" fontSize="8">Hardware NVDEC</text>
        <text x="8" y="78" fill="#595650" fontSize="8">Zero-Copy Buffer</text>
        <rect x="8" y="90" width="99" height="4" fill="#CCFF00" />
      </g>

      <line
        x1="125"
        y1="87"
        x2="160"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-vision-orange)"
      />

      {/* Preprocessing */}
      <g transform="translate(165, 40)">
        <rect width="125" height="95" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="125" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">PRE-PROCESSING</text>
        <text x="8" y="44" fill="#0D0D0D" fontSize="10" fontWeight="bold">CUDA WARP</text>
        <text x="8" y="62" fill="#595650" fontSize="8">Bilinear Resize 640²</text>
        <text x="8" y="78" fill="#595650" fontSize="8">BGR to RGB Float</text>
        <text x="8" y="98" fill="#FF3B00" fontSize="8" fontWeight="bold">Lat: 0.8ms</text>
      </g>

      <line
        x1="290"
        y1="87"
        x2="325"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-vision-orange)"
      />

      {/* TensorRT Engine */}
      <g transform="translate(330, 25)">
        <rect width="150" height="125" fill="#0D0D0D" stroke="#FF3B00" strokeWidth="2" />
        <rect x="0" y="0" width="150" height="22" fill="#FF3B00" />
        <text x="6" y="15" fill="#0D0D0D" fontSize="9" fontWeight="black">INFERENCE ENGINE</text>
        <text x="10" y="48" fill="#CCFF00" fontSize="11" fontWeight="bold">TENSORRT INT8</text>
        <text x="10" y="66" fill="#A39F94" fontSize="8">Entropy Calibrated</text>
        <text x="10" y="82" fill="#F4F1EA" fontSize="8">FP16 Fallback Layer</text>
        <text x="10" y="100" fill="#CCFF00" fontSize="9" fontWeight="bold">&gt; 60 FPS EDGE</text>
        <text x="10" y="118" fill="#A39F94" fontSize="8">CUDA Unified Mem</text>
      </g>

      <line
        x1="480"
        y1="87"
        x2="515"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-vision-orange)"
      />

      {/* Spatial Tracker */}
      <g transform="translate(520, 40)">
        <rect width="130" height="95" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="130" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">SPATIAL TRACKER</text>
        <text x="8" y="44" fill="#0D0D0D" fontSize="10" fontWeight="bold">BYTETRACK</text>
        <text x="8" y="62" fill="#595650" fontSize="8">Kalman Velocity Filter</text>
        <text x="8" y="78" fill="#595650" fontSize="8">Low-Score Box Match</text>
        <text x="8" y="98" fill="#0D0D0D" fontSize="8" fontWeight="bold">ID Stability</text>
      </g>

      <line
        x1="650"
        y1="87"
        x2="680"
        y2="87"
        stroke="#0D0D0D"
        strokeWidth="2"
        markerEnd="url(#arrow-vision-black)"
      />

      {/* Output Telemetry */}
      <g transform="translate(685, 48)">
        <rect width="65" height="75" fill="#CCFF00" stroke="#0D0D0D" strokeWidth="2" />
        <text x="6" y="24" fill="#0D0D0D" fontSize="8" fontWeight="black">HUD OVERLAY</text>
        <text x="6" y="40" fill="#0D0D0D" fontSize="8">Bounding Box</text>
        <text x="6" y="54" fill="#0D0D0D" fontSize="8">Centroid Vector</text>
        <text x="6" y="68" fill="#0D0D0D" fontSize="8" fontWeight="bold">&lt; 9ms LAT</text>
      </g>
    </svg>
  );
}

// -----------------------------------------------------------------------------
// DIAGRAM 3: AGENTIC WORKFLOW DAG
// -----------------------------------------------------------------------------
function AgentDagSvg() {
  return (
    <svg
      viewBox="0 0 760 220"
      className="w-full h-auto text-black font-mono select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrow-dag-orange"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#FF3B00" />
        </marker>
        <marker
          id="arrow-dag-black"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#0D0D0D" />
        </marker>
      </defs>

      {/* Task Specification */}
      <g transform="translate(10, 60)">
        <rect width="115" height="85" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="115" height="18" fill="#0D0D0D" />
        <text x="6" y="13" fill="#F4F1EA" fontSize="8" fontWeight="bold">TASK INITIATION</text>
        <text x="8" y="40" fill="#0D0D0D" fontSize="10" fontWeight="bold">USER GOAL</text>
        <text x="8" y="56" fill="#595650" fontSize="8">Schema Contract</text>
        <text x="8" y="72" fill="#595650" fontSize="8">Bounded Scope</text>
      </g>

      <line
        x1="125"
        y1="102"
        x2="160"
        y2="102"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-dag-orange)"
      />

      {/* Planner / Coordinator */}
      <g transform="translate(165, 45)">
        <rect width="130" height="115" fill="#0D0D0D" stroke="#FF3B00" strokeWidth="2" />
        <rect x="0" y="0" width="130" height="20" fill="#FF3B00" />
        <text x="6" y="14" fill="#0D0D0D" fontSize="8" fontWeight="black">COORDINATOR</text>
        <text x="10" y="44" fill="#F4F1EA" fontSize="10" fontWeight="bold">PLANNER AGENT</text>
        <text x="10" y="62" fill="#A39F94" fontSize="8">DAG Deconstruction</text>
        <text x="10" y="78" fill="#A39F94" fontSize="8">LangGraph Engine</text>
        <text x="10" y="96" fill="#CCFF00" fontSize="8" fontWeight="bold">Immutable State</text>
        <text x="10" y="112" fill="#A39F94" fontSize="8">Cycle Bound N=3</text>
      </g>

      {/* Split to Branch 1 & Branch 2 */}
      <path
        d="M 295 85 L 340 50"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-dag-orange)"
      />
      <path
        d="M 295 120 L 340 155"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-dag-orange)"
      />

      {/* Worker Node A: Web & Search Worker */}
      <g transform="translate(345, 15)">
        <rect width="135" height="70" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <text x="8" y="22" fill="#0D0D0D" fontSize="9" fontWeight="bold">RESEARCH AGENT</text>
        <text x="8" y="38" fill="#595650" fontSize="8">Dense Vector Tools</text>
        <text x="8" y="52" fill="#595650" fontSize="8">Web API Extractors</text>
        <text x="8" y="66" fill="#FF3B00" fontSize="8" fontWeight="bold">Pydantic Output</text>
      </g>

      {/* Worker Node B: Execution Sandbox */}
      <g transform="translate(345, 120)">
        <rect width="135" height="70" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <text x="8" y="22" fill="#0D0D0D" fontSize="9" fontWeight="bold">CODE WORKER</text>
        <text x="8" y="38" fill="#595650" fontSize="8">Docker Wasm Runtime</text>
        <text x="8" y="52" fill="#595650" fontSize="8">Static Analysis</text>
        <text x="8" y="66" fill="#FF3B00" fontSize="8" fontWeight="bold">Deterministic Eval</text>
      </g>

      {/* Join to Evaluator */}
      <path
        d="M 480 50 L 525 85"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-dag-orange)"
      />
      <path
        d="M 480 155 L 525 120"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-dag-orange)"
      />

      {/* Evaluator / Guardrail */}
      <g transform="translate(530, 50)">
        <rect width="125" height="100" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="125" height="18" fill="#0D0D0D" />
        <text x="6" y="13" fill="#F4F1EA" fontSize="8" fontWeight="bold">VALIDATION NODE</text>
        <text x="8" y="40" fill="#0D0D0D" fontSize="10" fontWeight="bold">EVALUATOR</text>
        <text x="8" y="56" fill="#595650" fontSize="8">Schema Conformance</text>
        <text x="8" y="70" fill="#595650" fontSize="8">Self-Healing Check</text>
        <text x="8" y="88" fill="#0D0D0D" fontSize="8" fontWeight="bold">PASS / REVISE</text>
      </g>

      {/* Loop back from Evaluator to Planner if failed */}
      <path
        d="M 590 50 L 590 10 L 230 10 L 230 40"
        stroke="#FF3B00"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        markerEnd="url(#arrow-dag-orange)"
      />
      <text x="350" y="8" fill="#FF3B00" fontSize="7" fontWeight="bold">
        CRITIC SELF-HEALING LOOP (MAX N=3 REVISIONS)
      </text>

      {/* Final verified output */}
      <line
        x1="655"
        y1="100"
        x2="690"
        y2="100"
        stroke="#0D0D0D"
        strokeWidth="2"
        markerEnd="url(#arrow-dag-black)"
      />

      <g transform="translate(695, 65)">
        <rect width="60" height="70" fill="#CCFF00" stroke="#0D0D0D" strokeWidth="2" />
        <text x="6" y="24" fill="#0D0D0D" fontSize="8" fontWeight="black">VERIFIED</text>
        <text x="6" y="40" fill="#0D0D0D" fontSize="8" fontWeight="black">OUTPUT</text>
        <text x="6" y="58" fill="#0D0D0D" fontSize="7">Zero Loop</text>
      </g>
    </svg>
  );
}

// -----------------------------------------------------------------------------
// DIAGRAM 4: TEMPORAL FORECASTING & DRIFT
// -----------------------------------------------------------------------------
function TemporalForecastSvg() {
  return (
    <svg
      viewBox="0 0 760 220"
      className="w-full h-auto text-black font-mono select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrow-pred-orange"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#FF3B00" />
        </marker>
        <marker
          id="arrow-pred-black"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#0D0D0D" />
        </marker>
      </defs>

      {/* Raw Time Series */}
      <g transform="translate(10, 40)">
        <rect width="115" height="95" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="115" height="18" fill="#0D0D0D" />
        <text x="6" y="13" fill="#F4F1EA" fontSize="8" fontWeight="bold">01. INGESTION</text>
        <text x="8" y="42" fill="#0D0D0D" fontSize="9" fontWeight="bold">TELEMETRY DATA</text>
        <text x="8" y="58" fill="#595650" fontSize="8">Multivariate Lags</text>
        <text x="8" y="72" fill="#595650" fontSize="8">Fourier Seasonality</text>
        <text x="8" y="88" fill="#595650" fontSize="8">Window: 168h</text>
      </g>

      <line
        x1="125"
        y1="87"
        x2="160"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-pred-orange)"
      />

      {/* PatchTST Architecture */}
      <g transform="translate(165, 30)">
        <rect width="145" height="115" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="145" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">02. MODEL ENGINE</text>
        <text x="8" y="46" fill="#0D0D0D" fontSize="10" fontWeight="bold">PATCHTST / TFT</text>
        <text x="8" y="64" fill="#595650" fontSize="8">Channel-Independence</text>
        <text x="8" y="80" fill="#595650" fontSize="8">Multi-Head Self Attention</text>
        <text x="8" y="98" fill="#FF3B00" fontSize="8" fontWeight="bold">Quantile Loss Pinball</text>
        <text x="8" y="114" fill="#595650" fontSize="8">O((L/P)²) Complexity</text>
      </g>

      <line
        x1="310"
        y1="87"
        x2="345"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-pred-orange)"
      />

      {/* Uncertainty Interval Calibrator */}
      <g transform="translate(350, 40)">
        <rect width="135" height="95" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="135" height="18" fill="#0D0D0D" />
        <text x="6" y="13" fill="#F4F1EA" fontSize="8" fontWeight="bold">03. CALIBRATION</text>
        <text x="8" y="42" fill="#0D0D0D" fontSize="9" fontWeight="bold">CONFIDENCE BANDS</text>
        <text x="8" y="58" fill="#595650" fontSize="8">q=0.10 Lower Bound</text>
        <text x="8" y="72" fill="#0D0D0D" fontSize="8" fontWeight="bold">q=0.50 Median P50</text>
        <text x="8" y="88" fill="#595650" fontSize="8">q=0.90 Upper Bound</text>
      </g>

      <line
        x1="485"
        y1="87"
        x2="520"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-pred-orange)"
      />

      {/* Real-time Drift Monitor */}
      <g transform="translate(525, 25)">
        <rect width="140" height="125" fill="#0D0D0D" stroke="#FF3B00" strokeWidth="2" />
        <rect x="0" y="0" width="140" height="20" fill="#FF3B00" />
        <text x="6" y="14" fill="#0D0D0D" fontSize="8" fontWeight="black">DRIFT DETECTION</text>
        <text x="8" y="46" fill="#CCFF00" fontSize="10" fontWeight="bold">WASSERSTEIN METRIC</text>
        <text x="8" y="64" fill="#A39F94" fontSize="8">Earth Mover Distance</text>
        <text x="8" y="80" fill="#F4F1EA" fontSize="8">Covariate Shift Flag</text>
        <text x="8" y="98" fill="#CCFF00" fontSize="8" fontWeight="bold">Automated Re-train</text>
        <text x="8" y="114" fill="#A39F94" fontSize="8">7-Day Sliding Window</text>
      </g>

      <line
        x1="665"
        y1="87"
        x2="695"
        y2="87"
        stroke="#0D0D0D"
        strokeWidth="2"
        markerEnd="url(#arrow-pred-black)"
      />

      <g transform="translate(700, 50)">
        <rect width="55" height="70" fill="#CCFF00" stroke="#0D0D0D" strokeWidth="2" />
        <text x="6" y="24" fill="#0D0D0D" fontSize="8" fontWeight="black">ALERT &amp;</text>
        <text x="6" y="38" fill="#0D0D0D" fontSize="8" fontWeight="black">ACTIONS</text>
        <text x="6" y="58" fill="#0D0D0D" fontSize="7">P90 Guard</text>
      </g>
    </svg>
  );
}

// -----------------------------------------------------------------------------
// DIAGRAM 5: GROUNDED RAG SYSTEM
// -----------------------------------------------------------------------------
function GroundedRagSvg() {
  return (
    <svg
      viewBox="0 0 760 220"
      className="w-full h-auto text-black font-mono select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrow-rag-orange"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#FF3B00" />
        </marker>
        <marker
          id="arrow-rag-black"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#0D0D0D" />
        </marker>
      </defs>

      {/* Document Ingestion & Hierarchical Chunking */}
      <g transform="translate(10, 40)">
        <rect width="115" height="95" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="115" height="18" fill="#0D0D0D" />
        <text x="6" y="13" fill="#F4F1EA" fontSize="8" fontWeight="bold">01. INGESTION</text>
        <text x="8" y="40" fill="#0D0D0D" fontSize="9" fontWeight="bold">HIERARCHICAL</text>
        <text x="8" y="56" fill="#595650" fontSize="8">Sentence Chunks (128w)</text>
        <text x="8" y="70" fill="#595650" fontSize="8">Parent Windows (512w)</text>
        <text x="8" y="86" fill="#FF3B00" fontSize="8" fontWeight="bold">Metadata Hashing</text>
      </g>

      <line
        x1="125"
        y1="87"
        x2="160"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-rag-orange)"
      />

      {/* Hybrid Retrieval & Window Expansion */}
      <g transform="translate(165, 30)">
        <rect width="145" height="115" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="145" height="20" fill="#0D0D0D" />
        <text x="6" y="14" fill="#F4F1EA" fontSize="9" fontWeight="bold">02. RETRIEVAL</text>
        <text x="8" y="44" fill="#0D0D0D" fontSize="10" fontWeight="bold">HYBRID RRF ENGINE</text>
        <text x="8" y="62" fill="#595650" fontSize="8">Chroma Dense + BM25</text>
        <text x="8" y="78" fill="#0D0D0D" fontSize="8" fontWeight="bold">WINDOW EXPANDER</text>
        <text x="8" y="94" fill="#595650" fontSize="8">Injects Full Parent Block</text>
        <text x="8" y="110" fill="#FF3B00" fontSize="8" fontWeight="bold">Max Information Gain</text>
      </g>

      <line
        x1="310"
        y1="87"
        x2="345"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-rag-orange)"
      />

      {/* Constrained Generator */}
      <g transform="translate(350, 40)">
        <rect width="130" height="95" fill="#F4F1EA" stroke="#0D0D0D" strokeWidth="2" />
        <rect x="0" y="0" width="130" height="18" fill="#0D0D0D" />
        <text x="6" y="13" fill="#F4F1EA" fontSize="8" fontWeight="bold">03. SYNTHESIS</text>
        <text x="8" y="42" fill="#0D0D0D" fontSize="9" fontWeight="bold">LLM GENERATOR</text>
        <text x="8" y="58" fill="#595650" fontSize="8">Strict Citation Prompt</text>
        <text x="8" y="72" fill="#595650" fontSize="8">Temperature = 0.1</text>
        <text x="8" y="88" fill="#0D0D0D" fontSize="8" fontWeight="bold">Sentence-Chunk Map</text>
      </g>

      <line
        x1="480"
        y1="87"
        x2="515"
        y2="87"
        stroke="#FF3B00"
        strokeWidth="2"
        markerEnd="url(#arrow-rag-orange)"
      />

      {/* NLI Citation Verifier & Guardrail */}
      <g transform="translate(520, 25)">
        <rect width="145" height="125" fill="#0D0D0D" stroke="#FF3B00" strokeWidth="2" />
        <rect x="0" y="0" width="145" height="20" fill="#FF3B00" />
        <text x="6" y="14" fill="#0D0D0D" fontSize="8" fontWeight="black">NLI ENTAILMENT</text>
        <text x="8" y="46" fill="#CCFF00" fontSize="10" fontWeight="bold">CITATION VERIFIER</text>
        <text x="8" y="64" fill="#A39F94" fontSize="8">Cross-Encoder Premise</text>
        <text x="8" y="80" fill="#F4F1EA" fontSize="8">Contradiction Filter</text>
        <text x="8" y="98" fill="#CCFF00" fontSize="8" fontWeight="bold">&gt; 98% FAITHFULNESS</text>
        <text x="8" y="114" fill="#A39F94" fontSize="8">Zero Blind Hallucination</text>
      </g>

      <line
        x1="665"
        y1="87"
        x2="695"
        y2="87"
        stroke="#0D0D0D"
        strokeWidth="2"
        markerEnd="url(#arrow-rag-black)"
      />

      <g transform="translate(700, 50)">
        <rect width="55" height="70" fill="#CCFF00" stroke="#0D0D0D" strokeWidth="2" />
        <text x="6" y="24" fill="#0D0D0D" fontSize="8" fontWeight="black">GROUNDED</text>
        <text x="6" y="38" fill="#0D0D0D" fontSize="8" fontWeight="black">SYNTHESIS</text>
        <text x="6" y="58" fill="#0D0D0D" fontSize="7">100% Attributed</text>
      </g>
    </svg>
  );
}
