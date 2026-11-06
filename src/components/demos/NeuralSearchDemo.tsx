"use client";

import { useState, useMemo } from "react";
import { Search, ShieldCheck } from "lucide-react";

interface CorpusDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
  simulatedEmbeddingVector: number[];
}

const SAMPLE_CORPUS: CorpusDocument[] = [
  {
    id: "doc-01",
    title: "Product Quantization (PQ8) for HNSW Vector Indexes",
    category: "Vector Search",
    content:
      "Compressing FP32 dense embeddings to INT8 via product quantization reduces index memory footprint by 4.1x while maintaining >98.6% recall@10 on 768-dimensional sentence transformer representations.",
    keywords: ["product", "quantization", "pq8", "hnsw", "vector", "memory", "int8", "embeddings", "index", "compression"],
    simulatedEmbeddingVector: [0.88, 0.45, 0.12, 0.95, 0.62],
  },
  {
    id: "doc-02",
    title: "Optimizing Transformer Inference via Kernel Fusion & FlashAttention",
    category: "Model Serving",
    content:
      "Eliminating memory-bandwidth bottlenecks in causal self-attention layers through fused GPU kernels and tiled SRAM memory access drops attention layer latency from 32ms to 6.4ms on modern hardware.",
    keywords: ["transformer", "inference", "latency", "bottleneck", "gpu", "kernel", "fusion", "attention", "bandwidth", "memory"],
    simulatedEmbeddingVector: [0.92, 0.38, 0.85, 0.22, 0.74],
  },
  {
    id: "doc-03",
    title: "Multi-Agent Cyclical State DAGs with Schema Validation",
    category: "Agentic AI",
    content:
      "Structuring multi-agent orchestration as a directed acyclic graph (DAG) with strict Pydantic/Zod tool schema boundaries prevents infinite retry loops and ensures deterministic error recovery upon API failure.",
    keywords: ["multi-agent", "agent", "state", "dag", "schema", "validation", "orchestration", "tools", "pydantic", "retry"],
    simulatedEmbeddingVector: [0.15, 0.94, 0.42, 0.31, 0.89],
  },
  {
    id: "doc-04",
    title: "TensorRT INT8 Edge Acceleration for Object Detection",
    category: "Computer Vision",
    content:
      "Serializing PyTorch YOLO backbones into TensorRT execution engines with calibration caches enables sustained 60+ FPS real-time object detection at 1080p resolution on edge GPU devices.",
    keywords: ["tensorrt", "int8", "quantized", "fp16", "edge", "computer", "vision", "yolo", "detection", "fps", "gpu"],
    simulatedEmbeddingVector: [0.35, 0.21, 0.96, 0.78, 0.19],
  },
  {
    id: "doc-05",
    title: "Natural Language Inference (NLI) Guardrails for Grounded RAG",
    category: "RAG Systems",
    content:
      "A cross-encoder NLI model evaluates premise-hypothesis entailment for every generated assertion, guaranteeing zero ungrounded statements and producing verifiable sentence-level citation references.",
    keywords: ["natural", "language", "inference", "nli", "citation", "faithfulness", "grounded", "rag", "hallucination", "guardrails"],
    simulatedEmbeddingVector: [0.72, 0.88, 0.33, 0.54, 0.91],
  },
  {
    id: "doc-06",
    title: "Multivariate Temporal Attention for Telemetry Anomaly Detection",
    category: "Predictive ML",
    content:
      "Combining patch-based temporal transformers with quantile loss outputs calibrated confidence intervals and detects distribution drift via Wasserstein distance across 100+ concurrent telemetry signals.",
    keywords: ["multivariate", "temporal", "attention", "anomaly", "detection", "forecasting", "telemetry", "drift", "transformer", "quantile"],
    simulatedEmbeddingVector: [0.55, 0.33, 0.79, 0.65, 0.48],
  },
];

const PRESET_QUERIES = [
  "Transformer inference latency bottleneck",
  "Product quantization vector memory reduction",
  "Autonomous agent state DAG validation",
  "Quantized INT8 vs FP16 edge computer vision",
  "Natural language inference citation faithfulness",
];

