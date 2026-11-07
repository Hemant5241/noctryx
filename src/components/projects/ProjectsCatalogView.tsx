"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Filter } from "lucide-react";
import { projectsData } from "@/data/projects";
import { useTheme } from "@/context/ThemeContext";

const CATEGORIES = [
  "ALL",
  "Semantic Search",
  "Computer Vision",
  "Agentic Systems",
  "Predictive ML",
  "RAG Systems",
] as const;

export function ProjectsCatalogView() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "ALL" || project.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(q) ||
        project.shortSummary.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q)) ||
        project.conceptTag.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-6 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-black/50 font-bold mr-1 sm:mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>CATEGORY:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              let btnClass = isSelected
                ? "bg-black text-[#F4F1EA] border-black shadow-[2px_2px_0px_0px_rgba(255,59,0,1)]"
                : "bg-[#F4F1EA] text-black border-black/20 hover:border-black";

              if (theme === "signal-studio") {
                btnClass = isSelected
                  ? "bg-[#FF4FA3] text-[#1B1020] border-[#1B1020] shadow-[3px_3px_0px_0px_#C6FF00] font-black"
                  : "bg-[#FFF0D1] text-[#1B1020] border-[#1B1020]/30 hover:border-[#1B1020] hover:bg-[#C6FF00]";
              }

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold border-2 transition-all cursor-pointer ${btnClass}`}
                >
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-auto lg:min-w-[280px]">
            <div className="flex items-center border-2 border-black bg-[#F4F1EA] px-3 py-1.5">
              <Search className="w-4 h-4 text-[#FF3B00] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword or stack..."
                className="w-full bg-transparent font-mono text-xs text-black focus:outline-none font-bold placeholder:text-black/40"
                aria-label="Filter Projects Search"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between text-xs font-bold text-black border-b-2 border-black pb-2">
          <span>MATCHING SPECIFICATIONS [{filteredProjects.length}]</span>
          <span className="text-black/60">STATUS: READY FOR EVALUATION</span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="p-12 border-2 border-dashed border-black/30 bg-white text-center">
            <p className="font-bold text-black text-sm uppercase">NO MATCHING ARCHITECTURES FOUND</p>
            <p className="text-xs text-black/60 mt-1">
              Try adjusting your search query or selecting ALL categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 sm:p-10 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner hover:shadow-[12px_12px_0px_0px_rgba(255,59,0,1)] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-black text-[#F4F1EA] text-xs font-bold font-mono">
                      SPEC {project.number}
                    </span>
                    <span className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider">
                      {project.conceptTag}
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#CCFF00] text-black px-2 py-0.5 border border-black font-bold">
                    {project.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <span className="text-[10px] text-black/50 font-bold tracking-widest uppercase">
                        CATEGORY: {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
                        {project.title}
                      </h3>
                      <p className="text-sm font-bold text-[#FF3B00] mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-black/80 leading-relaxed font-medium">
                      {project.shortSummary}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-bold border border-black/30 bg-[#F4F1EA] text-black"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics and CTA */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-4 lg:border-l lg:border-black/20 lg:pl-8">
                    <div className="space-y-3">
                      <span className="text-[10px] text-black/50 font-bold uppercase tracking-wider block">
                        BENCHMARK HIGHLIGHTS:
                      </span>
                      {project.metrics.slice(0, 2).map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 border border-black/20 bg-[#F4F1EA]">
                          <span className="text-[9px] font-bold text-black/60 block">{m.label}</span>
                          <span className="text-lg font-black text-black">{m.value}</span>
                          {m.delta && (
                            <span className="text-[10px] font-bold text-[#FF3B00] ml-2">
                              {m.delta}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="brutalist-button brutalist-button-primary w-full text-center"
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comparative Technical Specification Matrix */}
      <div className="p-4 sm:p-6 md:p-10 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
        <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2">
          COMPARATIVE SPECIFICATION MATRIX // 05 ARCHITECTURES
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black uppercase mb-4 sm:mb-6">
          ENGINEERING BENCHMARK COMPARISON
        </h3>

        {/* Mobile Stacked Card View (< 768px) */}
        <div className="md:hidden space-y-3">
          {[
            {
              spec: "SPEC 01",
              title: "Neural Search Engine",
              engine: "Qdrant HNSW + PyTorch",
              benchmark: "~14.2ms [Simulated]",
              guard: "PQ8 Vector Compression",
            },
            {
              spec: "SPEC 02",
              title: "Vision AI Pipeline",
              engine: "TensorRT INT8 + ONNX",
              benchmark: "~8.6ms [Synthetic Stream]",
              guard: "ByteTrack Kalman State",
            },
            {
              spec: "SPEC 03",
              title: "Agentic Workflow",
              engine: "LangGraph + Pydantic",
              benchmark: "Async DAG Simulation",
              guard: "Cyclical Self-Healing",
            },
            {
              spec: "SPEC 04",
              title: "Predictive Intelligence",
              engine: "Temporal Transformer",
              benchmark: "~32ms [Synthetic Series]",
              guard: "Wasserstein Drift Alerting",
            },
            {
              spec: "SPEC 05",
              title: "LLM Knowledge System",
              engine: "LlamaIndex + ChromaDB",
              benchmark: "Streamed Chunks [Demo]",
              guard: "NLI Sentence Verification",
            },
          ].map((row) => (
            <div key={row.spec} className="p-3.5 border-2 border-black bg-[#F4F1EA]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#FF3B00]">{row.spec}</span>
                <span className="text-[10px] text-[#CCFF00] bg-black font-bold px-1.5 py-0.5">
                  {row.benchmark}
                </span>
              </div>
              <div className="font-black text-sm text-black">{row.title}</div>
              <div className="text-xs space-y-1 pt-1 border-t border-black/15">
                <div className="flex justify-between">
                  <span className="text-black/60 font-bold text-[10px]">ENGINE:</span>
                  <span className="font-bold text-black">{row.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60 font-bold text-[10px]">GUARD:</span>
                  <span className="text-black/80">{row.guard}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-black bg-[#F4F1EA]">
                <th className="p-3 font-black text-black">SPEC #</th>
                <th className="p-3 font-black text-black">ARCHITECTURE</th>
                <th className="p-3 font-black text-black">PRIMARY ENGINE</th>
                <th className="p-3 font-black text-black">SIMULATED BENCHMARK TARGET</th>
                <th className="p-3 font-black text-black">RELIABILITY GUARD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/20 hover:bg-[#F4F1EA]/60">
                <td className="p-3 font-bold text-[#FF3B00]">SPEC 01</td>
                <td className="p-3 font-bold">Neural Search Engine</td>
                <td className="p-3">Qdrant HNSW + PyTorch</td>
                <td className="p-3 text-[#CCFF00] bg-black font-bold">~14.2ms [Simulated]</td>
                <td className="p-3">PQ8 Vector Compression</td>
              </tr>
              <tr className="border-b border-black/20 hover:bg-[#F4F1EA]/60">
                <td className="p-3 font-bold text-[#FF3B00]">SPEC 02</td>
                <td className="p-3 font-bold">Vision AI Pipeline</td>
                <td className="p-3">TensorRT INT8 + ONNX</td>
                <td className="p-3 text-[#CCFF00] bg-black font-bold">~8.6ms [Synthetic Stream]</td>
                <td className="p-3">ByteTrack Kalman State</td>
              </tr>
              <tr className="border-b border-black/20 hover:bg-[#F4F1EA]/60">
                <td className="p-3 font-bold text-[#FF3B00]">SPEC 03</td>
                <td className="p-3 font-bold">Agentic Workflow</td>
                <td className="p-3">LangGraph + Pydantic</td>
                <td className="p-3 text-[#CCFF00] bg-black font-bold">Async DAG Simulation</td>
                <td className="p-3">Cyclical Self-Healing</td>
              </tr>
              <tr className="border-b border-black/20 hover:bg-[#F4F1EA]/60">
                <td className="p-3 font-bold text-[#FF3B00]">SPEC 04</td>
                <td className="p-3 font-bold">Predictive Intelligence</td>
                <td className="p-3">Temporal Transformer</td>
                <td className="p-3 text-[#CCFF00] bg-black font-bold">~32ms [Synthetic Series]</td>
                <td className="p-3">Wasserstein Drift Alerting</td>
              </tr>
              <tr className="border-b border-black/20 hover:bg-[#F4F1EA]/60">
                <td className="p-3 font-bold text-[#FF3B00]">SPEC 05</td>
                <td className="p-3 font-bold">LLM Knowledge System</td>
                <td className="p-3">LlamaIndex + ChromaDB</td>
                <td className="p-3 text-[#CCFF00] bg-black font-bold">Streamed Chunks [Demo]</td>
                <td className="p-3">NLI Sentence Verification</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-[10px] text-black/60 font-mono">
          * NOTE: All performance figures reflect simulated benchmark targets measured on synthetic datasets and do not represent contractual commercial client SLAs.
        </div>
      </div>
    </div>
  );
}
