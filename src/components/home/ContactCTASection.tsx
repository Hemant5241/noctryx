"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Copy, Check, ArrowUpRight, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { profileData } from "@/data/profile";
import { contactDetails, socialsData } from "@/data/socials";
import { useTheme } from "@/context/ThemeContext";

export function ContactCTASection() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.primaryEmail);
    setCopied(true);

    const confettiColors =
      theme === "signal-studio"
        ? ["#FF4FA3", "#C6FF00", "#6938FF", "#00E5D4", "#FF7139", "#1B1020"]
        : theme === "crimson-noir"
        ? ["#D41514", "#CDCBCA", "#FFFFFF", "#141418"]
        : ["#FF3B00", "#CCFF00", "#0D0D0D"];

    // Playful celebration feedback
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: confettiColors,
      });
    } catch {
      // noop
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full bg-[#0D0D0D] text-[#F4F1EA] py-24 sm:py-32 font-mono relative overflow-hidden border-b-2 border-black">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-35 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border-4 border-[#FF3B00] bg-[#141414] p-8 sm:p-14 lg:p-20 shadow-[12px_12px_0px_0px_rgba(255,59,0,0.9)] crosshair-corner">
          {/* Top telemetry tag */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262626] pb-4 mb-8 text-xs text-[#A39F94]">
            <div className="flex items-center gap-2 text-[#CCFF00] font-bold">
              <Terminal className="w-4 h-4" />
              <span>DISPATCH CONSOLE {"//"} READY</span>
            </div>
            <div className="text-[10px] text-[#A39F94]">
              COORDINATES: {profileData.location.coordinates}
            </div>
          </div>

          {/* Headline */}
          <div className="mb-10 max-w-4xl">
            <span className="text-xs font-bold text-[#FF3B00] tracking-widest uppercase mb-3 block">
              {"// READY FOR IMPACT"}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F4F1EA] tracking-tighter uppercase leading-[0.95]">
              LET&apos;S BUILD <br />
              <span className="text-[#CCFF00]">SOMETHING</span> INTELLIGENT.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#A39F94] mt-6 max-w-2xl leading-relaxed">
              Available for full-time engineering roles, research collaborations, and mission-critical
              AI systems projects requiring low-latency architectures, autonomous agents, and grounded RAG.
            </p>
          </div>

          {/* Interactive Email Bar & Direct CTA */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-10">
            {/* Copy Email Button */}
            <div className="flex-1 flex items-center justify-between border-2 border-[#262626] bg-black p-3.5 sm:p-4">
              <div className="flex items-center gap-3 truncate mr-2">
                <Mail className="w-5 h-5 text-[#FF3B00] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#F4F1EA] truncate">
                  {contactDetails.primaryEmail}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 border border-[#FF3B00] bg-[#FF3B00]/10 text-xs font-bold hover:bg-[#FF3B00] hover:text-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                aria-label="Copy Email Address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span className="text-[#CCFF00]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Link to /contact page */}
            <Link
              href="/contact"
              className="brutalist-button brutalist-button-acid shrink-0 text-center"
            >
              <span>OPEN CONTACT TERMINAL</span>
              <ArrowUpRight className="w-4 h-4 ml-2 text-black" />
            </Link>
          </div>

          {/* Social channels matrix */}
          <div className="border-t border-[#262626] pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A39F94]">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-bold text-[#F4F1EA]">VERIFIED CHANNELS:</span>
              {socialsData.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF3B00] transition-colors flex items-center gap-1"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6E6A61]" />
                </a>
              ))}
            </div>
            <div className="text-[10px] text-[#6E6A61]">
              SLA: RESPONSE &lt; 24H
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
