import type { Metadata } from "next";
import { Camera, BookOpen } from "lucide-react";
import { profileData } from "@/data/profile";
import { experienceData, educationData } from "@/data/experience";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { OmMonogram } from "@/components/brand/OmMonogram";
import { GitHubActivitySection } from "@/components/github/GitHubActivitySection";

export const metadata: Metadata = {
  title: "About // Engineering Philosophy // Hemant Bhosale",
  description:
    "Background, operating philosophy, technical interests, and architectural methodologies of Full Stack Developer Hemant Bhosale.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#F4F1EA] text-[#0D0D0D] font-mono">
      {/* Header section */}
      <section className="border-b-2 border-black bg-grid-paper py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-3 mb-6 text-xs text-black/60">
            <div className="flex items-center gap-2">
              <span className="font-bold text-black">HEMANT BHOSALE</span>
              <span>{"//"}</span>
              <span className="text-[#FF3B00] font-bold">ABOUT & PHILOSOPHY</span>
            </div>
            <div>STATUS: {profileData.availability.statusText}</div>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-black tracking-tight uppercase leading-[0.95] mb-4 sm:mb-6 break-words">
            ENGINEERING <br />
            <span className="text-[#FF3B00]">DELIBERATE</span> SOFTWARE.
          </h1>

          <p className="font-sans text-base sm:text-xl font-bold text-black/80 max-w-3xl leading-snug">
            Building modern web applications with focus on performance, accessibility, and architectural clarity.
          </p>
        </div>
      </section>

      {/* Main Narrative & Viewfinder Portrait Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Portrait Viewfinder Placeholder */}
          <div className="lg:col-span-5 space-y-4">
            <div
              role="img"
              aria-label="Portrait viewfinder placeholder for Hemant Bhosale"
              className="relative aspect-square w-full border-3 sm:border-4 border-black bg-[#0D0D0D] p-4 sm:p-6 text-[#F4F1EA] shadow-[6px_6px_0px_0px_rgba(255,59,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(255,59,0,1)] crosshair-corner flex flex-col justify-between overflow-hidden"
            >
              {/* Camera HUD Grid */}
              <div className="absolute inset-0 bg-dots-pattern opacity-25 pointer-events-none" aria-hidden="true"></div>

              {/* Viewfinder crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-20 h-20 border-t border-b border-l border-r border-[#FF3B00]/40"></div>
                <div className="absolute w-2 h-2 bg-[#CCFF00]"></div>
              </div>

              {/* Top Viewfinder Telemetry */}
              <div className="flex items-center justify-between text-[10px] text-[#A39F94] relative z-10" aria-hidden="true">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#FF3B00]" />
                  <span>ISO 100 // f/2.8 // 50MM</span>
                </span>
                <span className="text-[#CCFF00] font-bold">[1:1 RATIO]</span>
              </div>

              {/* Center Placeholders Message */}
              <div className="relative z-10 text-center space-y-2 p-4 border border-[#262626] bg-black/80">
                <OmMonogram
                  size={56}
                  className="mx-auto border-2 border-[#FF3B00] shadow-[0_0_12px_rgba(255,59,0,0.5)] mb-2"
                />
                <p className="text-xs font-bold text-[#F4F1EA] uppercase tracking-wide">
                  REPLACEABLE PORTRAIT PLACEHOLDER
                </p>
                <p className="text-[10px] text-[#A39F94] leading-relaxed">
                  Hemant Bhosale can drop a verified portrait photograph here by placing an image file in the public
                  assets directory.
                </p>
              </div>

              {/* Bottom HUD */}
              <div className="flex items-center justify-between text-[10px] text-[#A39F94] relative z-10 border-t border-[#262626] pt-2" aria-hidden="true">
                <span>COORD: {profileData.location.coordinates}</span>
                <span className="text-[#FF3B00]">HB_PORTRAIT.RAW</span>
              </div>
            </div>

            {/* Verification Disclaimer */}
            <div className="p-3 border-2 border-black bg-white text-[11px] text-black/70">
              <strong className="text-black uppercase">NOTE:</strong> No synthetic or fabricated
              photograph is passed off as real. This designated HUD area allows quick insertion of Hemant&apos;s
              verified photograph.
            </div>
          </div>

          {/* Right Column: In-depth Biography & Engineering Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider">
                01 // BACKGROUND & MISSION
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-black uppercase">
                FULL STACK DEVELOPER // WEB ENGINEER
              </h2>
              <p className="font-sans text-sm sm:text-base text-black/80 leading-relaxed">
                {profileData.shortBio}
              </p>
            </div>

            {/* Operating Manifesto Points */}
            <div className="space-y-4 border-t-2 border-black pt-6">
              <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider">
                02 // CORE OPERATING THESIS
              </div>

              <div className="space-y-3">
                {profileData.manifesto.map((item, idx) => (
                  <div key={idx} className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-xs font-black text-[#FF3B00] mr-2">
                      [PRINCIPLE 0{idx + 1}]
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Research Reading & Areas of Interest */}
            <div className="space-y-4 border-t-2 border-black pt-6">
              <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>03 // ACTIVE TECHNICAL EXPLORATIONS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: "Modern React & Server Components",
                    notes: "Streaming SSR, partial prerendering (PPR), and zero-bundle-size server logic.",
                  },
                  {
                    title: "High-Performance Client State",
                    notes: "Fine-grained reactivity, Canvas rendering, and requestAnimationFrame pipelines.",
                  },
                  {
                    title: "Type-Safe API Contracts",
                    notes: "End-to-end schema validation, REST/GraphQL design, and strict TypeScript contracts.",
                  },
                  {
                    title: "Accessible & Responsive Systems",
                    notes: "WCAG AAA compliance, cross-theme color tokens, and fluid typography across viewports.",
                  },
                ].map((interest, idx) => (
                  <div key={idx} className="p-3 border border-black bg-white">
                    <h4 className="font-bold text-xs text-black uppercase mb-1">
                      {interest.title}
                    </h4>
                    <p className="text-[11px] text-black/70 font-sans leading-normal">
                      {interest.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Timelines */}
      <section className="border-t-2 border-black bg-[#F4F1EA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="text-xs font-bold text-[#FF3B00] uppercase tracking-wider mb-2">
              04 // CREDENTIALS & CAREER RECORDS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tight">
              PROFESSIONAL TRAJECTORY
            </h2>
            <p className="text-xs text-black/60 mt-1">
              DEMONSTRATION TIMELINE PLACEHOLDERS // EDITABLE VIA SRC/DATA/EXPERIENCE.TS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Experience Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-black uppercase border-b-2 border-black pb-2">
                ENGINEERING EXPERIENCE [{experienceData.length}]
              </h3>
              <div className="space-y-4">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="p-5 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-[10px] text-[#FF3B00] font-bold mb-1">
                      {exp.period} {"//"} {exp.location}
                    </div>
                    <h4 className="font-black text-base text-black uppercase">{exp.roleOrDegree}</h4>
                    <div className="text-xs font-bold text-black/70 mb-2">{exp.institutionOrCompany}</div>
                    <p className="text-xs font-sans text-black/80 leading-relaxed mb-3">{exp.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 border border-black/20 bg-[#F4F1EA] text-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-black uppercase border-b-2 border-black pb-2">
                ACADEMIC FOUNDATION [{educationData.length}]
              </h3>
              <div className="space-y-4">
                {educationData.map((edu) => (
                  <div key={edu.id} className="p-5 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-[10px] text-[#FF3B00] font-bold mb-1">
                      {edu.period} {"//"} {edu.location}
                    </div>
                    <h4 className="font-black text-base text-black uppercase">{edu.roleOrDegree}</h4>
                    <div className="text-xs font-bold text-black/70 mb-2">{edu.institutionOrCompany}</div>
                    <p className="text-xs font-sans text-black/80 leading-relaxed mb-3">{edu.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {edu.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 border border-black/20 bg-[#F4F1EA] text-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 // Real Public GitHub Integration */}
      <GitHubActivitySection />

      {/* Closing Contact CTA */}
      <ContactCTASection />
    </div>
  );
}
