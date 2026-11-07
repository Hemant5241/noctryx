"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface OmMonogramProps {
  size?: number | string;
  className?: string;
  showCoordinates?: boolean;
}

/**
 * Custom Adaptive HB Monogram (Hemant Bhosale)
 * Precision engineering identity combining a bounded industrial 'H'
 * with a stepped multi-layered neural 'B', framed by industrial
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
    chassisFill = "#1B1020";
    chassisStroke = "#6938FF";
    chassisRadius = 4;
    cutOrange = "#FF4FA3";
    cutYellow = "#C6FF00";
    letterColor = "#FFF0D1";
    wireColor = "#392044";
    centerNode = "#00E5D4";
    coordText = "text-[#1B1020]";
    coordAccent = "text-[#FF4FA3]";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 select-none ${className}`}
      aria-label="HEMANT BHOSALE // Engineering Monogram"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible om-monogram-svg hb-monogram-svg"
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

        {/* Geometric 'H' Form (Left Character) */}
        {/* Left vertical of H */}
        <rect x="18" y="20" width="6" height="60" fill={letterColor} />
        {/* Right vertical of H */}
        <rect x="38" y="20" width="6" height="60" fill={letterColor} />
        {/* Crossbar of H */}
        <rect x="24" y="47" width="14" height="6" fill={letterColor} />
        {/* Accent Node on Crossbar */}
        <rect x="28" y="47" width="6" height="6" fill={cutOrange} />

        {/* Geometric 'B' Form (Right Character) */}
        {/* Left vertical spine of B */}
        <rect x="56" y="20" width="6" height="60" fill={letterColor} />
        {/* Top Loop of B */}
        <rect x="62" y="20" width="14" height="6" fill={letterColor} />
        <rect x="62" y="47" width="15" height="6" fill={letterColor} />
        <rect
          x="74"
          y="20"
          width="6"
          height="30"
          rx={chassisRadius > 0 ? 2 : 0}
          fill={letterColor}
        />
        {/* Inner accent cutout in top loop */}
        <rect x="63" y="28" width="8" height="17" fill={cutOrange} />

        {/* Bottom Loop of B */}
        <rect x="62" y="74" width="16" height="6" fill={letterColor} />
        <rect
          x="76"
          y="47"
          width="6"
          height="33"
          rx={chassisRadius > 0 ? 2 : 0}
          fill={letterColor}
        />
        {/* Inner accent cutout in bottom loop */}
        <rect x="63" y="55" width="10" height="17" fill={cutYellow} />

        {/* Central Neural Node (at center grid intersection) */}
        <circle cx="50" cy="50" r="3" fill={centerNode} />

        {/* Technical Coordinate Ticks */}
        <line x1="0" y1="50" x2="4" y2="50" stroke={cutOrange} strokeWidth="2" />
        <line x1="96" y1="50" x2="100" y2="50" stroke={cutYellow} strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="4" stroke={cutOrange} strokeWidth="2" />
        <line x1="50" y1="96" x2="50" y2="100" stroke={cutYellow} strokeWidth="2" />
      </svg>

      {showCoordinates && (
        <div className="font-mono text-[9px] leading-tight opacity-70 hidden sm:block">
          <div className={`font-bold tracking-widest uppercase ${coordText}`}>SYS.HB//01</div>
          <div className={coordAccent}>18°N 73°E</div>
        </div>
      )}
    </div>
  );
}

// Export alias for consistency
export const HbMonogram = OmMonogram;
