import Link from "next/link";
import { AlertOctagon, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full flex-1 bg-grid-paper flex items-center justify-center py-20 px-4 sm:px-6 font-mono">
      <div className="max-w-xl w-full p-8 sm:p-12 border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(255,59,0,1)] crosshair-corner text-center space-y-6">
        {/* Error icon badge */}
        <div className="inline-flex p-3 border-2 border-black bg-[#FF3B00] text-white">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-[#FF3B00] tracking-widest uppercase">
            ERROR 404 // UNMAPPED COORDINATES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tighter uppercase leading-none">
            NULL POINTER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-black/70 leading-relaxed max-w-md mx-auto">
            The target route does not exist in the Om Shinde system architecture.
            The requested vector is unindexed or has been relocated.
          </p>
        </div>

        {/* Diagnostic Telemetry Box */}
        <div className="p-3 border border-black bg-[#0D0D0D] text-[#F4F1EA] text-[11px] text-left space-y-1">
          <div>
            <span className="text-[#FF3B00]">STATUS_CODE:</span> 404_NOT_FOUND
          </div>
          <div>
            <span className="text-[#CCFF00]">ROUTER:</span> NEXTJS_APP_ROUTER_V16
          </div>
          <div>
            <span className="text-white/60">ACTION:</span> RE-ROUTE_TO_ORIGIN
          </div>
        </div>

        {/* Recovery Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className="brutalist-button brutalist-button-primary w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>RETURN TO INDEX</span>
          </Link>

          <Link href="/projects" className="brutalist-button w-full sm:w-auto">
            <Compass className="w-4 h-4 mr-2 text-[#FF3B00]" />
            <span>PROJECTS CATALOGUE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
