/**
 * =============================================================================
 * TECHNICAL SKILLS MATRIX — OM SHINDE PORTFOLIO
 * =============================================================================
 * 
 * Centralized skill taxonomy across AI/ML engineering, systems architecture,
 * backend development, and foundational tooling.
 * =============================================================================
 */

export interface SkillItem {
  name: string;
  levelTag: "CORE" | "ADVANCED" | "SPECIALIZED" | "PRODUCTION";
  description: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  code: string;
  summary: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "ai-core",
    categoryName: "AI & Machine Learning",
    code: "01 // CORE_ML",
    summary: "Foundational machine learning, deep learning theory, loss landscapes, and optimization.",
    skills: [
      { name: "PyTorch", levelTag: "CORE", description: "Deep neural network architectures, custom loss functions, and autograd", featured: true },
      { name: "Scikit-Learn", levelTag: "PRODUCTION", description: "Statistical modeling, clustering, PCA, and classical ML benchmarks" },
      { name: "Hugging Face Transformers", levelTag: "CORE", description: "Fine-tuning tokenizers, bi-encoders, and causal language models", featured: true },
      { name: "NumPy / SciPy", levelTag: "PRODUCTION", description: "Vectorized linear algebra, tensor manipulations, and matrix decomposition" },
      { name: "Model Quantization (INT8/FP16)", levelTag: "SPECIALIZED", description: "Post-training quantization and pruned runtime optimization", featured: true },
    ],
  },
  {
    id: "gen-ai",
    categoryName: "Generative AI & LLMs",
    code: "02 // LLM_ARCH",
    summary: "Large language model deployment, prompt pipelines, context optimization, and evaluation.",
    skills: [
      { name: "RAG & Dense Retrieval", levelTag: "CORE", description: "Asymmetric vector search, hybrid retrieval, and re-ranking pipelines", featured: true },
      { name: "LangChain / LlamaIndex", levelTag: "PRODUCTION", description: "Context composition, parent-child chunking, and document graphs" },
      { name: "Agentic Tool Use & ReAct", levelTag: "ADVANCED", description: "Dynamic DAG routing, cyclical state reflection, and tool execution", featured: true },
      { name: "Structured Outputs (Zod / Pydantic)", levelTag: "PRODUCTION", description: "Strict schema enforcement on non-deterministic LLM tokens" },
      { name: "Evaluation Frameworks (RAGAS)", levelTag: "SPECIALIZED", description: "Faithfulness, answer relevancy, and context recall measurement", featured: true },
    ],
  },
  {
    id: "vision",
    categoryName: "Computer Vision & Edge",
    code: "03 // VISION_RT",
    summary: "Real-time visual processing, object detection, spatial tracking, and inference acceleration.",
    skills: [
      { name: "OpenCV", levelTag: "PRODUCTION", description: "Image filtering, morphological ops, perspective transformation, and video decoding" },
      { name: "ONNX Runtime", levelTag: "CORE", description: "Cross-platform hardware-accelerated execution providers", featured: true },
      { name: "TensorRT & CUDA", levelTag: "SPECIALIZED", description: "FP16 engine serialization, kernel optimization, and memory pooling", featured: true },
      { name: "YOLO Architectures", levelTag: "CORE", description: "Single-shot real-time detection, spatial segmentation, and anchor assignment" },
      { name: "ByteTrack / Kalman Filters", levelTag: "ADVANCED", description: "Multi-object trajectory association and persistent ID preservation" },
    ],
  },
  {
    id: "backend-systems",
    categoryName: "Backend & Systems Engineering",
    code: "04 // INFRA_SYS",
    summary: "High-throughput asynchronous servers, vector databases, and containerized runtime infrastructure.",
    skills: [
      { name: "Python (AsyncIO / Typing)", levelTag: "CORE", description: "Asynchronous concurrency, typing generics, and memory profiling", featured: true },
      { name: "FastAPI", levelTag: "PRODUCTION", description: "High-concurrency REST endpoints, dependency injection, and OpenAPI contracts", featured: true },
      { name: "Vector DBs (Qdrant / Milvus / Chroma)", levelTag: "CORE", description: "HNSW graphs, payload filtering, and distributed index partitioning", featured: true },
      { name: "Docker & Containerization", levelTag: "PRODUCTION", description: "Multi-stage builds, GPU pass-through, and minimal runtime footprints" },
      { name: "PostgreSQL & Redis", levelTag: "PRODUCTION", description: "Relational persistence, pub/sub messaging, and low-latency cache layers" },
    ],
  },
  {
    id: "frontend-interaction",
    categoryName: "Full-Stack & Interactive UI",
    code: "05 // UI_ENGINE",
    summary: "Modern client architectures, dynamic data visualizations, and industrial web brutalism.",
    skills: [
      { name: "Next.js (App Router)", levelTag: "CORE", description: "Server components, streaming SSR, route handlers, and Turbopack", featured: true },
      { name: "TypeScript", levelTag: "CORE", description: "Strict static typing, union discriminated types, and interface contracts", featured: true },
      { name: "Tailwind CSS", levelTag: "PRODUCTION", description: "Utility-first design systems, custom theme tokens, and responsive layout" },
      { name: "Motion & Framer Motion", levelTag: "ADVANCED", description: "Physics-based springs, gesture recognition, and accessible motion" },
      { name: "HTML5 Canvas & SVG", levelTag: "SPECIALIZED", description: "Procedural rendering, coordinate grids, and dynamic time-series charts", featured: true },
    ],
  },
];

export const allSkillsList: string[] = skillsData.flatMap((cat) => cat.skills.map((s) => s.name));
