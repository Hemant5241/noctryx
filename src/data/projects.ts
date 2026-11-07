/**
 * =============================================================================
 * PROJECTS DATA — HEMANT BHOSALE PORTFOLIO
 * =============================================================================
 * 
 * IMPORTANT VERIFICATION DISCLAIMER:
 * The five projects listed below are rigorous architectural demonstration
 * concepts and case studies conceived for this portfolio to demonstrate systems
 * design, technical competency, and full-stack engineering methodologies.
 * All metrics, benchmark figures, and deployment numbers are illustrative
 * simulated indicators and must NOT be cited as verified commercial client claims.
 * =============================================================================
 */

export interface ProjectMetric {
  label: string;
  value: string;
  delta?: string;
  note: string;
  isSimulated: true;
}

export interface ProjectData {
  id: string;
  slug: string;
  number: string;
  title: string;
  conceptTag: string;
  category: "Semantic Search" | "Computer Vision" | "Agentic Systems" | "Predictive ML" | "RAG Systems";
  tagline: string;
  shortSummary: string;
  problemStatement: string;
  proposedSolution: string;
  technicalApproach: string[];
  techStack: string[];
  architectureOverview: string;
  keyFeatures: string[];
  metrics: ProjectMetric[];
  accentColor: string;
  badge: string;
  demoSimulationNote: string;
  links: {
    demo?: string;
  };
}

