"use client";

import { useState } from "react";
import { Briefcase, GraduationCap, Edit3, Calendar, MapPin } from "lucide-react";
import { experienceData, educationData, TimelineEntry } from "@/data/experience";

export function TimelineSection() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  const items = activeTab === "experience" ? experienceData : educationData;

  return (
    <section className="w-full border-b-2 border-black bg-[#F4F1EA] py-14 sm:py-20 lg:py-28 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-4 sm:pb-6 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF3B00] tracking-widest mb-1 sm:mb-2">
              <Briefcase className="w-4 h-4" />
              <span>04 {"//"} PROFESSIONAL TRAJECTORY</span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl font-black text-black tracking-tight uppercase leading-none">
              CAREER & EDUCATION
            </h2>
          </div>

          {/* Tab selector */}
          <div
            role="tablist"
            aria-label="Timeline Categories"
            className="flex items-center w-full sm:w-auto border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "experience"}
              onClick={() => setActiveTab("experience")}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 focus-visible:ring-2 focus-visible:ring-[#FF3B00] ${
                activeTab === "experience"
                  ? "bg-black text-[#F4F1EA]"
                  : "bg-white text-black hover:bg-black/5"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>EXPERIENCE [{experienceData.length}]</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "education"}
              onClick={() => setActiveTab("education")}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 border-l-2 border-black focus-visible:ring-2 focus-visible:ring-[#FF3B00] ${
                activeTab === "education"
                  ? "bg-black text-[#F4F1EA]"
                  : "bg-white text-black hover:bg-black/5"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>EDUCATION [{educationData.length}]</span>
            </button>
          </div>
        </div>

        {/* Editable Notice Badge */}
        <div className="p-3.5 sm:p-4 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <Edit3 className="w-5 h-5 text-[#FF3B00] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-black uppercase">
                EDITABLE DEMONSTRATION STRUCTURE:
              </span>{" "}
              <span className="text-black/70">
                Timeline entries below are structured placeholders. Verified credentials can be configured directly in{" "}
                <code className="bg-black/5 px-1 py-0.5 border border-black/20 text-[#FF3B00] font-bold">
                  src/data/experience.ts
                </code>
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-[#CCFF00] text-black px-2 py-0.5 border border-black shrink-0">
            PLACEHOLDER DATA
          </span>
        </div>

        {/* Timeline List */}
        <div className="space-y-4 sm:space-y-6">
          {items.map((entry) => (
            <TimelineCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="p-4 sm:p-8 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/15 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF3B00] tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{entry.period}</span>
            <span>{"//"}</span>
            <MapPin className="w-3.5 h-3.5" />
            <span>{entry.location}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
            {entry.roleOrDegree}
          </h3>
          <p className="text-sm font-bold text-black/80 mt-0.5">
            {entry.institutionOrCompany}
          </p>
        </div>

        <span className="text-[9px] font-bold px-2 py-1 bg-black text-[#F4F1EA] border border-black">
          EDITABLE DEMO RECORD
        </span>
      </div>

      <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed mb-4">
        {entry.summary}
      </p>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-6 text-xs text-black/70">
        {entry.highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-[#FF3B00] font-bold">↳</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/10">
        {entry.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="text-[10px] font-bold px-2 py-0.5 border border-black/20 bg-[#F4F1EA] text-black"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
