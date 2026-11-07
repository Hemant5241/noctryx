import { Terminal, ShieldCheck, Flame, Zap } from "lucide-react";

export function ManifestoSection() {
  return (
    <section className="w-full bg-[#0D0D0D] text-[#F4F1EA] border-b-2 border-black py-14 sm:py-20 lg:py-28 relative overflow-hidden font-mono">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262626] pb-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#FF3B00]" />
            <h2 className="text-xs font-bold text-[#FF3B00] tracking-widest uppercase">
              01 {"//"} ENGINEERING MANIFESTO
            </h2>
          </div>
          <div className="text-[11px] text-[#A39F94] font-medium">
            PHILOSOPHY & SYSTEM PRINCIPLES
          </div>
        </div>

        {/* Lead Quote */}
        <div className="mb-10 sm:mb-16">
          <p className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider mb-3">
            {"// OPERATING THESIS"}
          </p>
          <blockquote className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#F4F1EA] uppercase break-words">
            &ldquo;I ENGINEER RESILIENT FULL-STACK SYSTEMS THAT TURN{" "}
            <span className="text-[#FF3B00] underline decoration-[#CCFF00] decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">
              TECHNICAL COMPLEXITY
            </span>{" "}
            INTO DETERMINISTIC UTILITY.&rdquo;
          </blockquote>
        </div>

        {/* Three Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 border-2 border-[#262626] bg-[#141414] hover:border-[#FF3B00] transition-colors relative group">
            <div className="w-10 h-10 border border-[#262626] bg-black flex items-center justify-center text-[#FF3B00] mb-6 group-hover:bg-[#FF3B00] group-hover:text-black transition-all">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F1EA] mb-3 tracking-tight">
              01. PERFORMANCE OVER COMPLEXITY
            </h3>
            <p className="text-xs text-[#A39F94] leading-relaxed">
              Modern web applications demand responsiveness and architectural discipline. I design performant
              systems with clean component state, modular API integration, and low-latency interaction loops.
            </p>
          </div>

          <div className="p-6 border-2 border-[#262626] bg-[#141414] hover:border-[#CCFF00] transition-colors relative group">
            <div className="w-10 h-10 border border-[#262626] bg-black flex items-center justify-center text-[#CCFF00] mb-6 group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F1EA] mb-3 tracking-tight">
              02. STRICT CONTRACTS & TYPE SAFETY
            </h3>
            <p className="text-xs text-[#A39F94] leading-relaxed">
              Fragile data structures create cascading runtime failures. Every interface, API payload, and user
              interaction is governed by strict TypeScript contracts, schema validation, and predictable error boundaries.
            </p>
          </div>

          <div className="p-6 border-2 border-[#262626] bg-[#141414] hover:border-[#FF3B00] transition-colors relative group">
            <div className="w-10 h-10 border border-[#262626] bg-black flex items-center justify-center text-[#FF3B00] mb-6 group-hover:bg-[#FF3B00] group-hover:text-black transition-all">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F1EA] mb-3 tracking-tight">
              03. INTENTIONAL SIMPLICITY
            </h3>
            <p className="text-xs text-[#A39F94] leading-relaxed">
              Applications fail when abstraction layers become obscure. I prioritize clean, observable codebases
              with clear component lifecycles, structured state flows, and straightforward engineering solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
