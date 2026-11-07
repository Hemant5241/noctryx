"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Cpu } from "lucide-react";
import { profileData } from "@/data/profile";
import { NeuralVisualizer } from "./NeuralVisualizer";
import { OmMonogram } from "@/components/brand/OmMonogram";
import { useTheme } from "@/context/ThemeContext";

export function HeroSection() {
  const { theme } = useTheme();
  return (
    <section className="relative w-full border-b-2 border-black bg-grid-paper pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
      {/* Decorative top coordinate tag */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-black/60 pb-3 border-b border-black/15">
          <div className="flex items-center gap-2">
            <span className="font-black text-black">HEMANT BHOSALE</span>
            <span>{"//"}</span>
            <span className="text-[#FF3B00] font-bold">PORTFOLIO INDEX 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <span>LOC: {profileData.location.city.toUpperCase()}</span>
            <span>{"//"}</span>
            <span>STATUS: {profileData.availability.status.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Editorial Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Left Column: Typographic Title & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {theme === "signal-studio" ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4FA3] text-[#1B1020] font-mono text-xs font-black tracking-widest uppercase border-2 border-[#1B1020] shadow-[3px_3px_0px_0px_#1B1020] -rotate-0.5">
                  <Cpu className="w-3.5 h-3.5 text-[#1B1020]" />
                  <span>{profileData.role}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black text-[#F4F1EA] font-mono text-xs font-bold tracking-widest uppercase border border-black shadow-[2px_2px_0px_0px_rgba(255,59,0,1)]">
                  <Cpu className="w-3.5 h-3.5 text-[#FF3B00]" />
                  <span>{profileData.role}</span>
                </div>
              )}
              {theme === "signal-studio" ? (
                <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 bg-[#C6FF00] border-2 border-[#1B1020] font-mono text-[10px] font-black text-[#1B1020] shadow-[3px_3px_0px_0px_#6938FF] rotate-0.5">
                  <OmMonogram size={16} />
                  <span>ATELIER // ACID POP LAB</span>
                </div>
              ) : (
                <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-black/30 font-mono text-[10px] font-bold text-black/70 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <OmMonogram size={16} />
                  <span>BRAND MARK: HB//SYS</span>
                </div>
              )}
            </div>

            <h1 className="font-mono font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tighter leading-[0.95] text-black uppercase break-words">
              ARCHITECTING <br />
              {theme === "signal-studio" ? (
                <span className="relative inline-block bg-[#6938FF] text-[#C6FF00] px-2.5 py-0.5 sm:px-4 sm:py-1 border-2 sm:border-3 border-[#1B1020] shadow-[4px_4px_0px_0px_#FF4FA3] sm:shadow-[6px_6px_0px_0px_#FF4FA3] -rotate-1 rounded-sm my-1 sm:my-1.5 transition-transform hover:rotate-0 hover:scale-105">
                  <span className="relative z-10 font-black tracking-tight">INTELLIGENT</span>
                </span>
              ) : theme === "crimson-noir" ? (
                <span className="relative inline-block text-[#FF3838] px-2 sm:px-2.5 py-0.5 border border-[#CDCBCA]/30 bg-[#161214] shadow-[0_0_20px_rgba(212,21,20,0.35)] rounded-sm my-1">
                  <span className="relative z-10 font-black drop-shadow-[0_0_8px_rgba(255,56,56,0.6)]">
                    INTELLIGENT
                  </span>
                </span>
              ) : (
                <span className="relative inline-block text-[#FF3B00]">
                  <span className="relative z-10">INTELLIGENT</span>
                  <span className="absolute bottom-0 sm:bottom-1 left-0 w-full h-2 sm:h-3.5 bg-[#CCFF00] z-0 -rotate-0.5"></span>
                </span>
              )}{" "}
              <br />
              SYSTEMS.
            </h1>

            <p className="font-sans text-base sm:text-xl text-black/80 font-medium leading-relaxed max-w-2xl">
              {profileData.headline}
            </p>

            <p className="font-mono text-xs sm:text-sm text-black/70 leading-relaxed max-w-xl">
              {profileData.shortBio}
            </p>

            {/* CTA Action Row */}
            <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
              <Link href="/projects" className="brutalist-button brutalist-button-primary w-full xs:w-auto text-center justify-center">
                <span>EXPLORE PROJECTS [05]</span>
                <ArrowDownRight className="w-4 h-4 ml-2" />
              </Link>

              <Link href="/contact" className="brutalist-button w-full xs:w-auto text-center justify-center">
                <span>ESTABLISH CONTACT</span>
                <ArrowUpRight className="w-4 h-4 ml-2 text-[#FF3B00]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Neural Tensor Visualizer */}
          <div className="lg:col-span-5 w-full">
            <NeuralVisualizer />
          </div>
        </div>

        {/* Industrial Stats Strip */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t-2 border-black font-mono">
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
            >
              <div className="flex items-center justify-between text-[10px] text-black/60 font-bold tracking-wider mb-1">
                <span>{stat.label}</span>
                {stat.isSimulated && (
                  <span className="text-[#FF3B00] text-[9px] bg-[#FF3B00]/10 px-1 py-0.5 border border-[#FF3B00]/30">
                    SIMULATED
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-2xl sm:text-4xl font-black text-black tracking-tight">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs font-bold text-black/70 tracking-wider">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-black/60 leading-tight">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
