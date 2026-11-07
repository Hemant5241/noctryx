"use client";

import { useState } from "react";
import { Bot, Play, SkipForward, RotateCcw, CheckCircle2, Terminal, ShieldCheck } from "lucide-react";

const PRESET_GOALS = [
  {
    id: "goal-1",
    title: "Distributed Database Latency Spike Triage",
    prompt: "Investigate P99 latency spikes on Shard-04, parse slow query logs, and synthesize remediation config.",
    steps: [
      {
        id: "step-1",
        agent: "PLANNER_AGENT",
        name: "DAG Decomposition",
        action: "Decompose user intent into directed execution graph",
        status: "pending",
        thoughtTrace: "Goal requires 3 sequential stages: 1) Telemetry fetch, 2) Log parsing, 3) Patch generation.",
      },
      {
        id: "step-2",
        agent: "TELEMETRY_WORKER",
        name: "Invoke Metrics Tool",
        action: "Call tool metrics_collector(shard='shard-04', metric='p99_latency')",
        status: "pending",
        thoughtTrace: "Executing database telemetry query for time-window t-30m. Metric threshold exceeded (420ms).",
        toolCall: {
          tool: "metrics_collector",
          payload: "{ shard: 'shard-04', window: '30m', metric: 'p99' }",
          result: "{ status: 'ALERT', p99: '438.2ms', unindexed_scans: 142 }",
        },
      },
      {
        id: "step-3",
        agent: "ANALYZER_AGENT",
        name: "Root Cause Isolation",
        action: "Correlate query execution plans with missing composite index",
        status: "pending",
        thoughtTrace: "Slow log isolates query Q_9421 performing table scan on collection 'sessions' without index.",
      },
      {
        id: "step-4",
        agent: "SYNTHESIZER_AGENT",
        name: "Remediation Synthesis",
        action: "Compile DDL index statement and safe deployment procedure",
        status: "pending",
        thoughtTrace: "Generated SQL: CREATE INDEX CONCURRENTLY idx_sessions_user_ts ON sessions(user_id, timestamp);",
      },
    ],
  },
  {
    id: "goal-2",
    title: "Financial Ratio Extraction & Synthesis",
    prompt: "Extract debt-to-equity and operating margins from Q3 filing and verify against benchmark schema.",
    steps: [
      {
        id: "step-1",
        agent: "PLANNER_AGENT",
        name: "Decompose Filing Extraction",
        action: "Map balance sheet tables and compute liquidity ratios",
        status: "pending",
        thoughtTrace: "Identified target metrics: Total Debt, Stockholders Equity, Operating Income, Total Revenue.",
      },
      {
        id: "step-2",
        agent: "PARSER_WORKER",
        name: "Execute Table Extraction",
        action: "Call tool pdf_table_parser(section='balance_sheet')",
        status: "pending",
        thoughtTrace: "Parsing structural markdown tables. Extracted debt: $4.2B, equity: $7.8B.",
        toolCall: {
          tool: "pdf_table_parser",
          payload: "{ doc_id: 'sec_q3_10q', table: 'consolidated_balance_sheet' }",
          result: "{ total_debt: 4200000000, equity: 7800000000, margin: 0.242 }",
        },
      },
      {
        id: "step-3",
        agent: "VALIDATOR_AGENT",
        name: "Pydantic Schema Validation",
        action: "Check financial ratio types and bounds verification",
        status: "pending",
        thoughtTrace: "Calculated D/E ratio = 0.538. Bounds check passed [0.1 - 2.0]. Zero schema violations.",
      },
      {
        id: "step-4",
        agent: "SYNTHESIZER_AGENT",
        name: "Executive Briefing Compilation",
        action: "Formulate verified investor summary with grounded citations",
        status: "pending",
        thoughtTrace: "Generated briefing table with exact footnote citations linked to SEC 10-Q filing.",
      },
    ],
  },
];

