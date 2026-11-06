"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface OmMonogramProps {
  size?: number | string;
  className?: string;
  showCoordinates?: boolean;
}

/**
 * Custom Adaptive OM Monogram
 * Precision engineering identity combining a bounded tensor matrix 'O'
 * with a stepped multi-layered neural chevron 'M', framed by industrial
 * signal coordinates and registration crosshairs, customized per theme personality.
 */
export function OmMonogram({
  size = 40,
  className = "",
  showCoordinates = false,
}: OmMonogramProps) {
  const { theme } = useTheme();

  // Palette adaptations per theme
  let chassisFill = "#0D0D0D";
  let chassisStroke = "#0D0D0D";
  let chassisRadius = 0;
  let cutOrange = "#FF3B00";
  let cutYellow = "#CCFF00";
  let letterColor = "#F4F1EA";
  let wireColor = "#262626";
  let centerNode = "#F4F1EA";
  let coordText = "text-black";
  let coordAccent = "text-[#FF3B00]";

  if (theme === "crimson-noir") {
    chassisFill = "#0A0A0C";
    chassisStroke = "#D41514";
    chassisRadius = 2;
    cutOrange = "#D41514";
    cutYellow = "#CDCBCA";
    letterColor = "#FFFFFF";
    wireColor = "#1F1F24";
    centerNode = "#D41514";
    coordText = "text-[#CDCBCA]";
    coordAccent = "text-[#D41514]";
  } else if (theme === "signal-studio") {
    chassisFill = "#1C1D20";
    chassisStroke = "#1C1D20";
    chassisRadius = 8;
    cutOrange = "#FFC928";
    cutYellow = "#4E50DE";
    letterColor = "#F2F4F1";
    wireColor = "#33353D";
    centerNode = "#FFC928";
    coordText = "text-[#1C1D20]";
    coordAccent = "text-[#4E50DE]";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 select-none ${className}`}
      aria-label="OM SHINDE // Engineering Monogram"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible om-monogram-svg"
      >
        {/* Outer Industrial Chassis */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx={chassisRadius}
          fill={chassisFill}
          stroke={chassisStroke}
          strokeWidth="3"
        />

        {/* Diagonal Corner Cut Accents */}
        <line x1="4" y1="18" x2="18" y2="4" stroke={cutOrange} strokeWidth="3" />
        <line x1="82" y1="96" x2="96" y2="82" stroke={cutYellow} strokeWidth="3" />

        {/* Inner Grid Wireframe (Subtle) */}
        <line x1="20" y1="4" x2="20" y2="96" stroke={wireColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="50" y1="4" x2="50" y2="96" stroke={wireColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="80" y1="4" x2="80" y2="96" stroke={wireColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="4" y1="50" x2="96" y2="50" stroke={wireColor} strokeWidth="1" strokeDasharray="2 2" />

        {/* Geometric "O" Frame - Outer Square Ring */}
        <rect
          x="16"
          y="18"
          width="28"
          height="64"
          rx={chassisRadius > 0 ? 3 : 0}
          fill="none"
          stroke={letterColor}
          strokeWidth="6"
        />
        {/* Core Dot in "O" */}
        <rect x="27" y="47" width="6" height="6" fill={cutOrange} />

        {/* Geometric "M" Form - Dual Stepped Columns and Valley */}
        {/* Left vertical of M */}
        <rect x="54" y="18" width="6" height="64" fill={letterColor} />
        {/* Right vertical of M */}
        <rect x="80" y="18" width="6" height="64" fill={letterColor} />
        {/* Diagonal left-to-center of M */}
        <polygon points="58,18 70,50 64,52 54,26" fill={cutOrange} />
        {/* Diagonal right-to-center of M */}
        <polygon points="82,18 70,50 76,52 86,26" fill={cutYellow} />

        {/* Central Neural Node in M */}
        <circle cx="70" cy="50" r="3" fill={centerNode} />

        {/* Technical Coordinate Ticks */}
        <line x1="0" y1="50" x2="4" y2="50" stroke={cutOrange} strokeWidth="2" />
        <line x1="96" y1="50" x2="100" y2="50" stroke={cutYellow} strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="4" stroke={cutOrange} strokeWidth="2" />
        <line x1="50" y1="96" x2="50" y2="100" stroke={cutYellow} strokeWidth="2" />
      </svg>

      {showCoordinates && (
        <div className="font-mono text-[9px] leading-tight opacity-70 hidden sm:block">
          <div className={`font-bold tracking-widest uppercase ${coordText}`}>SYS.OM//01</div>
          <div className={coordAccent}>18°N 73°E</div>
        </div>
      )}
    </div>
  );
}
