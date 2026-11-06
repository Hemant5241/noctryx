"use client";

import { useState } from "react";
import { BookOpen, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

interface DocumentChunk {
  id: string;
  chunkNumber: number;
  tokens: number;
  text: string;
  nliScore: number;
}

interface RagKnowledgeSource {
  id: string;
  title: string;
  sourceDoc: string;
  presetQuestions: {
    question: string;
    synthesizedAnswer: {
      sentence: string;
      citationId?: string;
    }[];
  }[];
  chunks: DocumentChunk[];
}

const RAG_SOURCES: RagKnowledgeSource[] = [
  {
    id: "source-1",
    title: "Dense Vector Search & Quantization Spec",
    sourceDoc: "RFC-8402: Production Vector Database Guidelines.md",
    chunks: [
      {
        id: "chunk-101",
        chunkNumber: 1,
        tokens: 384,
        text: "Product Quantization (PQ8) segments 768-dimensional FP32 embeddings into 8-bit sub-vectors, compressing memory consumption by 4.1x with negligible recall degradation on HNSW graphs.",
        nliScore: 0.994,
      },
      {
        id: "chunk-102",
        chunkNumber: 2,
        tokens: 412,
        text: "Cross-encoder re-ranking models evaluated on the top-100 retrieved candidates filter out out-of-context text spans, boosting Mean Reciprocal Rank (MRR@10) from 0.68 to 0.892.",
        nliScore: 0.988,
      },
      {
        id: "chunk-103",
        chunkNumber: 3,
        tokens: 340,
        text: "To ensure absolute grounding, each synthesized assertion is verified against retrieved chunks using a natural language inference (NLI) entailment classifier with a 0.92 threshold cutoff.",
        nliScore: 0.991,
      },
    ],
    presetQuestions: [
      {
        question: "How does PQ8 quantization optimize memory without compromising retrieval recall?",
        synthesizedAnswer: [
          {
            sentence: "Product Quantization (PQ8) partitions dense embeddings into 8-bit quantized representations, yielding a 4.1x memory reduction on HNSW indexes.",
            citationId: "chunk-101",
          },
          {
            sentence: "Subsequent cross-encoder re-ranking refines the top candidate candidates, sustaining high MRR@10 benchmarks.",
            citationId: "chunk-102",
          },
          {
            sentence: "Each assertion is independently confirmed via an NLI entailment filter prior to token streaming.",
            citationId: "chunk-103",
          },
        ],
      },
      {
        question: "What safeguards prevent ungrounded hallucinations during answer generation?",
        synthesizedAnswer: [
          {
            sentence: "Every generated statement undergoes sentence-level Natural Language Inference checking against retrieved source premises.",
            citationId: "chunk-103",
          },
          {
            sentence: "Out-of-context retrieved noise is stripped using cross-attention candidate filtering before prompt synthesis.",
            citationId: "chunk-102",
          },
        ],
      },
    ],
  },
];

export function LlmKnowledgeSystemDemo() {
  const [selectedSource] = useState<RagKnowledgeSource>(RAG_SOURCES[0]);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  const [activeCitationId, setActiveCitationId] = useState<string | null>(null);

  const activeQA = selectedSource.presetQuestions[selectedQuestionIdx];

  return (
    <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner font-mono text-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b-2 border-black bg-[#0D0D0D] text-[#F4F1EA]">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#FF3B00]" />
          <span className="font-bold text-sm tracking-wide">
            ENTERPRISE RAG & NLI CITATION GRAPH // SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#A39F94]">
          <span className="text-[#CCFF00] font-bold">FAITHFULNESS: 98.2%</span>
          <span>{"//"}</span>
          <span className="text-[#FF3B00] font-bold">UNGROUNDED CLAIMS: 0.00%</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Knowledge Source Badge */}
        <div className="p-3 border border-black bg-[#F4F1EA] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FF3B00]" />
            <span className="font-bold text-black">{selectedSource.title}</span>
          </div>
          <span className="text-[10px] text-black/60 font-mono">
            INGESTED: {selectedSource.sourceDoc}
          </span>
        </div>

        {/* Preset Technical Queries */}
        <div>
          <label className="text-[10px] text-black/60 font-bold uppercase block mb-2">
            SELECT INQUIRY // EVALUATE GROUNDED RETRIEVAL:
          </label>
          <div className="space-y-2">
            {selectedSource.presetQuestions.map((qa, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedQuestionIdx(idx);
                  setActiveCitationId(null);
                }}
                className={`w-full p-2.5 text-left border transition-all cursor-pointer ${
                  selectedQuestionIdx === idx
                    ? "bg-black text-[#F4F1EA] border-black shadow-[3px_3px_0px_0px_rgba(255,59,0,1)]"
                    : "bg-white text-black border-black/30 hover:border-black hover:bg-[#F4F1EA]"
                }`}
              >
                <span className="font-bold text-xs">{qa.question}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Synthesized Answer with Interactive Citation Tags */}
        <div className="p-5 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between border-b border-black/15 pb-2 mb-3">
            <span className="text-[10px] text-[#FF3B00] font-bold uppercase tracking-wider">
              GROUNDED LLM SYNTHESIS // CLICK CITATION CHIPS TO HIGHLIGHT SOURCE:
            </span>
            <span className="text-[9px] bg-[#CCFF00] text-black px-1.5 py-0.5 border border-black font-bold">
              NLI ENTAILMENT VERIFIED
            </span>
          </div>

          <div className="space-y-2 font-sans text-sm sm:text-base text-black/90 leading-relaxed">
            {activeQA.synthesizedAnswer.map((part, pIdx) => {
              const isHighlighted = activeCitationId === part.citationId;
              return (
                <span
                  key={pIdx}
                  className={`inline transition-colors ${
                    isHighlighted ? "bg-[#CCFF00]/40 font-semibold" : ""
                  }`}
                >
                  {part.sentence}{" "}
                  {part.citationId && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCitationId(
                          activeCitationId === part.citationId ? null : (part.citationId ?? null)
                        )
                      }
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold border transition-colors cursor-pointer mr-1.5 ${
                        isHighlighted
                          ? "bg-black text-[#CCFF00] border-black"
                          : "bg-[#FF3B00]/10 text-[#FF3B00] border-[#FF3B00]/30 hover:bg-[#FF3B00] hover:text-white"
                      }`}
                    >
                      <span>REF:{part.citationId.replace("chunk-", "")}</span>
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Document Chunks Inspector */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-black/60 font-bold uppercase tracking-wider mb-2">
            <span>INDEXED DOCUMENT CHUNKS [PARENT-CHILD STRUCTURE]:</span>
            <span>TOKEN BUDGET: 512 TOKENS/CHUNK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedSource.chunks.map((chunk) => {
              const isTargeted = activeCitationId === chunk.id;
              return (
                <div
                  key={chunk.id}
                  className={`p-4 border-2 transition-all ${
                    isTargeted
                      ? "border-black bg-[#CCFF00]/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ring-2 ring-black"
                      : "border-black/20 bg-[#F4F1EA]/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#FF3B00]">
                      CHUNK #0{chunk.chunkNumber}
                    </span>
                    <span className="text-[9px] text-black/50 font-mono">
                      {chunk.tokens} TOKENS
                    </span>
                  </div>
                  <p className="text-[11px] text-black/80 font-sans leading-relaxed mb-3">
                    {chunk.text}
                  </p>
                  <div className="flex items-center justify-between text-[9px] border-t border-black/10 pt-2 text-black/60">
                    <span>NLI ENTAILMENT:</span>
                    <span className="font-bold text-black">{chunk.nliScore}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Note */}
        <div className="p-3 border border-black/20 bg-[#F4F1EA] text-[10px] text-black/70 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF3B00]" />
            <span>
              TRANSPARENCY: Natural language inference citation verification simulated client-side against static RFC corpus.
            </span>
          </span>
          <span className="font-bold text-black">STRICT CITATION AUDIT</span>
        </div>
      </div>
    </div>
  );
}
