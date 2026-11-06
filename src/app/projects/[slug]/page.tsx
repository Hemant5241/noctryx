import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ShieldAlert, Terminal, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/data/projects";
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
    title: `${project.title} // Case Study // Om Shinde`,
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
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  return (
    <div className="w-full bg-[#F4F1EA] text-[#0D0D0D] font-mono">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b-2 border-black bg-white px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold hover:text-[#FF3B00] transition-colors"
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
      <section className="border-b-2 border-black bg-grid-paper py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
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

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight uppercase leading-[0.95] mb-6">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-[#FF3B00] max-w-3xl leading-snug mb-6">
            {project.tagline}
          </p>

          <p className="text-sm sm:text-base font-sans text-black/80 max-w-3xl leading-relaxed mb-8">
            {project.shortSummary}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/20">
            <span className="text-xs text-black/50 font-bold mr-2">TECH RUNTIME:</span>
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 border-2 border-black bg-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Notice Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#FF3B00] shrink-0 mt-0.5" />
          <div className="text-xs text-black/80">
            <strong className="text-black uppercase">
              PORTFOLIO DEMONSTRATION & ARCHITECTURAL CASE STUDY:
            </strong>{" "}
            This project is an architectural demonstration conceived by Om Shinde to showcase
            end-to-end systems design, pipeline modeling, and deployment strategies. Performance
            metrics are illustrative simulated benchmarks. The interactive module below runs an
            in-browser simulation.
          </div>
        </div>
      </div>

      {/* Main Architecture & Deep Dive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Problem & Proposed Solution Dual Cards */}
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

        {/* Phase 3: Embedded Interactive AI Demonstration Module */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#FF3B00]" />
              <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                INTERACTIVE DEMONSTRATION & RUNTIME
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

        {/* Technical Approach & Pipeline */}
        <div className="p-6 sm:p-10 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
          <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2">
            03 // ENGINEERING METHODOLOGY
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase mb-6">
            TECHNICAL APPROACH & PIPELINE
          </h2>

          <div className="space-y-4 mb-8">
            {project.technicalApproach.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 border border-black/15 bg-[#F4F1EA]/60">
                <span className="px-2 py-0.5 bg-black text-[#F4F1EA] text-xs font-bold shrink-0">
                  0{idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 border-2 border-black bg-[#0D0D0D] text-[#F4F1EA]">
            <div className="text-[10px] text-[#FF3B00] font-bold uppercase mb-1">
              PIPELINE FLOW GRAPH:
            </div>
            <div className="text-xs text-[#CCFF00] font-mono leading-relaxed">
              {project.architectureOverview}
            </div>
          </div>
        </div>

        {/* Key Features & Simulated Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Features */}
          <div className="lg:col-span-6 p-6 sm:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-lg font-black text-black uppercase mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF3B00]" />
              <span>CORE CAPABILITIES</span>
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
          <div className="lg:col-span-6 p-6 sm:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-lg font-black text-black uppercase mb-4 flex items-center justify-between">
              <span>SIMULATED BENCHMARKS</span>
              <span className="text-[10px] text-[#FF3B00] font-normal font-mono">
                [ILLUSTRATIVE TARGETS]
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
              className="p-4 border-2 border-black bg-white hover:border-[#FF3B00] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group"
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
              className="p-4 border-2 border-black bg-white hover:border-[#FF3B00] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-right group sm:col-start-2"
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
