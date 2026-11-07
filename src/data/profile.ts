/**
 * =============================================================================
 * PROFILE DATA CONFIGURATION — HEMANT BHOSALE
 * =============================================================================
 * 
 * IMPORTANT NOTE FOR RECRUITERS & REVIEWERS:
 * This data structure centralizes Hemant Bhosale's portfolio identity.
 * Unverified personal specifics are marked as editable placeholders.
 * Hemant can directly edit this file to personalize all portfolio copy.
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
    isVerifiedRegion: boolean;
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
  name: "Hemant Bhosale",
  wordmark: "HEMANT BHOSALE // 01",
  role: "AI Systems Engineer",
  tagline: "ARCHITECTING ROBUST INTELLIGENCE & EXPERIMENTAL COMPUTING SYSTEMS",
  headline: "Engineering intelligent architectures where statistical models meet deterministic reliability.",
  shortBio:
    "AI Engineer specializing in autonomous agent workflows, neural information retrieval, high-throughput model inference, and multimodal computer vision. Building scalable infrastructure that transforms generative probabilistic models into mission-critical software.",
  manifesto: [
    "I do not merely experiment with AI models in isolated notebooks. I engineer end-to-end cognitive architectures that bridge speculative intelligence with battle-tested systems engineering.",
    "True intelligence in production demands low-latency vector indexes, strict grounding guarantees, deterministic guardrails, and real-time observability.",
    "Brutal simplicity beats fragile abstraction. Every token generated, tensor evaluated, and millisecond spent must serve an unambiguous purpose.",
  ],
  location: {
    city: "Mumbai / Pune (Candidate Region)",
    country: "India",
    timezone: "Asia/Kolkata",
    utcOffset: "UTC+05:30",
    coordinates: "18.5204° N, 73.8567° E",
    isVerifiedRegion: false,
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
      description: "Agents, Neural RAG, Computer Vision, Predictive ML, Low-Latency Inference",
    },
    {
      label: "CASE STUDIES",
      value: "05",
      unit: "CONCEPTS",
      isSimulated: true,
      description: "Full-stack architectural demonstration concepts evaluating production viability",
    },
    {
      label: "TARGET LATENCY",
      value: "<42",
      unit: "MS",
      isSimulated: true,
      description: "Illustrative simulation benchmark target on quantized pipelines (not a commercial SLA)",
    },
    {
      label: "SIMULATED RELIABILITY",
      value: "99.98",
      unit: "%",
      isSimulated: true,
      description: "Illustrative fault-tolerance benchmark target in multi-agent routing simulations",
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
