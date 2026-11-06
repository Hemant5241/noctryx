"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import { skillsData, allSkillsList } from "@/data/skills";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>(skillsData[0].id);

  const activeCategory = skillsData.find((c) => c.id === selectedCategory) || skillsData[0];

  return (
    <section className="w-full border-b-2 border-black bg-[#F4F1EA] py-16 sm:py-24 font-mono overflow-hidden">
      {/* Infinite Animated Marquee Ticker */}
      <div className="w-full border-y-2 border-black bg-[#0D0D0D] text-[#F4F1EA] py-3.5 mb-16 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs sm:text-sm font-bold tracking-widest uppercase">
          {/* Duplicate list to create seamless infinite loop */}
          {[...allSkillsList, ...allSkillsList].map((skill, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span className="text-[#F4F1EA] hover:text-[#CCFF00] transition-colors">
                {skill}
              </span>
              <span className="text-[#FF3B00] font-black">{"//"}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF3B00] tracking-widest mb-1">
              <Cpu className="w-4 h-4" />
              <span>02 {"//"} TECHNICAL MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-none">
              COMPUTATIONAL STACK
            </h2>
          </div>
          <div className="text-[11px] text-black/60 font-bold uppercase">
            SPECIALIZED AI CAPABILITIES
          </div>
        </div>

        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Skill Categories"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-8"
        >
          {skillsData.map((category) => {
            const isSelected = category.id === selectedCategory;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${category.id}`}
                id={`tab-${category.id}`}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 text-left border-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF3B00] ${
                  isSelected
                    ? "bg-black text-[#F4F1EA] border-black shadow-[4px_4px_0px_0px_rgba(255,59,0,1)]"
                    : "bg-white text-black border-black/30 hover:border-black hover:bg-black/5"
                }`}
              >
                <div className="text-[10px] text-[#FF3B00] font-bold mb-1">
                  {category.code}
                </div>
                <div className="text-xs sm:text-sm font-black tracking-tight uppercase">
                  {category.categoryName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill Details */}
        <div
          role="tabpanel"
          id={`panel-${activeCategory.id}`}
          aria-labelledby={`tab-${activeCategory.id}`}
          className="p-6 sm:p-8 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] crosshair-corner"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/15 pb-4 mb-6">
            <div>
              <span className="text-xs text-[#FF3B00] font-bold tracking-wider">
                ACTIVE DOMAIN {"//"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                {activeCategory.categoryName}
              </h3>
            </div>
            <p className="text-xs text-black/70 max-w-md">
              {activeCategory.summary}
            </p>
          </div>

          {/* Skill items grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 border-2 border-black/15 bg-[#F4F1EA]/50 hover:border-black hover:bg-white transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black text-black group-hover:text-[#FF3B00] transition-colors">
                    {skill.name}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 border ${
                      skill.levelTag === "CORE"
                        ? "bg-[#FF3B00] text-white border-black"
                        : skill.levelTag === "SPECIALIZED"
                        ? "bg-[#CCFF00] text-black border-black"
                        : "bg-black text-[#F4F1EA] border-black"
                    }`}
                  >
                    {skill.levelTag}
                  </span>
                </div>
                <p className="text-[11px] text-black/70 leading-normal">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