export const projectsData: ProjectData[] = [
  {
    id: "proj-01",
    slug: "neural-search-engine",
    number: "01",
    title: "Neural Search Engine",
    conceptTag: "DENSE RETRIEVAL & VECTOR INDEXING",
    category: "Semantic Search",
    tagline: "Sub-15ms semantic document retrieval using asymmetric dense embeddings and HNSW graphs.",
    shortSummary:
      "A high-throughput semantic search platform that understands multi-intent user queries, bypassing keyword limitations through learned vector representations and reciprocal rank fusion.",
    problemStatement:
      "Traditional lexical search (BM25) fails when user queries are conversational, typo-heavy, or express conceptual synonyms. Existing vector databases often suffer from latency degradation and memory bloat at millions of document vectors without custom quantization.",
    proposedSolution:
      "Engineered an asymmetric dual-encoder architecture that indexes token embeddings in a hierarchical navigable small-world (HNSW) graph, combined with product quantization (PQ) and a cross-encoder re-ranking pipeline.",
    technicalApproach: [
      "Custom sentence-transformer embedding model fine-tuned on contrastive domain pairs.",
      "Dual-stage pipeline: fast top-K candidate retrieval via approximate nearest neighbor (ANN) search, followed by cross-attention re-scoring.",
      "Quantization layer compressing FP32 vectors to INT8 with less than 1.4% recall loss.",
      "Asynchronous embedding ingestion pipeline with Redis caching layer for hot queries.",
    ],
    techStack: ["Python", "FastAPI", "PyTorch", "Qdrant / Milvus", "Hugging Face", "Docker", "Next.js"],
    architectureOverview:
      "Query -> Token Normalization -> Bi-Encoder Inference -> HNSW Vector Search (Top-100) -> Cross-Encoder Re-ranker (Top-10) -> Contextual Snippet Generator.",
    keyFeatures: [
      "Sub-15ms ANN vector retrieval over 1M+ simulated document chunks",
      "Hybrid search fusing BM25 sparse scores with dense cosine similarity",
      "Real-time semantic query expansion and typo tolerance",
      "Dynamic filtering by metadata payloads without re-indexing latency",
    ],
    metrics: [
      {
        label: "P99 LATENCY",
        value: "14.2ms",
        delta: "-68%",
        note: "Simulated benchmark vs unquantized baseline",
        isSimulated: true,
      },
      {
        label: "MEAN RECIPROCAL RANK (MRR@10)",
        value: "0.892",
        delta: "+34%",
        note: "Simulated evaluation on MS-MARCO synthetic test split",
        isSimulated: true,
      },
      {
        label: "INDEX MEMORY REDUCTION",
        value: "4.1x",
        delta: "-76%",
        note: "Achieved via Product Quantization (PQ8)",
        isSimulated: true,
      },
    ],
    accentColor: "#FF3B00",
    badge: "DEMO CASE STUDY // ARCHITECTURE SPEC 01",
    demoSimulationNote: "Interactive search query latency and vector space reduction simulated in browser.",
    links: {},
  },
  {
    id: "proj-02",
    slug: "vision-ai",
    number: "02",
    title: "Vision AI Inference Pipeline",
    conceptTag: "EDGE DETECTION & SPATIAL UNDERSTANDING",
    category: "Computer Vision",
    tagline: "Real-time multi-class object detection and spatial tracking with ONNX runtime acceleration.",
    shortSummary:
      "An edge-optimized vision pipeline designed for continuous visual stream processing, spatial segmentation, and frame-rate stabilized bounding box inference at 60+ FPS.",
    problemStatement:
      "High-resolution video feeds choke traditional neural vision models due to compute bottlenecks and thermal throttling on constrained hardware, leading to dropped frames and erratic tracking.",
    proposedSolution:
      "Implemented a TensorRT-accelerated and INT8-quantized YOLO architecture with ByteTrack Kalman filter tracking and adaptive frame skipping based on motion delta triggers.",
    technicalApproach: [
      "Custom model quantization via ONNX Runtime & TensorRT execution providers.",
      "Spatial Kalman filter state tracking maintaining persistent IDs across occlusions.",
      "CUDA memory pooling avoiding per-frame memory allocation overheads.",
      "WebRTC video stream consumer with WebSockets telemetry publishing.",
    ],
    techStack: ["PyTorch", "OpenCV", "ONNX Runtime", "TensorRT", "CUDA", "FastAPI", "TypeScript"],
    architectureOverview:
      "Video Stream -> Frame Decoupler -> Motion Trigger Filter -> TensorRT YOLOv8 Backbone -> Non-Max Suppression -> ByteTrack Spatial Tracker -> Annotation Telemetry Stream.",
    keyFeatures: [
      "60+ FPS sustained throughput at 1080p resolution on modern GPU",
      "Multi-object persistent tracking with spatial trajectory prediction",
      "Dynamic confidence thresholding with occlusion resilience",
      "Real-time bounding box telemetry streamed over WebSockets",
    ],
    metrics: [
      {
        label: "FRAME RATE",
        value: "64.8 FPS",
        delta: "+120%",
        note: "Simulated throughput on FP16 optimized pipeline",
        isSimulated: true,
      },
      {
        label: "MEAN AVERAGE PRECISION (mAP50)",
        value: "0.841",
        delta: "+12%",
        note: "Simulated benchmark against standard COCO subsets",
        isSimulated: true,
      },
      {
        label: "DETECTION LATENCY",
        value: "8.6ms",
        delta: "-55%",
        note: "Simulated end-to-end frame processing time",
        isSimulated: true,
      },
    ],
    accentColor: "#CCFF00",
    badge: "DEMO CASE STUDY // ARCHITECTURE SPEC 02",
    demoSimulationNote: "Interactive bounding box visualizer and confidence heatmap simulated in browser.",
    links: {},
  },
  {
    id: "proj-03",
    slug: "agentic-workflow",
    number: "03",
    title: "Agentic Workflow Orchestrator",
    conceptTag: "AUTONOMOUS DAG ROUTING & MULTI-AGENT STATE",
    category: "Agentic Systems",
    tagline: "Autonomous multi-agent orchestration runtime with cyclical graph state and verifiable tool invocation.",
    shortSummary:
      "An execution environment for autonomous AI agents that decomposes open-ended prompts into directed acyclic graphs (DAGs), dynamically invokes specialized micro-tools, and self-corrects execution failures.",
    problemStatement:
      "Single-turn LLMs hallucinate tool arguments and enter infinite retry loops when encountering runtime API exceptions, lacking long-term scratchpad memory and deterministic error boundaries.",
    proposedSolution:
      "Constructed a state-machine orchestrator utilizing topological DAG planning, JSON-schema tool contracts, strict sandboxed code execution, and reflection loops for self-healing task execution.",
    technicalApproach: [
      "Directed Acyclic Graph (DAG) state machine tracking step preconditions and node dependencies.",
      "Strict Pydantic / Zod schema validation on all tool inputs and outputs.",
      "Memory hierarchy dividing working scratchpad from long-term episodic vector storage.",
      "Deterministic fallback policies triggering agent replanning upon tool failure.",
    ],
    techStack: ["Python", "LangGraph / Custom Core", "Pydantic", "FastAPI", "PostgreSQL", "Next.js", "Tailwind CSS"],
    architectureOverview:
      "User Intent -> Planner Agent -> Task DAG Generation -> Worker Agent Node -> Tool Execution Boundary -> Validator Agent -> State Update / Replanning -> Final Synthesis.",
    keyFeatures: [
      "Cyclical graph execution with bounded recursion limits and timeout safeguards",
      "Strict schema enforcement preventing malformed tool payloads",
      "Real-time event streaming exposing agent thought traces and decision logs",
      "Episodic memory recall with semantic vector indexing of prior execution traces",
    ],
    metrics: [
      {
        label: "TASK SUCCESS RATE",
        value: "91.4%",
        delta: "+28%",
        note: "Simulated benchmark across 500 multi-step complex tasks",
        isSimulated: true,
      },
      {
        label: "HALLUCINATION REDUCTION",
        value: "-73%",
        delta: "-73%",
        note: "Simulated reduction via schema guardrails and double-pass validation",
        isSimulated: true,
      },
      {
        label: "MEAN EXECUTION REPLANS",
        value: "1.2",
        delta: "-40%",
        note: "Simulated self-healing convergence rate on tool error",
        isSimulated: true,
      },
    ],
    accentColor: "#FF3B00",
    badge: "DEMO CASE STUDY // ARCHITECTURE SPEC 03",
    demoSimulationNote: "Interactive agent state DAG and step-by-step reasoning inspector simulated in browser.",
    links: {},
  },
  {
    id: "proj-04",
    slug: "predictive-intelligence",
    number: "04",
    title: "Predictive Intelligence Platform",
    conceptTag: "NEURAL TIME-SERIES & ANOMALY DETECTION",
    category: "Predictive ML",
    tagline: "Multivariate time-series forecasting engine with uncertainty estimation and temporal attention.",
    shortSummary:
      "An automated machine learning engine processing temporal telemetry streams to forecast high-frequency fluctuations, identify statistical drift, and surface anomalies before system degradation.",
    problemStatement:
      "Traditional ARIMA and shallow regression models fail on non-linear seasonal shifts, while black-box deep learning models lack interpretability and uncertainty intervals needed for high-stakes operational planning.",
    proposedSolution:
      "Architected a temporal transformer model with quantile regression loss for calibrated confidence intervals, paired with real-time Kolmogorov-Smirnov distribution drift alerting.",
    technicalApproach: [
      "Patch-based temporal transformer extracting inter-series and intra-series correlations.",
      "Quantile loss optimization predicting 10th, 50th, and 90th percentiles simultaneously.",
      "Continuous feature drift detection computing Wasserstein distance against rolling baselines.",
      "Automated hyperparameter tuning with Bayesian optimization.",
    ],
    techStack: ["Python", "PyTorch", "LightGBM", "DuckDB", "Apache Arrow", "Plotly / SVG", "FastAPI"],
    architectureOverview:
      "Stream Ingestion -> Feature Decomposition (Trend/Seasonality) -> Patch Embedding -> Temporal Attention Blocks -> Quantile Decoder -> Drift & Anomaly Evaluation.",
    keyFeatures: [
      "Calibrated uncertainty intervals for risk-aware forecast horizons",
      "Sub-second multivariate inference across 100+ concurrent telemetry signals",
      "Automated feature attribution explaining top driving variables per forecast",
      "Zero-downtime rolling checkpoint updates based on drift indicators",
    ],
    metrics: [
      {
        label: "MEAN ABSOLUTE ERROR (MAE)",
        value: "0.042",
        delta: "-31%",
        note: "Simulated benchmark against standard statistical baselines",
        isSimulated: true,
      },
      {
        label: "ANOMALY F1 SCORE",
        value: "0.938",
        delta: "+19%",
        note: "Simulated evaluation on multivariate telemetry anomalies",
        isSimulated: true,
      },
      {
        label: "INFERENCE TIME",
        value: "32ms",
        delta: "-60%",
        note: "Simulated batched tensor inference per 1,000 temporal ticks",
        isSimulated: true,
      },
    ],
    accentColor: "#CCFF00",
    badge: "DEMO CASE STUDY // ARCHITECTURE SPEC 04",
    demoSimulationNote: "Interactive real-time forecast curve and statistical anomaly thresholds simulated in browser.",
    links: {},
  },
  {
    id: "proj-05",
    slug: "llm-knowledge-system",
    number: "05",
    title: "Grounded LLM Knowledge System",
    conceptTag: "ENTERPRISE RAG & CITATION GRAPH",
    category: "RAG Systems",
    tagline: "Verifiable enterprise RAG architecture with recursive chunking and sentence-level citation verification.",
    shortSummary:
      "A document intelligence platform that ingests complex technical documents, performs hierarchical chunking, and generates answers strictly conditioned on verifiable source citations.",
    problemStatement:
      "Standard naive RAG models frequently inject subtle hallucinations, quote out-of-context text chunks, and cannot verify whether generated statements are truly supported by retrieved documentation.",
    proposedSolution:
      "Designed an advanced RAG framework featuring structural markdown-aware chunking, hybrid vector/sparse retrieval, and an automated NLI (Natural Language Inference) citation verification guardrail.",
    technicalApproach: [
      "Structure-aware parsing preserving tables, code blocks, and section hierarchies.",
      "Sentence-level NLI entailment scoring checking premise-hypothesis alignment for every claim.",
      "Cross-encoder contextual compression filtering out irrelevant retrieved paragraphs.",
      "Knowledge graph triples extraction linking entity relationships across disparate documents.",
    ],
    techStack: ["Python", "LangChain / LlamaIndex", "ChromaDB / Pinecone", "FastAPI", "React", "TypeScript"],
    architectureOverview:
      "Document Ingestion -> Structural Parser -> Semantic Chunking -> Vector & Lexical Hybrid Store -> Re-ranking -> LLM Answer Synthesis -> NLI Citation Verifier -> Verified Output.",
    keyFeatures: [
      "Zero ungrounded assertions through automated NLI sentence-level verification",
      "Hierarchical parent-child chunking providing rich context without noise",
      "Interactive citation inspector mapping every generated claim to source spans",
      "Multi-format ingestion pipeline supporting PDF, Markdown, OpenAPI specs, and HTML",
    ],
    metrics: [
      {
        label: "FAITHFULNESS SCORE",
        value: "98.2%",
        delta: "+22%",
        note: "Simulated evaluation score measured using RAGAS framework",
        isSimulated: true,
      },
      {
        label: "CONTEXT RECALL",
        value: "94.6%",
        delta: "+17%",
        note: "Simulated score across complex multi-hop technical queries",
        isSimulated: true,
      },
      {
        label: "CHUNK COMPRESSION RATIO",
        value: "3.4x",
        delta: "-70%",
        note: "Simulated token savings via cross-encoder context filtering",
        isSimulated: true,
      },
    ],
    accentColor: "#FF3B00",
    badge: "DEMO CASE STUDY // ARCHITECTURE SPEC 05",
    demoSimulationNote: "Interactive chunking and citation grounding explorer simulated in browser.",
    links: {},
  },
];
