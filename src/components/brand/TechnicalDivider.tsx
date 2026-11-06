"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface TechnicalDividerProps {
  label?: string;
  code?: string;
  accent?: "orange" | "yellow" | "black";
  className?: string;
}

export function TechnicalDivider({
  label = "SYSTEM DELIMITER",
  code = "DIV//01",
  accent = "orange",
  className = "",
}: TechnicalDividerProps) {
  const { theme } = useTheme();

  // Theme-differentiated symbols & treatments
  let symbol = "[ + ]";
  let symbolColor = accent === "orange" ? "text-[#FF3B00]" : accent === "yellow" ? "text-[#CCFF00]" : "text-black";
  let lineClass = "border-t-2 border-dashed border-black/25";
  let codeBadgeClass = "border border-black/30 px-1.5 py-0.2 bg-white text-black";

  if (theme === "crimson-noir") {
    symbol = "[ ⬢ ]";
    symbolColor = "text-[#D41514] drop-shadow-[0_0_6px_rgba(212,21,20,0.6)]";
    lineClass = "border-t border-[#262630]";
    codeBadgeClass = "border border-[#2a2a34] px-1.5 py-0.2 bg-[#101014] text-[#D41514] rounded-[2px]";
  } else if (theme === "signal-studio") {
    symbol = "[ ⊕ ]";
    symbolColor = "text-[#4E50DE]";
    lineClass = "border-t-2 border-dashed border-[#1C1D20]/30";
    codeBadgeClass = "border-2 border-[#1C1D20] px-2.5 py-0.5 bg-[#FFC928] text-[#1C1D20] rounded-full font-black shadow-[2px_2px_0px_0px_#1C1D20]";
  }

  return (
    <div
      role="separator"
      className={`w-full py-4 flex items-center justify-between gap-4 font-mono select-none overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 shrink-0 text-[10px] font-bold">
        <span className={symbolColor}>{symbol}</span>
        <span className="tracking-widest uppercase opacity-90">{label}</span>
      </div>

      <div className={`flex-1 mx-2 ${lineClass}`}></div>

      <div className="flex items-center gap-3 shrink-0 text-[10px] opacity-70">
        <span className="hidden sm:inline">COORD: 18.5204° N // 73.8567° E</span>
        <span className={`font-bold ${codeBadgeClass}`}>
          {code}
        </span>
      </div>
    </div>
  );
}
