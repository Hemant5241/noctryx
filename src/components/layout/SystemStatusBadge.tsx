import { profileData } from "@/data/profile";

export function SystemStatusBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider px-2.5 py-1 border border-black/20 bg-white"
      title={profileData.availability.notice}
      aria-label={`System status: Nominal. ${profileData.availability.statusText}`}
    >
      <span className="h-2 w-2 rounded-full bg-[#CCFF00] border border-black shadow-[0_0_8px_rgba(204,255,0,0.8)]"></span>
      <span className="text-black font-bold uppercase tracking-tight">
        STATUS: NOMINAL
      </span>
      <span className="hidden md:inline text-black/50 text-[10px]">
        {"// AVAILABLE"}
      </span>
    </div>
  );
}
