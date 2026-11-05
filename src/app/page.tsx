import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { TimelineSection } from "@/components/home/TimelineSection";
import { ContactCTASection } from "@/components/home/ContactCTASection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 01. Visually Dominant Hero with Tensor Visualizer */}
      <HeroSection />

      {/* 02. Engineering Manifesto & Operating Philosophy */}
      <ManifestoSection />

      {/* 03. Technical Matrix & Infinite Skills Ticker */}
      <SkillsSection />

      {/* 04. Asymmetrical 5-Project Showcase */}
      <ProjectsShowcase />

      {/* 05. Career & Education Timeline (Editable Placeholder Records) */}
      <TimelineSection />

      {/* 06. Interactive Contact CTA */}
      <ContactCTASection />
    </div>
  );
}
