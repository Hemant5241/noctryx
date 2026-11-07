import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { ProjectsCatalogView } from "@/components/projects/ProjectsCatalogView";
import { ContactCTASection } from "@/components/home/ContactCTASection";

export const metadata: Metadata = {
  title: "Projects & Case Studies // Om Shinde",
  description:
    "Architectural case studies and demonstration systems in Dense Vector Retrieval, Real-time Computer Vision, Autonomous Agent Workflows, Temporal Forecasting, and Enterprise RAG.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full bg-[#F4F1EA] text-[#0D0D0D] font-mono">
      {/* Header section */}
      <section className="border-b-2 border-black bg-grid-paper py-10 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF3B00] tracking-widest mb-3">
            <Layers className="w-4 h-4" />
            <span>CASE STUDIES // 05 ARCHITECTURES</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black text-black tracking-tight uppercase leading-none mb-4 break-words">
            PROJECTS CATALOGUE
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-sans text-black/80 max-w-2xl leading-relaxed">
            Exploration of 5 full-stack artificial intelligence architectures designed for
            low-latency dense retrieval, edge computer vision inference, autonomous multi-agent
            execution graphs, and verified knowledge synthesis.
          </p>
        </div>
      </section>

      {/* Main Catalogue View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ProjectsCatalogView />
      </div>

      {/* Contact CTA */}
      <ContactCTASection />
    </div>
  );
}
