"use client";

import Link from "next/link";
import { ArrowUp, Terminal, ShieldAlert, Compass } from "lucide-react";
import { profileData } from "@/data/profile";
import { socialsData } from "@/data/socials";
import { OmMonogram } from "@/components/brand/OmMonogram";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0D0D0D] text-[#F4F1EA] border-t-4 border-black relative overflow-hidden font-mono">
      {/* Decorative top coordinate band */}
      <div className="border-b border-[#262626] px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#A39F94]">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#FF3B00] animate-ping"></span>
          <span className="font-bold text-[#F4F1EA]">SYS_TELEMETRY: ACTIVE</span>
          <span className="hidden sm:inline text-[#6E6A61]">{"//"}</span>
          <span className="hidden sm:inline">COORDINATES: {profileData.location.coordinates}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span>TIMEZONE: {profileData.location.timezone}</span>
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 border border-[#262626] hover:border-[#FF3B00] hover:text-[#FF3B00] transition-colors"
            aria-label="Scroll back to top"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Massive Typographic Wordmark & Stamped Monogram */}
        <div className="mb-16 select-none border-b-2 border-[#262626] pb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="text-[12vw] sm:text-[10vw] font-black tracking-tighter leading-none text-[#F4F1EA] hover:text-[#CCFF00] transition-colors duration-300">
              OM SHINDE
            </div>
            <OmMonogram
              size={88}
              className="border-2 border-[#FF3B00] shadow-[6px_6px_0px_0px_rgba(255,59,0,1)] shrink-0"
              showCoordinates
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-xs sm:text-sm text-[#A39F94] font-bold">
            <span className="tracking-widest uppercase">
              {"// AI SYSTEMS ARCHITECT & RESEARCH ENGINEER"}
            </span>
            <span className="text-[#FF3B00]">
              EXPERIMENTATION → PRODUCTION ENGINEERING
            </span>
          </div>
        </div>

        {/* Matrix Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Col 1: Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-xs font-bold text-[#FF3B00] flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>CORE ARCHITECTURAL INTENT</span>
            </div>
            <p className="text-xs sm:text-sm text-[#A39F94] leading-relaxed">
              Engineering deterministic, reliable machine learning infrastructure where autonomous
              agents, dense vector search, and high-performance inference intersect. Built for low
              latency, strict grounding, and high availability.
            </p>
            <div className="p-3 border border-[#262626] bg-[#141414] text-[11px] text-[#A39F94]">
              <span className="text-[#CCFF00] font-bold">STATUS: </span>
              {profileData.availability.statusText}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-bold text-[#FF3B00] flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>NAVIGATION DIRECTORY</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#FF3B00] transition-colors flex items-center gap-2">
                  <span className="text-[#6E6A61]">01</span> HOME / INDEX
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF3B00] transition-colors flex items-center gap-2">
                  <span className="text-[#6E6A61]">02</span> ABOUT / PHILOSOPHY
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#FF3B00] transition-colors flex items-center gap-2">
                  <span className="text-[#6E6A61]">03</span> PROJECTS / CASE STUDIES
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF3B00] transition-colors flex items-center gap-2">
                  <span className="text-[#6E6A61]">04</span> CONTACT / DISPATCH
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Channels */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-bold text-[#FF3B00] flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>COMMUNICATION CHANNELS</span>
            </div>
            <div className="space-y-2 text-xs">
              {socialsData.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#262626] hover:border-[#FF3B00] hover:bg-[#171717] transition-all flex items-center justify-between group"
                >
                  <span className="font-bold text-[#F4F1EA] group-hover:text-[#FF3B00]">
                    {social.label}
                  </span>
                  <span className="text-[10px] text-[#A39F94] font-normal truncate max-w-[150px]">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Verification & Transparency Disclaimer Box */}
        <div className="p-4 border-2 border-[#262626] bg-[#141414] mb-12 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
          <div className="text-[11px] text-[#A39F94] space-y-1">
            <p className="font-bold text-[#F4F1EA]">
              PORTFOLIO SUBJECT & METRICS TRANSPARENCY NOTICE:
            </p>
            <p>
              Portfolio Subject: Om Shinde. The 5 AI case studies presented in this portfolio represent architectural demonstration
              concepts. All performance benchmarks, latency numbers, and throughput metrics are simulated
              illustrative specifications designed to demonstrate AI systems engineering capabilities. Repository maintenance and developer attribution are strictly decoupled from the portfolio subject.
            </p>
          </div>
        </div>

        {/* Copyright & Technical Stamp */}
        <div className="border-t border-[#262626] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#6E6A61]">
          <div>
            © 2026 OM SHINDE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>NEXT.JS 16 // REACT 19</span>
            <span>{"//"}</span>
            <span>BRUTALIST ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
