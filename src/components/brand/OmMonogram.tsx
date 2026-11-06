import React from "react";

interface OmMonogramProps {
  size?: number | string;
  className?: string;
  showCoordinates?: boolean;
}

/**
 * Custom Brutalist OM Monogram
 * Precision engineering identity combining a bounded tensor matrix 'O'
 * with a stepped multi-layered neural chevron 'M', framed by industrial
 * signal coordinates and registration crosshairs.
 */
export function OmMonogram({
  size = 40,
  className = "",
  showCoordinates = false,
}: OmMonogramProps) {
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
          fill="#0D0D0D"
          stroke="#0D0D0D"
          strokeWidth="3"
        />

        {/* Diagonal Corner Cut Accents */}
        <line x1="4" y1="18" x2="18" y2="4" stroke="#FF3B00" strokeWidth="3" />
        <line x1="82" y1="96" x2="96" y2="82" stroke="#CCFF00" strokeWidth="3" />

        {/* Inner Grid Wireframe (Subtle) */}
        <line x1="20" y1="4" x2="20" y2="96" stroke="#262626" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="50" y1="4" x2="50" y2="96" stroke="#262626" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="80" y1="4" x2="80" y2="96" stroke="#262626" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="4" y1="50" x2="96" y2="50" stroke="#262626" strokeWidth="1" strokeDasharray="2 2" />

        {/* Geometric "O" Frame - Outer Square Ring */}
        <rect
          x="16"
          y="18"
          width="28"
          height="64"
          fill="none"
          stroke="#F4F1EA"
          strokeWidth="6"
        />
        {/* Core Dot in "O" */}
        <rect x="27" y="47" width="6" height="6" fill="#FF3B00" />

        {/* Geometric "M" Form - Dual Stepped Columns and Valley */}
        {/* Left vertical of M */}
        <rect x="54" y="18" width="6" height="64" fill="#F4F1EA" />
        {/* Right vertical of M */}
        <rect x="80" y="18" width="6" height="64" fill="#F4F1EA" />
        {/* Diagonal left-to-center of M */}
        <polygon points="58,18 70,50 64,52 54,26" fill="#FF3B00" />
        {/* Diagonal right-to-center of M */}
        <polygon points="82,18 70,50 76,52 86,26" fill="#CCFF00" />

        {/* Central Neural Node in M */}
        <circle cx="70" cy="50" r="3" fill="#F4F1EA" />

        {/* Technical Coordinate Ticks */}
        <line x1="0" y1="50" x2="4" y2="50" stroke="#FF3B00" strokeWidth="2" />
        <line x1="96" y1="50" x2="100" y2="50" stroke="#CCFF00" strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="4" stroke="#FF3B00" strokeWidth="2" />
        <line x1="50" y1="96" x2="50" y2="100" stroke="#CCFF00" strokeWidth="2" />
      </svg>

      {showCoordinates && (
        <div className="font-mono text-[9px] leading-tight text-black/60 hidden sm:block">
          <div className="font-bold text-black tracking-widest uppercase">SYS.OM//01</div>
          <div className="text-[#FF3B00]">18°N 73°E</div>
        </div>
      )}
    </div>
  );
}
