import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Terminal,
  CheckCircle2,
  Cpu,
  Scale,
  Wrench,
  AlertTriangle,
  Lightbulb,
  Layers,
  Activity,
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { caseStudiesBySlug } from "@/data/caseStudies";
import { CaseStudyArchitectureDiagram } from "@/components/projects/CaseStudyArchitectureDiagram";
import { NeuralSearchDemo } from "@/components/demos/NeuralSearchDemo";
import { VisionAiDemo } from "@/components/demos/VisionAiDemo";
import { AgenticWorkflowDemo } from "@/components/demos/AgenticWorkflowDemo";
import { PredictiveIntelligenceDemo } from "@/components/demos/PredictiveIntelligenceDemo";
import { LlmKnowledgeSystemDemo } from "@/components/demos/LlmKnowledgeSystemDemo";
import { ContactCTASection } from "@/components/home/ContactCTASection";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} // Technical Case Study // Om Shinde`,
    description: project.shortSummary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const caseStudy = caseStudiesBySlug[slug];
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  return (
    <div className="w-full bg-[#F4F1EA] text-[#0D0D0D] font-mono">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b-2 border-black bg-white px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold hover:text-[#FF3B00] transition-colors focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PROJECTS CATALOG</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-black/60">
            <span>SPEC: #{project.number}</span>
            <span>{"//"}</span>
            <span className="text-[#FF3B00] font-bold">{project.category}</span>
          </div>
        </div>
      </div>

      {/* Hero Header for Project */}
      <section className="border-b-2 border-black bg-grid-paper py-10 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <span className="px-2.5 py-1 bg-black text-[#F4F1EA] text-xs font-bold">
              SPECIFICATION {project.number}
            </span>
            <span className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider">
              {project.conceptTag}
            </span>
            <span className="text-[10px] bg-[#CCFF00] text-black px-2 py-0.5 border border-black font-bold">
              {project.badge}
            </span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight uppercase leading-[0.95] mb-4 sm:mb-6 break-words">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-bold text-[#FF3B00] max-w-3xl leading-snug mb-4 sm:mb-6">
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm md:text-base font-sans text-black/80 max-w-3xl leading-relaxed mb-6 sm:mb-8">
            {project.shortSummary}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-black/20">
            <span className="text-xs text-black/50 font-bold mr-2">TECH RUNTIME:</span>
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 border-2 border-black bg-white text-[11px] sm:text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Notice Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="p-3.5 sm:p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#FF3B00] shrink-0 mt-0.5" />
          <div className="text-xs text-black/80">
            <strong className="text-black uppercase">
              PORTFOLIO DEMONSTRATION & ARCHITECTURAL CASE STUDY:
            </strong>{" "}
            This project is an architectural demonstration conceived by Om Shinde to showcase
            end-to-end systems design, pipeline modeling, and deployment strategies. Performance
            metrics are illustrative simulated benchmarks on synthetic datasets. The interactive module below runs an
            in-browser simulation.
          </div>
        </div>
      </div>

      {/* Main Architecture & Deep Dive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-16">
        {/* 1. Problem & Proposed Solution Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="p-6 sm:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
            <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2">
              01 // THE SYSTEM BOTTLENECK
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black uppercase mb-4">
              PROBLEM STATEMENT
            </h2>
            <p className="text-xs sm:text-sm font-sans text-black/80 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Solution */}
          <div className="p-6 sm:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
            <div className="text-xs font-bold text-[#CCFF00] bg-black px-2 py-0.5 inline-block uppercase tracking-wider mb-2">
              02 // THE ARCHITECTURAL RESPONSE
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black uppercase mb-4">
              PROPOSED SOLUTION
            </h2>
            <p className="text-xs sm:text-sm font-sans text-black/80 leading-relaxed">
              {project.proposedSolution}
            </p>
          </div>
        </div>

        {/* 2. Engineering Objectives */}
        {caseStudy && (
          <div className="p-4 sm:p-6 md:p-10 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
            <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>03 // ENGINEERING OBJECTIVES & SLA TARGETS</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase mb-4 sm:mb-6 break-words">
              DESIGN SPECIFICATIONS & CONSTRAINTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.engineeringObjectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 border-2 border-black bg-[#F4F1EA] flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-none bg-black text-[#F4F1EA] text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-black/85 leading-relaxed font-medium">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. System Architecture Diagram */}
        {caseStudy && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider">
              04 // SYSTEM TOPOLOGY & EXECUTION GRAPH
            </div>
            <CaseStudyArchitectureDiagram
              type={caseStudy.diagramType}
              projectTitle={project.title}
            />
          </div>
        )}

        {/* 4. Core System Components & Responsibilities */}
        {caseStudy && (
          <div className="p-4 sm:p-6 md:p-10 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
            <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>05 // COMPONENT ARCHITECTURE & RESPONSIBILITIES</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase mb-4 sm:mb-6 break-words">
              SUBSYSTEM DECOMPOSITION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 border-2 border-black bg-[#F4F1EA]/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-black/60 font-bold uppercase mb-2">
                      <span>MODULE 0{idx + 1}</span>
                      {comp.isSimulatedDemoPart && (
                        <span className="px-1.5 py-0.5 bg-[#CCFF00] border border-black text-black font-bold">
                          CLIENT DEMO ENGINE
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-black uppercase mb-1">
                      {comp.name}
                    </h3>
                    <div className="text-[11px] font-bold text-[#FF3B00] mb-3">
                      ROLE: {comp.role}
                    </div>
                    <p className="text-xs font-sans text-black/80 leading-relaxed">
                      {comp.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Embedded Interactive AI Demonstration Module */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#FF3B00]" />
              <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                06 // INTERACTIVE IN-BROWSER DEMONSTRATION
              </h2>
            </div>
            <span className="text-xs text-black/60 font-bold">
              {project.demoSimulationNote}
            </span>
          </div>

          {/* Render dedicated interactive demo based on slug */}
          {slug === "neural-search-engine" && <NeuralSearchDemo />}
          {slug === "vision-ai" && <VisionAiDemo />}
          {slug === "agentic-workflow" && <AgenticWorkflowDemo />}
          {slug === "predictive-intelligence" && <PredictiveIntelligenceDemo />}
          {slug === "llm-knowledge-system" && <LlmKnowledgeSystemDemo />}
        </div>

        {/* 6. Technology Choices & Justification */}
        {caseStudy && (
          <div className="p-4 sm:p-6 md:p-10 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
            <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span>07 // TECHNOLOGY CHOICES & ARCHITECTURAL RATIONALE</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase mb-4 sm:mb-6 break-words">
              WHY THESE SPECIFIC TOOLS WERE SELECTED
            </h2>

            <div className="space-y-4">
              {caseStudy.technologyChoices.map((choice, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 border-2 border-black bg-[#F4F1EA]/60 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start"
                >
                  <div className="md:col-span-4">
                    <span className="text-[10px] text-black/60 font-bold uppercase block">
                      {choice.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-black uppercase">
                      {choice.tech}
                    </h3>
                    <div className="text-xs text-[#FF3B00] font-bold mt-1">
                      REJECTED ALTERNATIVE: {choice.alternativeRejected}
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-xs sm:text-sm font-sans text-black/85 leading-relaxed font-medium">
                      {choice.rationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Data Flow & Execution Lifecycle */}
        {caseStudy && (
          <div className="p-4 sm:p-6 md:p-10 border-2 border-black bg-[#0D0D0D] text-[#F4F1EA] shadow-[6px_6px_0px_0px_rgba(255,59,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(255,59,0,1)] crosshair-corner">
            <div className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>08 // DATA FLOW & EXECUTION LIFECYCLE</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase mb-4 sm:mb-6 break-words">
              END-TO-END EXECUTION SEQUENCE
            </h2>

            <div className="space-y-3 font-mono">
              {caseStudy.dataFlowLifecycle.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 border border-[#262626] bg-[#141414] text-xs text-[#F4F1EA] leading-relaxed flex items-start gap-2.5 sm:gap-3"
                >
                  <span className="text-[#FF3B00] font-black shrink-0">↳</span>
                  <span className="break-words">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Engineering Decisions & Trade-Offs */}
        {caseStudy && (
          <div className="p-4 sm:p-6 md:p-10 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
            <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>09 // ARCHITECTURAL DECISIONS & TRADE-OFFS</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase mb-4 sm:mb-6 break-words">
              KEY SYSTEM DECISIONS & ALTERNATIVES EVALUATED
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {caseStudy.engineeringDecisions.map((dec, idx) => (
                <div key={idx} className="p-4 sm:p-6 border-2 border-black bg-[#F4F1EA]/60 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-2">
                    <h3 className="text-base font-black text-black uppercase">
                      {dec.title}
                    </h3>
                    <span className="text-[10px] bg-black text-[#F4F1EA] px-2 py-0.5 font-bold">
                      DECISION #{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="text-[10px] text-black/60 font-bold uppercase block mb-1">
                        SELECTED ARCHITECTURAL PATH:
                      </span>
                      <p className="text-xs font-bold text-black font-sans leading-relaxed">
                        {dec.decision}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#FF3B00] font-bold uppercase block mb-1">
                        ALTERNATIVE CONSIDERED:
                      </span>
                      <p className="text-xs text-black/70 font-sans leading-relaxed">
                        {dec.alternativeConsidered}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-black/15 pt-3">
                    <span className="text-[10px] text-black/60 font-bold uppercase block mb-1">
                      TRADE-OFF RATIONALE & JUSTIFICATION:
                    </span>
                    <p className="text-xs font-sans text-black/80 leading-relaxed">
                      {dec.tradeoffRationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tradeoff Dimension Summary Table & Mobile Cards */}
            {/* Mobile Stacked Card Layout (< 768px) */}
            <div className="md:hidden space-y-3 mt-6">
              <div className="text-[10px] text-black/60 font-bold uppercase tracking-wider mb-2">
                TRADEOFF MATRIX // ARCHITECTURAL COMPROMISES:
              </div>
              {caseStudy.tradeoffsSummary.map((t, idx) => (
                <div key={idx} className="p-3.5 border-2 border-black bg-white space-y-2">
                  <div className="text-[10px] text-black/60 font-bold uppercase">
                    DIMENSION: <span className="text-black font-black">{t.dimension}</span>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 border border-black/20 bg-[#CCFF00]/20">
                      <span className="text-[9px] font-bold text-black uppercase block">CHOSEN APPROACH:</span>
                      <span className="font-bold text-black">{t.chosenApproach}</span>
                    </div>
                    <div className="p-2 border border-black/20 bg-[#FF3B00]/10">
                      <span className="text-[9px] font-bold text-[#FF3B00] uppercase block">SACRIFICED:</span>
                      <span className="text-black/70">{t.sacrificedAlternative}</span>
                    </div>
                  </div>
                  <div className="text-xs font-sans text-black/80 pt-1 border-t border-black/10">
                    <span className="font-bold font-mono text-[10px] text-black/60 block">RATIONALE:</span>
                    {t.justification}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Full Table (>= 768px) */}
            <div className="hidden md:block mt-8 border-2 border-black overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-black bg-black text-[#F4F1EA]">
                    <th className="p-3 font-bold">DIMENSION</th>
                    <th className="p-3 font-bold text-[#CCFF00]">CHOSEN APPROACH</th>
                    <th className="p-3 font-bold text-[#FF3B00]">SACRIFICED ALTERNATIVE</th>
                    <th className="p-3 font-bold">RATIONALE</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudy.tradeoffsSummary.map((t, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-black/20 bg-white hover:bg-[#F4F1EA]/60"
                    >
                      <td className="p-3 font-bold">{t.dimension}</td>
                      <td className="p-3 text-black font-bold">{t.chosenApproach}</td>
                      <td className="p-3 text-black/60">{t.sacrificedAlternative}</td>
                      <td className="p-3 text-xs font-sans text-black/80">{t.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. Limitations & Future Roadmap */}
        {caseStudy && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Limitations */}
            <div className="p-4 sm:p-6 md:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
              <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>10 // KNOWN CONSTRAINTS & LIMITATIONS</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-black uppercase mb-4">
                SYSTEM BOUNDARIES
              </h3>
              <ul className="space-y-3 text-xs font-sans text-black/80">
                {caseStudy.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#FF3B00] font-bold font-mono shrink-0">!</span>
                    <span className="leading-relaxed">{lim}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Future Roadmap */}
            <div className="p-4 sm:p-6 md:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
              <div className="text-xs font-bold text-[#CCFF00] bg-black px-2 py-0.5 inline-flex items-center gap-1.5 uppercase tracking-wider mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>11 // FUTURE IMPROVEMENT ROADMAP</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-black uppercase mb-4">
                NEXT-GEN ARCHITECTURAL PHASES
              </h3>
              <ul className="space-y-3 text-xs font-sans text-black/80">
                {caseStudy.futureRoadmap.map((road, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#FF3B00] font-bold font-mono shrink-0">→</span>
                    <span className="leading-relaxed">{road}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 10. Key Features & Simulated Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Key Features */}
          <div className="lg:col-span-6 p-4 sm:p-6 md:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-base sm:text-lg font-black text-black uppercase mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF3B00]" />
              <span>CORE CAPABILITIES & GUARANTEES</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-black/80 font-sans">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#FF3B00] font-bold font-mono">↳</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benchmark Metrics */}
          <div className="lg:col-span-6 p-4 sm:p-6 md:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-base sm:text-lg font-black text-black uppercase mb-4 flex items-center justify-between">
              <span>12 // SIMULATED BENCHMARK LOGS</span>
              <span className="text-[10px] text-[#FF3B00] font-normal font-mono">
                [SYNTHETIC TEST STREAM]
              </span>
            </h3>
            <div className="space-y-4">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 border border-black/20 bg-[#F4F1EA]/70">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-bold text-black/70">{metric.label}</span>
                    <span className="text-xl font-black text-black">{metric.value}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-black/60">{metric.note}</span>
                    {metric.delta && (
                      <span className="text-[#FF3B00] font-bold">{metric.delta}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Previous / Next Project Navigation Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12 border-t-2 border-black">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="p-4 border-2 border-black bg-white hover:border-[#FF3B00] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
            >
              <div className="text-[10px] text-[#FF3B00] font-bold mb-1 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREVIOUS CASE STUDY</span>
              </div>
              <div className="text-sm font-black uppercase truncate">{prevProject.title}</div>
            </Link>
          ) : (
            <div></div>
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="p-4 border-2 border-black bg-white hover:border-[#FF3B00] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right group sm:col-start-2 focus-visible:ring-2 focus-visible:ring-[#FF3B00]"
            >
              <div className="text-[10px] text-[#FF3B00] font-bold mb-1 flex items-center justify-end gap-1">
                <span>NEXT CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm font-black uppercase truncate">{nextProject.title}</div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </section>

      {/* Closing Contact CTA */}
      <ContactCTASection />
    </div>
  );
}
