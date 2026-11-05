/**
 * =============================================================================
 * CAREER & EDUCATION TIMELINE — OM SHINDE PORTFOLIO
 * =============================================================================
 * 
 * IMPORTANT VERIFICATION NOTICE:
 * Because verified historical employment and university credentials for Om Shinde
 * have not yet been provided, the entries below are clearly marked as EDITABLE
 * DEMO CONTENT.
 * 
 * Om Shinde can easily replace these entries with his actual background,
 * dates, universities, degrees, and companies.
 * =============================================================================
 */

export interface TimelineEntry {
  id: string;
  period: string;
  roleOrDegree: string;
  institutionOrCompany: string;
  location: string;
  type: "experience" | "education";
  isEditablePlaceholder: true;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experienceData: TimelineEntry[] = [
  {
    id: "exp-01",
    period: "2024 — PRESENT",
    roleOrDegree: "AI Systems Engineer (Demonstration Role)",
    institutionOrCompany: "Applied Intelligence Lab / Self-Directed Research",
    location: "Pune / Remote",
    type: "experience",
    isEditablePlaceholder: true,
    summary:
      "Architecting autonomous agent pipelines, vector search platforms, and high-concurrency LLM inference microservices. Evaluating state-of-the-art open-weight models against low-latency benchmarks.",
    highlights: [
      "Engineered end-to-end multi-agent orchestration frameworks with state DAG validation.",
      "Optimized dense retrieval systems using product quantization (PQ8) and HNSW indexes.",
      "Built automated RAG evaluation suites scoring context recall and model faithfulness.",
    ],
    technologies: ["Python", "PyTorch", "FastAPI", "Qdrant", "LangGraph", "Docker", "Next.js"],
  },
  {
    id: "exp-02",
    period: "2023 — 2024",
    roleOrDegree: "Machine Learning Engineer (Demonstration Role)",
    institutionOrCompany: "Cognitive Computing Labs (Editable Placeholder)",
    location: "Mumbai, India",
    type: "experience",
    isEditablePlaceholder: true,
    summary:
      "Trained and deployed deep learning models for computer vision and temporal sequence forecasting. Built automated feature engineering pipelines and model monitoring infrastructure.",
    highlights: [
      "Accelerated edge computer vision pipelines to 60+ FPS using TensorRT and ONNX Runtime.",
      "Implemented automated drift detection pipelines monitoring feature distribution shifts.",
      "Collaborated on containerized model serving platforms handling concurrent inference streams.",
    ],
    technologies: ["PyTorch", "OpenCV", "TensorRT", "CUDA", "FastAPI", "PostgreSQL"],
  },
  {
    id: "exp-03",
    period: "2022 — 2023",
    roleOrDegree: "Full-Stack Software Engineer (Demonstration Role)",
    institutionOrCompany: "Digital Systems Studio (Editable Placeholder)",
    location: "Pune, India",
    type: "experience",
    isEditablePlaceholder: true,
    summary:
      "Built robust web applications, data dashboards, and real-time backend microservices with modern TypeScript and Python.",
    highlights: [
      "Designed event-driven backend services handling real-time telemetry updates.",
      "Constructed interactive data visualization dashboards with responsive Next.js architectures.",
      "Implemented comprehensive CI/CD pipelines and automated integration test suites.",
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "Python", "Tailwind CSS", "Redis"],
  },
];

export const educationData: TimelineEntry[] = [
  {
    id: "edu-01",
    period: "2020 — 2024",
    roleOrDegree: "Bachelor of Technology in Computer Science / AI (Editable Placeholder)",
    institutionOrCompany: "University Engineering Institute (Editable Placeholder)",
    location: "Maharashtra, India",
    type: "education",
    isEditablePlaceholder: true,
    summary:
      "Deep foundational studies in algorithms, data structures, machine learning, linear algebra, distributed systems, and computer vision.",
    highlights: [
      "Focus areas: Deep Learning, Neural Network Architectures, and High Performance Computing.",
      "Capstone Project: Multi-modal edge computer vision and automated object recognition.",
      "Actively led AI study groups and open-source computational workshops.",
    ],
    technologies: ["Linear Algebra", "Probability Theory", "C++", "Python", "Algorithms"],
  },
];
