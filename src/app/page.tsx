import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { TimelineSection } from "@/components/home/TimelineSection";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { TechnicalDivider } from "@/components/brand/TechnicalDivider";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 01. Visually Dominant Hero with Tensor Visualizer */}
      <HeroSection />

      {/* 02. Engineering Manifesto & Operating Philosophy */}
      <ManifestoSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <TechnicalDivider label="COMPUTATIONAL MATRIX" code="SEC//02" accent="orange" />
      </div>

      {/* 03. Technical Matrix & Infinite Skills Ticker */}
      <SkillsSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <TechnicalDivider label="CASE STUDY ARCHIVES" code="SEC//03" accent="yellow" />
      </div>

      {/* 04. Asymmetrical 5-Project Showcase */}
      <ProjectsShowcase />

      {/* 05. Career & Education Timeline (Editable Placeholder Records) */}
      <TimelineSection />

      {/* 06. Interactive Contact CTA */}
      <ContactCTASection />
    </div>
  );
}
