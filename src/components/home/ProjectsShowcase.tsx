"use client";

import Link from "next/link";
import { ArrowUpRight, Layers, Search, Eye, Bot, LineChart, BookOpen, ShieldCheck } from "lucide-react";
import { projectsData, ProjectData } from "@/data/projects";
import { useTheme } from "@/context/ThemeContext";

export function ProjectsShowcase() {
  return (
    <section className="w-full border-b-2 border-black bg-grid-paper py-14 sm:py-20 lg:py-28 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 border-b-2 border-black pb-4 sm:pb-6 mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF3B00] tracking-widest mb-1 sm:mb-2">
              <Layers className="w-4 h-4" />
              <span>03 {"//"} FEATURED ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl font-black text-black tracking-tight uppercase leading-none">
              CASE STUDIES [05]
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] sm:text-[11px] text-[#FF3B00] font-bold block">
              {"// ARCHITECTURAL DEMONSTRATIONS"}
            </span>
            <span className="text-[11px] sm:text-xs text-black/60">
              SIMULATED PRODUCTION SPECIFICATIONS
            </span>
          </div>
        </div>

        {/* Asymmetrical Project List */}
        <div className="space-y-10 sm:space-y-16 lg:space-y-24">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* View all projects bottom bar */}
        <div className="mt-12 sm:mt-20 p-5 sm:p-8 border-2 border-black bg-black text-[#F4F1EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 shadow-[5px_5px_0px_0px_rgba(255,59,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(255,59,0,1)]">
          <div>
            <h3 className="text-lg sm:text-2xl font-black tracking-tight text-[#F4F1EA] uppercase">
              LOOKING FOR DEEP ARCHITECTURAL BREAKDOWNS?
            </h3>
            <p className="text-xs text-[#A39F94] mt-1">
              Explore the full system specifications, data pipelines, and benchmark logs.
            </p>
          </div>
          <Link
            href="/projects"
            className="brutalist-button brutalist-button-acid shrink-0 w-full sm:w-auto text-center justify-center"
          >
            <span>VIEW ALL PROJECTS CATALOG</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-black" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const { theme } = useTheme();
  const isEven = index % 2 === 0;

  const popBlocks = [
    {
      headerBg: "bg-[#6938FF] text-[#FFF0D1] border-[#1B1020]",
      badgeBg: "bg-[#C6FF00] text-[#1B1020] border-[#1B1020]",
      specBadge: "bg-[#1B1020] text-[#FFF0D1]",
      hoverShadow: "hover:shadow-[10px_10px_0px_0px_#6938FF]",
    },
    {
      headerBg: "bg-[#FF4FA3] text-[#1B1020] border-[#1B1020]",
      badgeBg: "bg-[#00E5D4] text-[#1B1020] border-[#1B1020]",
      specBadge: "bg-[#1B1020] text-[#FFF0D1]",
      hoverShadow: "hover:shadow-[10px_10px_0px_0px_#FF4FA3]",
    },
    {
      headerBg: "bg-[#00E5D4] text-[#1B1020] border-[#1B1020]",
      badgeBg: "bg-[#FF4FA3] text-[#1B1020] border-[#1B1020]",
      specBadge: "bg-[#1B1020] text-[#FFF0D1]",
      hoverShadow: "hover:shadow-[10px_10px_0px_0px_#00E5D4]",
    },
    {
      headerBg: "bg-[#FF7139] text-[#1B1020] border-[#1B1020]",
      badgeBg: "bg-[#FFF0D1] text-[#1B1020] border-[#1B1020]",
      specBadge: "bg-[#1B1020] text-[#FFF0D1]",
      hoverShadow: "hover:shadow-[10px_10px_0px_0px_#FF7139]",
    },
    {
      headerBg: "bg-[#C6FF00] text-[#1B1020] border-[#1B1020]",
      badgeBg: "bg-[#6938FF] text-[#FFF0D1] border-[#1B1020]",
      specBadge: "bg-[#1B1020] text-[#FFF0D1]",
      hoverShadow: "hover:shadow-[10px_10px_0px_0px_#C6FF00]",
    },
  ];

  const pop = popBlocks[index % popBlocks.length];

  return (
    <div
      className={`border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner overflow-hidden transition-all ${
        theme === "signal-studio"
          ? `${pop.hoverShadow} hover:-translate-y-0.5`
          : "hover:shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]"
      }`}
    >
      {/* Top Specification Header */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-6 py-3 border-b-2 text-xs font-bold ${
          theme === "signal-studio" ? pop.headerBg : "border-black bg-[#F4F1EA]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-0.5 font-mono text-[11px] font-bold ${
              theme === "signal-studio" ? pop.specBadge : "bg-black text-[#F4F1EA]"
            }`}
          >
            SPEC {project.number}
          </span>
          <span className="uppercase tracking-wider font-bold">{project.conceptTag}</span>
        </div>
        <div
          className={`flex items-center gap-2 text-[10px] px-2 py-0.5 border font-bold ${
            theme === "signal-studio"
              ? pop.badgeBg
              : "text-[#FF3B00] bg-[#FF3B00]/10 border-[#FF3B00]/30"
          }`}
        >
          <span>{project.badge}</span>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8 lg:p-10 items-center`}>
        {/* Content Column */}
        <div className={`lg:col-span-7 space-y-4 sm:space-y-6 ${isEven ? "" : "lg:order-2"}`}>
          <div>
            <div className="text-[10px] sm:text-xs text-black/50 font-bold tracking-widest uppercase mb-1">
              CATEGORY: {project.category}
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-base font-bold text-[#FF3B00] mt-1 sm:mt-2">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-black/80 leading-relaxed font-sans font-medium">
            {project.shortSummary}
          </p>

          {/* Key Simulated Metrics */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-2">
            {project.metrics.map((metric, mIdx) => (
              <div key={mIdx} className="p-2 sm:p-3 border border-black/20 bg-[#F4F1EA]/70">
                <span className="text-[8px] sm:text-[9px] font-bold text-black/60 block truncate">
                  {metric.label}
                </span>
                <span className="text-sm xs:text-base sm:text-xl font-black text-black">
                  {metric.value}
                </span>
                {metric.delta && (
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#FF3B00] block truncate">
                    {metric.delta}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 sm:pt-2">
            {project.techStack.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 border border-black bg-white text-black"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Link */}
          <div className="pt-2">
            <Link
              href={`/projects/${project.slug}`}
              className="brutalist-button brutalist-button-primary inline-flex w-full xs:w-auto text-center justify-center"
            >
              <span>INSPECT CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* Custom Project Visual Identity Artwork */}
        <div className={`lg:col-span-5 w-full ${isEven ? "" : "lg:order-1"}`}>
          <ProjectVisualArtwork project={project} />
        </div>
      </div>
    </div>
  );
}

function ProjectVisualArtwork({ project }: { project: ProjectData }) {
  if (project.slug === "neural-search-engine") {
    return (
      <div className="border-2 border-black bg-[#0D0D0D] p-5 text-[#F4F1EA] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-4">
          <div className="flex items-center gap-2 text-[#FF3B00]">
            <Search className="w-4 h-4" />
            <span className="font-bold">HNSW VECTOR RETRIEVAL</span>
          </div>
          <span className="text-[10px] text-[#A39F94]">TOP-K: 10</span>
        </div>

        {/* Mock Vector Query Stream */}
        <div className="space-y-2 text-[11px] mb-4">
          <div className="p-2 border border-[#262626] bg-[#141414]">
            <span className="text-[#CCFF00]">QUERY:</span> &quot;low-latency transformer inference&quot;
          </div>
          <div className="p-2 border border-[#262626] bg-[#141414] space-y-1">
            <div className="flex justify-between text-[#A39F94]">
              <span>COSINE SIMILARITY: 0.941</span>
              <span className="text-[#CCFF00]">MATCH #1</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 overflow-hidden">
              <div className="bg-[#FF3B00] h-full w-[94%]"></div>
            </div>
          </div>
          <div className="p-2 border border-[#262626] bg-[#141414] space-y-1">
            <div className="flex justify-between text-[#A39F94]">
              <span>COSINE SIMILARITY: 0.887</span>
              <span className="text-[#CCFF00]">MATCH #2</span>
            </div>
            <div className="w-full bg-[#262626] h-1.5 overflow-hidden">
              <div className="bg-[#CCFF00] h-full w-[88%]"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#262626] pt-2 flex justify-between text-[10px] text-[#A39F94]">
          <span>INDEX: 1,024,000 VECTORS</span>
          <span className="text-[#CCFF00]">LATENCY: 14.2ms</span>
        </div>
      </div>
    );
  }

  if (project.slug === "vision-ai") {
    return (
      <div className="border-2 border-black bg-[#0D0D0D] p-5 text-[#F4F1EA] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-4">
          <div className="flex items-center gap-2 text-[#CCFF00]">
            <Eye className="w-4 h-4" />
            <span className="font-bold">EDGE SPATIAL DETECTOR</span>
          </div>
          <span className="text-[10px] text-[#FF3B00]">64.8 FPS</span>
        </div>

        {/* Mock Viewfinder HUD */}
        <div className="relative h-44 border border-[#262626] bg-[#141414] flex items-center justify-center overflow-hidden mb-3">
          <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>
          {/* Simulated Bounding Box 1 */}
          <div className="absolute top-4 left-6 w-24 h-28 border-2 border-[#FF3B00] p-1 flex flex-col justify-between">
            <span className="text-[9px] bg-[#FF3B00] text-black font-bold px-1 self-start">
              OBJECT {"//"} 98.4%
            </span>
            <span className="text-[8px] text-[#FF3B00] self-end">ID: 042</span>
          </div>
          {/* Simulated Bounding Box 2 */}
          <div className="absolute bottom-6 right-8 w-28 h-20 border-2 border-[#CCFF00] p-1 flex flex-col justify-between">
            <span className="text-[9px] bg-[#CCFF00] text-black font-bold px-1 self-start">
              SPATIAL {"//"} 94.1%
            </span>
            <span className="text-[8px] text-[#CCFF00] self-end">ID: 099</span>
          </div>
          {/* Center Crosshair */}
          <div className="w-4 h-4 border-t border-b border-l border-r border-[#F4F1EA]/40"></div>
        </div>

        <div className="border-t border-[#262626] pt-2 flex justify-between text-[10px] text-[#A39F94]">
          <span>EXEC: TENSORRT FP16</span>
          <span className="text-[#CCFF00]">LATENCY: 8.6ms</span>
        </div>
      </div>
    );
  }

  if (project.slug === "agentic-workflow") {
    return (
      <div className="border-2 border-black bg-[#0D0D0D] p-5 text-[#F4F1EA] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-4">
          <div className="flex items-center gap-2 text-[#FF3B00]">
            <Bot className="w-4 h-4" />
            <span className="font-bold">DAG STATE ORCHESTRATOR</span>
          </div>
          <span className="text-[10px] text-[#CCFF00]">RECURSION: SAFE</span>
        </div>

        {/* State nodes */}
        <div className="space-y-2 mb-3 text-[11px]">
          <div className="flex items-center justify-between p-2 border border-[#262626] bg-[#141414]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]"></span>
              <span>PLANNER NODE</span>
            </div>
            <span className="text-[10px] text-[#A39F94]">TASK DECOMPOSED</span>
          </div>
          <div className="flex items-center justify-between p-2 border border-[#262626] bg-[#141414]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse"></span>
              <span>TOOL EXECUTOR</span>
            </div>
            <span className="text-[10px] text-[#FF3B00]">RUNNING WEB_SEARCH</span>
          </div>
          <div className="flex items-center justify-between p-2 border border-[#262626] bg-[#141414]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6E6A61]"></span>
              <span>VALIDATOR / NLI</span>
            </div>
            <span className="text-[10px] text-[#6E6A61]">AWAITING PRECONDITION</span>
          </div>
        </div>

        <div className="border-t border-[#262626] pt-2 flex justify-between text-[10px] text-[#A39F94]">
          <span>CONVERGENCE: 91.4%</span>
          <span className="text-[#CCFF00]">SELF-CORRECTION: ON</span>
        </div>
      </div>
    );
  }

  if (project.slug === "predictive-intelligence") {
    return (
      <div className="border-2 border-black bg-[#0D0D0D] p-5 text-[#F4F1EA] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-4">
          <div className="flex items-center gap-2 text-[#CCFF00]">
            <LineChart className="w-4 h-4" />
            <span className="font-bold">TEMPORAL QUANTILE ATTENTION</span>
          </div>
          <span className="text-[10px] text-[#A39F94]">HORIZON: +72H</span>
        </div>

        {/* Simulated SVG Graph */}
        <div className="h-40 border border-[#262626] bg-[#141414] p-2 flex flex-col justify-end mb-3 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
            {/* Confidence Band */}
            <polygon
              points="0,55 30,50 60,40 90,45 120,30 150,25 180,20 200,15 200,50 180,55 150,60 120,65 90,70 60,65 30,68 0,72"
              fill="rgba(255, 59, 0, 0.15)"
            />
            {/* Median Line */}
            <polyline
              points="0,60 30,55 60,45 90,52 120,38 150,32 180,28 200,22"
              fill="none"
              stroke="#CCFF00"
              strokeWidth="2"
            />
            {/* Historical ticks */}
            <line x1="120" y1="0" x2="120" y2="80" stroke="#FF3B00" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
          <div className="absolute top-2 right-2 text-[9px] text-[#FF3B00]">
            ANOMALY PROB: 0.04
          </div>
        </div>

        <div className="border-t border-[#262626] pt-2 flex justify-between text-[10px] text-[#A39F94]">
          <span>MAE: 0.042</span>
          <span className="text-[#CCFF00]">F1 SCORE: 0.938</span>
        </div>
      </div>
    );
  }

  // LLM Knowledge System fallback
  return (
    <div className="border-2 border-black bg-[#0D0D0D] p-5 text-[#F4F1EA] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-4">
        <div className="flex items-center gap-2 text-[#FF3B00]">
          <BookOpen className="w-4 h-4" />
          <span className="font-bold">GROUNDED CITATION GRAPH</span>
        </div>
        <span className="text-[10px] text-[#CCFF00]">RAGAS: 98.2%</span>
      </div>

      <div className="space-y-2 mb-3 text-[11px]">
        <div className="p-2 border border-[#262626] bg-[#141414]">
          <div className="text-[10px] text-[#A39F94] mb-1">GENERATED ASSERTION:</div>
          <div className="text-[#F4F1EA]">
            &quot;System achieves sub-15ms vector retrieval via HNSW graph.&quot;
          </div>
        </div>
        <div className="p-2 border border-[#262626] bg-[#141414] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
            <span className="text-[10px] text-[#CCFF00]">NLI VERIFIED {"//"} CITATION [REF 04]</span>
          </div>
          <span className="text-[9px] text-[#A39F94]">ENTAILMENT: 0.99</span>
        </div>
      </div>

      <div className="border-t border-[#262626] pt-2 flex justify-between text-[10px] text-[#A39F94]">
        <span>UNGROUNDED: 0.00%</span>
        <span className="text-[#CCFF00]">RECALL: 94.6%</span>
      </div>
    </div>
  );
}
