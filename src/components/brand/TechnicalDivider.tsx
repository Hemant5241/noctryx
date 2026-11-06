import React from "react";

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
  const accentColor =
    accent === "orange" ? "text-[#FF3B00]" : accent === "yellow" ? "text-[#CCFF00]" : "text-black";

  return (
    <div
      role="separator"
      className={`w-full py-4 flex items-center justify-between gap-4 font-mono select-none overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 shrink-0 text-[10px] font-bold">
        <span className={accentColor}>[ + ]</span>
        <span className="text-black/80 tracking-widest uppercase">{label}</span>
      </div>

      <div className="flex-1 border-t-2 border-dashed border-black/25 mx-2"></div>

      <div className="flex items-center gap-3 shrink-0 text-[10px] text-black/50">
        <span className="hidden sm:inline">COORD: 18.5204° N // 73.8567° E</span>
        <span className="font-bold text-black border border-black/30 px-1.5 py-0.2 bg-white">
          {code}
        </span>
      </div>
    </div>
  );
}