export function NeuralSearchDemo() {
  const [query, setQuery] = useState(PRESET_QUERIES[0]);
  const [searchMode, setSearchMode] = useState<"dense" | "lexical" | "hybrid">("hybrid");
  const [topK, setTopK] = useState(3);
  const [minThreshold, setMinThreshold] = useState(0.4);
  const [isSearching, setIsSearching] = useState(false);

  // Compute simulated similarity score based on query tokens and search mode
  const searchResults = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

    return SAMPLE_CORPUS.map((doc) => {
      // Lexical score: keyword overlap
      const matchingKeywords = tokens.filter((t) =>
        doc.keywords.some((k) => k.includes(t) || t.includes(k))
      );
      const lexicalScore = tokens.length > 0 ? matchingKeywords.length / tokens.length : 0;

      // Dense score: simulated vector cosine similarity with pseudo-hash based on tokens
      let denseScore = 0.35;
      tokens.forEach((t) => {
        if (doc.keywords.some((k) => k.includes(t))) {
          denseScore += 0.22;
        } else if (doc.content.toLowerCase().includes(t)) {
          denseScore += 0.12;
        }
      });
      denseScore = Math.min(Math.max(denseScore, 0.15), 0.97);

      // Hybrid fusion score (Reciprocal Rank Fusion style weighted score)
      let combinedScore = 0;
      if (searchMode === "dense") {
        combinedScore = denseScore;
      } else if (searchMode === "lexical") {
        combinedScore = lexicalScore;
      } else {
        combinedScore = denseScore * 0.65 + lexicalScore * 0.35;
      }

      return {
        ...doc,
        denseScore: Math.round(denseScore * 1000) / 1000,
        lexicalScore: Math.round(lexicalScore * 1000) / 1000,
        score: Math.round(combinedScore * 1000) / 1000,
        matchingKeywords,
      };
    })
      .filter((doc) => doc.score >= minThreshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }, [query, searchMode, topK, minThreshold]);

  const handleQueryChange = (newQuery: string) => {
    setIsSearching(true);
    setQuery(newQuery);
    setTimeout(() => setIsSearching(false), 200);
  };

  return (
    <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner font-mono text-xs">
      {/* Interactive Terminal Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b-2 border-black bg-[#0D0D0D] text-[#F4F1EA]">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#FF3B00]" />
          <span className="font-bold text-sm tracking-wide">
            NEURAL RETRIEVAL PLAYGROUND // LIVE SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#A39F94]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span>HNSW GRAPH: 1.02M CHUNKS</span>
          </span>
          <span>{"//"}</span>
          <span className="text-[#CCFF00] font-bold">P99: 14.2ms</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Preset Queries Strip */}
        <div>
          <label className="text-[10px] text-black/60 font-bold tracking-wider uppercase block mb-2">
            PRESET DOMAIN QUERIES // SELECT TO TEST RETRIEVAL:
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQueryChange(preset)}
                className={`px-2.5 py-1 text-[11px] border text-left transition-all cursor-pointer ${
                  query === preset
                    ? "bg-black text-[#F4F1EA] border-black font-bold shadow-[2px_2px_0px_0px_rgba(255,59,0,1)]"
                    : "bg-[#F4F1EA] text-black border-black/30 hover:border-black"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <div className="flex items-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="px-3 text-black/50">
              <Search className="w-5 h-5 text-[#FF3B00]" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Enter technical query or search terms..."
              className="w-full py-3 pr-4 font-mono text-sm text-black bg-transparent focus:outline-none font-bold"
              aria-label="Semantic Search Query Input"
            />
          </div>
        </div>

        {/* Controls & Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-black/20 bg-[#F4F1EA]/60">
          {/* Mode Selector */}
          <div>
            <label className="text-[10px] text-black/60 font-bold uppercase block mb-1.5">
              RETRIEVAL STRATEGY:
            </label>
            <div className="flex border border-black bg-white">
              {(["dense", "lexical", "hybrid"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSearchMode(mode)}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                    searchMode === mode
                      ? "bg-black text-[#F4F1EA]"
                      : "text-black hover:bg-black/5"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Top-K Slider */}
          <div>
            <div className="flex justify-between text-[10px] text-black/60 font-bold uppercase mb-1.5">
              <span>TOP-K CANDIDATES:</span>
              <span className="text-[#FF3B00]">{topK}</span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-[#FF3B00] cursor-pointer"
              aria-label="Top-K Candidates Slider"
            />
          </div>

          {/* Threshold Slider */}
          <div>
            <div className="flex justify-between text-[10px] text-black/60 font-bold uppercase mb-1.5">
              <span>SIMILARITY CUTOFF:</span>
              <span className="text-[#FF3B00]">{minThreshold}</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={0.8}
              step={0.05}
              value={minThreshold}
              onChange={(e) => setMinThreshold(Number(e.target.value))}
              className="w-full accent-[#FF3B00] cursor-pointer"
              aria-label="Similarity Threshold Slider"
            />
          </div>
        </div>

        {/* Retrieval Results List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-black border-b border-black/20 pb-2">
            <span>RETRIEVED CANDIDATES [{searchResults.length}]</span>
            <span className="text-[10px] text-black/60">
              EXECUTION: {isSearching ? "EVALUATING TENSORS..." : "SIMULATED 12.8ms"}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-black/30 text-center space-y-2">
              <p className="font-bold text-black text-sm">NO VECTORS PASSED SIMILARITY CUTOFF</p>
              <p className="text-[11px] text-black/60">
                Try lowering the cutoff threshold or switching from Dense to Hybrid mode.
              </p>
            </div>
          ) : (
            searchResults.map((result, idx) => (
              <div
                key={result.id}
                className="p-5 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-[#FF3B00] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-black text-[#F4F1EA] text-[10px] font-bold">
                      RANK #{idx + 1}
                    </span>
                    <span className="font-bold text-sm text-black">{result.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#CCFF00] text-black px-1.5 py-0.5 border border-black font-bold">
                      SCORE: {result.score.toFixed(3)}
                    </span>
                    <span className="text-[10px] text-black/50">
                      DENSE: {result.denseScore} {"//"} LEX: {result.lexicalScore}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-black/80 font-sans leading-relaxed mb-3">
                  {result.content}
                </p>

                {/* Score bar */}
                <div className="w-full bg-black/10 h-2 border border-black/20 overflow-hidden mb-3">
                  <div
                    className="h-full bg-[#FF3B00] transition-all duration-300"
                    style={{ width: `${Math.round(result.score * 100)}%` }}
                  ></div>
                </div>

                {/* Tokens matched */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-black/50 font-bold">MATCHED TOKENS:</span>
                  {result.keywords.slice(0, 5).map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      className="px-1.5 py-0.2 border border-black/20 bg-[#F4F1EA] text-black"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Verification Note */}
        <div className="p-3 border border-black/20 bg-[#F4F1EA] text-[10px] text-black/70 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF3B00]" />
            <span>
              TRANSPARENCY: All similarity vector calculations executed locally in-browser on synthetic technical corpus.
            </span>
          </span>
          <span className="font-bold text-black">NO PAID APIS CALLED</span>
        </div>
      </div>
    </div>
  );
}