export function AgenticWorkflowDemo() {
  const [selectedGoalIdx, setSelectedGoalIdx] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM_INIT]: Agent DAG runtime ready. Awaiting trigger.",
  ]);

  const activeGoal = PRESET_GOALS[selectedGoalIdx];

  const handleStepForward = () => {
    if (activeStepIndex < activeGoal.steps.length - 1) {
      const nextIndex = activeStepIndex + 1;
      setActiveStepIndex(nextIndex);
      const step = activeGoal.steps[nextIndex];
      setLogs((prev) => [
        `[${step.agent}]: Starting '${step.name}'...`,
        `  ↳ ${step.thoughtTrace}`,
        ...(step.toolCall
          ? [`  ↳ TOOL_EXEC: ${step.toolCall.tool} -> Output: ${step.toolCall.result}`]
          : []),
        ...prev,
      ]);
    }
  };

  const handleRunAll = () => {
    setActiveStepIndex(activeGoal.steps.length - 1);
    const newLogs: string[] = [];
    activeGoal.steps.forEach((step) => {
      newLogs.unshift(`[${step.agent}]: ${step.thoughtTrace}`);
      if (step.toolCall) {
        newLogs.unshift(`  ↳ TOOL: ${step.toolCall.tool} -> Result: ${step.toolCall.result}`);
      }
    });
    newLogs.unshift("[DAG_COMPLETE]: All task preconditions verified. Workflow convergence reached.");
    setLogs((prev) => [...newLogs, ...prev]);
  };

  const handleReset = () => {
    setActiveStepIndex(-1);
    setLogs(["[RESET]: Workflow DAG reset. State reinitialized."]);
  };

  return (
    <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] crosshair-corner font-mono text-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 border-b-2 border-black bg-[#0D0D0D] text-[#F4F1EA]">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[#FF3B00]" />
          <span className="font-bold text-xs sm:text-sm tracking-wide">
            AGENTIC DAG ORCHESTRATION // STATE RUNTIME
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] text-[#A39F94]">
          <span className="text-[#CCFF00] font-bold">STATE: CONVERGENT</span>
          <span>{"//"}</span>
          <span className="text-[#FF3B00] font-bold">RECURSION: BOUNDED [MAX 5]</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        {/* Goal Selector */}
        <div>
          <label className="text-[10px] text-black/60 font-bold uppercase block mb-2">
            SELECT AGENT OBJECTIVE // WORKFLOW GRAPH:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_GOALS.map((goal, idx) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => {
                  setSelectedGoalIdx(idx);
                  handleReset();
                }}
                className={`p-2.5 sm:p-3 text-left border transition-all cursor-pointer ${
                  selectedGoalIdx === idx
                    ? "bg-black text-[#F4F1EA] border-black shadow-[3px_3px_0px_0px_rgba(255,59,0,1)]"
                    : "bg-[#F4F1EA] text-black border-black/30 hover:border-black"
                }`}
              >
                <div className="font-bold text-xs truncate">{goal.title}</div>
                <div className="text-[10px] text-black/60 truncate mt-1">
                  {goal.prompt}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 p-3 border border-black/20 bg-[#F4F1EA]/60">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleStepForward}
              disabled={activeStepIndex >= activeGoal.steps.length - 1}
              className="px-2.5 sm:px-3 py-1.5 bg-black text-[#F4F1EA] font-bold text-xs hover:bg-[#FF3B00] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>STEP NEXT NODE</span>
            </button>
            <button
              type="button"
              onClick={handleRunAll}
              disabled={activeStepIndex >= activeGoal.steps.length - 1}
              className="px-2.5 sm:px-3 py-1.5 bg-[#FF3B00] text-white font-bold text-xs hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>AUTO EXECUTE ALL</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 sm:px-3 py-1.5 border border-black bg-white text-black font-bold text-xs hover:bg-black hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>

          <div className="text-[10px] text-black/60 font-bold">
            PROGRESS: {Math.max(activeStepIndex + 1, 0)} / {activeGoal.steps.length} NODES
          </div>
        </div>

        {/* Interactive DAG Nodes Graph */}
        <div className="space-y-3">
          <div className="text-[10px] text-black/60 font-bold uppercase tracking-wider">
            DIRECTED ACYCLIC GRAPH // ACTIVE EXECUTION NODES:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {activeGoal.steps.map((step, idx) => {
              const isPast = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <div
                  key={step.id}
                  className={`p-4 border-2 transition-all ${
                    isCurrent
                      ? "border-[#FF3B00] bg-white shadow-[4px_4px_0px_0px_rgba(255,59,0,1)] ring-1 ring-[#FF3B00]"
                      : isPast
                      ? "border-black bg-[#CCFF00]/10"
                      : "border-black/20 bg-[#F4F1EA]/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#FF3B00]">NODE 0{idx + 1}</span>
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-[#111111]" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-black/30"></span>
                    )}
                  </div>
                  <div className="font-black text-xs text-black mb-1">{step.name}</div>
                  <div className="text-[10px] text-black/60 mb-2">{step.agent}</div>
                  <div className="text-[10px] font-mono text-black/80 bg-white p-1.5 border border-black/15 truncate">
                    {step.action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Agent Scratchpad / Thought Logs */}
        <div className="border-2 border-black bg-[#0D0D0D] p-4 text-[#F4F1EA]">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-3 text-[10px] text-[#A39F94]">
            <div className="flex items-center gap-2 text-[#FF3B00]">
              <Terminal className="w-3.5 h-3.5" />
              <span className="font-bold">AGENT REASONING SCRATCHPAD & TOOL TRACES</span>
            </div>
            <span>STREAM LOGS: {logs.length}</span>
          </div>

          <div className="h-44 overflow-y-auto space-y-1.5 font-mono text-[11px] text-[#A39F94] pr-2">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.startsWith("[PLANNER")
                    ? "text-[#CCFF00]"
                    : log.startsWith("[SYSTEM")
                    ? "text-[#F4F1EA]"
                    : log.includes("TOOL")
                    ? "text-[#FF3B00]"
                    : "text-[#A39F94]"
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Verification Note */}
        <div className="p-3 border border-black/20 bg-[#F4F1EA] text-[10px] text-black/70 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF3B00]" />
            <span>
              TRANSPARENCY: Autonomous DAG routing and tool contracts executed via deterministic client state engine.
            </span>
          </span>
          <span className="font-bold text-black">NO EXTERNAL API BILLING</span>
        </div>
      </div>
    </div>
  );
}
