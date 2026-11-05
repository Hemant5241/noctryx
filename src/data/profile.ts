/**
 * =============================================================================
 * PROFILE DATA CONFIGURATION — OM SHINDE
 * =============================================================================
 * 
 * IMPORTANT NOTE FOR RECRUITERS & REVIEWERS:
 * This data structure centralizes Om Shinde's portfolio identity.
 * Unverified personal specifics are marked as editable placeholders.
 * Om can directly edit this file to personalize all portfolio copy.
 * =============================================================================
 */

export interface ProfileData {
  name: string;
  wordmark: string;
  role: string;
  tagline: string;
  headline: string;
  shortBio: string;
  manifesto: string[];
  location: {
    city: string;
    country: string;
    timezone: string;
    utcOffset: string;
    coordinates: string;
  };
  availability: {
    status: "available" | "limited" | "unavailable";
    statusText: string;
    notice: string;
  };
  stats: Array<{
    label: string;
    value: string;
    unit?: string;
    isSimulated?: boolean;
    description: string;
  }>;
  editorialTags: string[];
}

export const profileData: ProfileData = {
  name: "Om Shinde",
  wordmark: "OM SHINDE // 01",
  role: "AI Systems Engineer",
  tagline: "ARCHITECTING ROBUST INTELLIGENCE & EXPERIMENTAL COMPUTING SYSTEMS",
  headline: "Engineering intelligent architectures where statistical models meet deterministic reliability.",
  shortBio:
    "AI Engineer specializing in autonomous agent workflows, neural information retrieval, high-throughput model inference, and multimodal computer vision. Building scalable infrastructure that transforms generative probabilistic models into mission-critical production software.",
  manifesto: [
    "I do not merely experiment with AI models in isolated notebooks. I engineer end-to-end cognitive architectures that bridge speculative intelligence with battle-tested systems engineering.",
    "True intelligence in production demands low-latency vector indexes, strict grounding guarantees, deterministic guardrails, and real-time observability.",
    "Brutal simplicity beats fragile abstraction. Every token generated, tensor evaluated, and millisecond spent must serve an unambiguous purpose.",
  ],
  location: {
    city: "Mumbai / Pune",
    country: "India",
    timezone: "Asia/Kolkata",
    utcOffset: "UTC+05:30",
    coordinates: "18.5204° N, 73.8567° E",
  },
  availability: {
    status: "available",
    statusText: "AVAILABLE FOR RESEARCH & HIGH-IMPACT ROLES",
    notice: "Open to full-time AI Engineering, Agentic Systems, and Research & Development positions.",
  },
  stats: [
    {
      label: "CORE DISCIPLINES",
      value: "05",
      unit: "AREAS",
      description: "Agents, RAG, Computer Vision, Predictive ML, Low-Latency Inference",
    },
    {
      label: "CASE STUDIES",
      value: "05",
      unit: "PROJECTS",
      isSimulated: true,
      description: "Full-stack architectural demonstrations designed to evaluate production viability",
    },
    {
      label: "AVG INFERENCE TARGET",
      value: "<42",
      unit: "MS",
      isSimulated: true,
      description: "Illustrative SLA target benchmarked on optimized quantized pipelines",
    },
    {
      label: "SYSTEM AVAILABILITY",
      value: "99.98",
      unit: "%",
      isSimulated: true,
      description: "Illustrative high-availability fault-tolerance target in multi-agent routing",
    },
  ],
  editorialTags: [
    "NEURAL RETRIEVAL",
    "AGENTIC ORCHESTRATION",
    "LATENCY OPTIMIZATION",
    "VECTOR INDEXING",
    "MULTIMODAL PERCEPTION",
    "GROUNDED RAG",
    "EDGE INFERENCE",
    "SYNTHETIC EVALUATION",
  ],
};
