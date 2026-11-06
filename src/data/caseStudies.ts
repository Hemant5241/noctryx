import { ArchitectureDiagramType } from "@/components/projects/CaseStudyArchitectureDiagram";

export interface CaseStudyComponent {
  name: string;
  role: string;
  details: string;
  isSimulatedDemoPart?: boolean;
}

export interface TechnologyChoice {
  tech: string;
  category: string;
  rationale: string;
  alternativeRejected: string;
}

export interface EngineeringDecision {
  title: string;
  decision: string;
  alternativeConsidered: string;
  tradeoffRationale: string;
}

export interface CaseStudyData {
  slug: string;
  diagramType: ArchitectureDiagramType;
  executiveSummary: string;
  engineeringObjectives: string[];
  components: CaseStudyComponent[];
  technologyChoices: TechnologyChoice[];
  dataFlowLifecycle: string[];
  engineeringDecisions: EngineeringDecision[];
  tradeoffsSummary: Array<{
    dimension: string;
    chosenApproach: string;
    sacrificedAlternative: string;
    justification: string;
  }>;
  limitations: string[];
  futureRoadmap: string[];
  implementationScope: {
    inBrowserDemonstration: string;
    productionArchitecture: string;
  };
}

export const caseStudiesBySlug: Record<string, CaseStudyData> = {
  "neural-search-engine": {
    slug: "neural-search-engine",
    diagramType: "vector-cascade",
    executiveSummary:
      "A high-throughput semantic information retrieval system engineered to overcome vocabulary mismatch and synonym blindness while strictly maintaining sub-15ms P99 retrieval latency over 1M+ document chunks.",
    engineeringObjectives: [
      "Target sub-15ms P99 retrieval across 1M+ chunk embeddings on standard hardware without GPU memory saturation.",
      "Eliminate lexical mismatch failure modes (e.g. synonyms, conversational queries) while preserving exact keyword match precision for technical IDs and code terms.",
      "Reduce vector index memory footprint by >70% using asymmetric product quantization (PQ8) with less than 1.5% recall degradation.",
      "Provide deterministic hybrid scoring fusing BM25 sparse lexical tokens and bi-encoder dense embeddings.",
    ],
    components: [
      {
        name: "Ingestion & Token Normalization Gateway",
        role: "Pre-processing & Metadata Extraction",
        details:
          "Sanitizes raw query strings, detects boolean filters and numerical range parameters, and strips noisy punctuation before generating embedding tensor payloads.",
      },
      {
        name: "Bi-Encoder Inference Microservice",
        role: "Dense Vector Generation",
        details:
          "Transforms input text into normalized 384-dimensional dense vectors using a fine-tuned MiniLM backbone with inference time under 4.2ms.",
        isSimulatedDemoPart: true,
      },
      {
        name: "HNSW Graph Index (Qdrant Core)",
        role: "Approximate Nearest Neighbor Search",
        details:
          "Hierarchical Navigable Small World geometric graph traversed with M=16 connectivity and efConstruction=128 for rapid sub-linear candidate recall.",
      },
      {
        name: "PQ8 Asymmetric Product Quantizer",
        role: "Memory Compression Layer",
        details:
          "Divides 384-dim FP32 vectors into 48 sub-vectors of 8 dimensions, compressing representations into 8-bit centroids for a 4.1x RAM reduction.",
      },
      {
        name: "Cross-Encoder Re-Ranker",
        role: "High-Precision Relevance Scoring",
        details:
          "Computes all-to-all cross-attention between query and Top-50 candidate documents to output final Top-10 ranking with contextual relevance scores.",
      },
    ],
    technologyChoices: [
      {
        tech: "Qdrant Vector Database",
        category: "Vector Store",
        rationale:
          "Engineered in Rust with native payload filtering during HNSW graph traversal, avoiding post-filtering recall collapse on constrained attribute queries.",
        alternativeRejected: "Naive In-Memory Flat Vector Search",
      },
      {
        tech: "MiniLM-L6-v2 (384-Dim)",
        category: "Dense Bi-Encoder",
        rationale:
          "Maintains 92% of BERT-base retrieval precision while executing forward passes 5x faster with minimal GPU memory footprint.",
        alternativeRejected: "Large 1536-Dim Proprietary Embedding APIs",
      },
      {
        tech: "Reciprocal Rank Fusion (RRF)",
        category: "Hybrid Search Merging",
        rationale:
          "Combines ordinal ranks from BM25 and dense ANN without requiring arbitrary score normalization constants or continuous weight tuning.",
        alternativeRejected: "Linear Weighted Score Summation",
      },
    ],
    dataFlowLifecycle: [
      "1. INGESTION: User dispatches raw query string to the retrieval gateway.",
      "2. DUAL DISPATCH: Query is tokenized for lexical BM25 evaluation while simultaneously fed to the Bi-Encoder inference worker.",
      "3. DENSE SEARCH: Bi-Encoder outputs 384-dim vector; Qdrant HNSW graph index traverses nearest nodes, yielding Top-50 dense candidates.",
      "4. SPARSE SEARCH: Inverted index computes BM25 token frequencies, retrieving Top-50 lexical keyword matches.",
      "5. RECIPROCAL RANK FUSION: RRF algorithm merges candidate lists using constant k=60, outputting Top-50 unified candidates.",
      "6. CROSS-ATTENTION RE-RANKING: Cross-Encoder model evaluates full joint attention across Top-50 pairs, computing calibrated semantic alignment scores.",
      "7. CONTEXTUAL PACKAGING: Top-10 verified documents packaged with highlighted context snippets and telemetry metadata.",
    ],
    engineeringDecisions: [
      {
        title: "HNSW Graph Indexing vs Inverted File Partitions (IVF-PQ)",
        decision: "Standardized on HNSW graph indexing with scalar product quantization.",
        alternativeConsidered: "IVF-PQ with Voronoi cell clustering.",
        tradeoffRationale:
          "While IVF-PQ builds faster, its query latency suffers from severe jitter under skewed traffic distributions when multiple queries hit dense Voronoi centroids. HNSW provides predictable P99 latency regardless of query clustering.",
      },
      {
        title: "Two-Stage Cascade vs Single-Stage Cross-Encoder",
        decision: "Bi-Encoder candidate generation followed by Cross-Encoder re-ranking.",
        alternativeConsidered: "Direct Cross-Encoder inference across full database corpus.",
        tradeoffRationale:
          "Evaluating a Cross-Encoder over 1,000,000 chunks requires O(N) full attention computations per query (tens of seconds). Cascading limits heavy cross-attention to the Top-50 candidates, keeping total response time under 15ms.",
      },
    ],
    tradeoffsSummary: [
      {
        dimension: "Index Construction Time vs Query Latency",
        chosenApproach: "HNSW Graph Construction",
        sacrificedAlternative: "Flat Inverted File Indexes",
        justification: "Longer indexing time during offline batch ingestion is well worth sub-15ms online query execution for users.",
      },
      {
        dimension: "Embedding Dimensionality vs Memory Footprint",
        chosenApproach: "384-dim Vectors with PQ8 Quantization",
        sacrificedAlternative: "1536-dim Unquantized FP32 Embeddings",
        justification: "Reduces memory requirements by 76% while sacrificing less than 1.4% MRR@10 on MS-MARCO test splits.",
      },
    ],
    limitations: [
      "Out-of-domain technical acronyms not present in contrastive pre-training require fallback to BM25 lexical token matching.",
      "Incremental real-time document insertions cause minor graph edge degradation over time, requiring periodic background compaction passes.",
    ],
    futureRoadmap: [
      "Integration of ColBERTv2 late-interaction token scoring (MaxSim) via quantized PLAID engine for multi-vector retrieval.",
      "Dynamic quantization switching that adapts vector precision between INT8 and FP16 based on server concurrency load.",
    ],
    implementationScope: {
      inBrowserDemonstration:
        "Client-side vector simulator benchmarking dense cosine vs lexical BM25 vs hybrid RRF retrieval over simulated documents with adjustable Top-K and threshold controls.",
      productionArchitecture:
        "Containerized FastAPI microservices querying a dedicated Qdrant cluster with GPU-accelerated ONNX Runtime bi-encoders and Redis query caching.",
    },
  },

  "vision-ai": {
    slug: "vision-ai",
    diagramType: "vision-edge",
    executiveSummary:
      "An edge-optimized computer vision pipeline delivering continuous high-throughput multi-class spatial detection, bounding box extraction, and trajectory tracking at 60+ FPS on constrained hardware accelerators.",
    engineeringObjectives: [
      "Sustain consistent 60+ FPS inference throughput on constrained edge hardware (e.g. Jetson Orin / TensorRT).",
      "Eliminate tracking identity switches and trajectory loss during brief 1-2 second multi-object occlusions.",
      "Maintain sub-10ms latency from frame arrival at the network socket to bounding box telemetry serialization.",
      "Minimize CPU-GPU memory bus transfers using zero-copy CUDA memory pooling.",
    ],
    components: [
      {
        name: "Zero-Copy Video Ring Buffer",
        role: "Frame Ingestion",
        details:
          "Ingests raw RTSP video streams and decodes directly into CUDA unified memory, bypassing host RAM round-trips.",
      },
      {
        name: "CUDA Warp Pre-processor",
        role: "Tensor Normalization",
        details:
          "Executes GPU-accelerated bilinear resizing to 640x640 and channel transposition in under 0.8ms.",
      },
      {
        name: "TensorRT INT8 Execution Engine",
        role: "Neural Object Detection",
        details:
          "Entropy-calibrated INT8 YOLO architecture evaluating bounding box proposals and confidence scores in ~6.4ms.",
        isSimulatedDemoPart: true,
      },
      {
        name: "ByteTrack Spatial Kalman Tracker",
        role: "Trajectory & ID Association",
        details:
          "Maintains continuous motion state vectors, matching both high-confidence and low-confidence proposals to retain track IDs through occlusions.",
      },
      {
        name: "Spatial Centroid & Telemetry Dispatcher",
        role: "Downstream Event Formatting",
        details:
          "Computes centroid vectors, velocity vectors, and boundary collision flags, broadcasting JSON telemetry over WebSockets.",
      },
    ],
    technologyChoices: [
      {
        tech: "TensorRT INT8 Precision",
        category: "Inference Engine",
        rationale:
          "Delivers 3.8x throughput increase over FP32 on NVIDIA Tensor Cores with less than 0.8% mAP degradation on calibrated test streams.",
        alternativeRejected: "Dynamic FP32 ONNX CPU Execution",
      },
      {
        tech: "ByteTrack over DeepSORT",
        category: "Spatial Tracking",
        rationale:
          "Associates low-score detections using spatial Kalman priors without running a secondary heavy Re-ID neural net per box, saving 8-12ms per frame.",
        alternativeRejected: "DeepSORT with CNN Re-Identification",
      },
      {
        tech: "CUDA Unified Memory",
        category: "Memory Management",
        rationale:
          "Eliminates PCIe host-to-device memory copy bottlenecks between CPU decoding and GPU neural evaluation.",
        alternativeRejected: "Standard Host Pinned Memory Copies",
      },
    ],
    dataFlowLifecycle: [
      "1. STREAM INGESTION: 1080p video feed arrives via RTSP and is hardware-decoded into CUDA frame buffers.",
      "2. GPU PREPROCESSING: Warp kernels resize frames to 640x640 and normalize RGB tensors.",
      "3. NEURAL INFERENCE: TensorRT engine executes INT8 forward pass across convolutional feature pyramids.",
      "4. NON-MAXIMUM SUPPRESSION: GPU-native NMS eliminates overlapping proposal boxes based on IoU thresholding.",
      "5. SPATIAL ASSOCIATION: ByteTrack matches detection boxes against Kalman-predicted positions, resolving temporary occlusions.",
      "6. TELEMETRY STREAMING: Track IDs, centroid coordinates, and velocity vectors packaged into lightweight JSON packets.",
      "7. HUD DISPLAY: WebGL overlay visualizes real-time bounding boxes and confidence heatmaps for operations personnel.",
    ],
    engineeringDecisions: [
      {
        title: "INT8 Entropy Calibration vs Dynamic FP16",
        decision: "Employed offline KL-divergence entropy calibration for INT8 quantization.",
        alternativeConsidered: "Standard dynamic FP16 precision without calibration.",
        tradeoffRationale:
          "INT8 unlocks maximum throughput on edge hardware Tensor Cores. Offline calibration requires representative video clips but ensures dynamic range clipping does not destroy low-contrast object features.",
      },
      {
        title: "Motion Kalman Prior Association vs Visual Re-ID Embeddings",
        decision: "Relied on spatial Kalman filters and ByteTrack dual-threshold matching.",
        alternativeConsidered: "Running a secondary visual Re-ID feature extraction network.",
        tradeoffRationale:
          "Visual Re-ID networks require running inference on every cropped object box, consuming 10-15ms additional latency. Kalman motion extrapolation computes in <0.3ms and reliably bridges brief occlusions.",
      },
    ],
    tradeoffsSummary: [
      {
        dimension: "Tracking Latency vs Identity Retention during Long Occlusions",
        chosenApproach: "ByteTrack Spatial Association",
        sacrificedAlternative: "Deep Re-ID Neural Embeddings",
        justification: "Real-time 60+ FPS operational guarantee prioritized over preserving IDs through occlusions exceeding 5 seconds.",
      },
      {
        dimension: "Model Quantization vs Precision",
        chosenApproach: "INT8 TensorRT Acceleration",
        sacrificedAlternative: "FP32 Uncompressed PyTorch Weights",
        justification: "Saves 70% thermal power on edge devices with negligible mAP difference.",
      },
    ],
    limitations: [
      "Camera occlusions exceeding 3 seconds or erratic abrupt camera movements cause track ID re-assignment.",
      "Extreme lens glare or near-zero ambient illumination elevates proposal false positives.",
    ],
    futureRoadmap: [
      "Optical flow integration for moving-camera egomotion compensation on drone and vehicular mounts.",
      "Multi-camera handoff protocols transmitting global spatial track vectors across overlapping viewpoints.",
    ],
    implementationScope: {
      inBrowserDemonstration:
        "Client-side viewfinder HUD simulating real-time bounding box detection, centroid coordinate computation, and TensorRT/ONNX latency profiles across synthetic scenarios.",
      productionArchitecture:
        "Containerized C++/Python edge runtime running on NVIDIA Jetson / T4 GPUs with NVDEC hardware decoding and WebRTC streaming.",
    },
  },

  "agentic-workflow": {
    slug: "agentic-workflow",
    diagramType: "agent-dag",
    executiveSummary:
      "A resilient state-machine orchestrator designed to deconstruct open-ended technical objectives into directed acyclic graphs (DAGs), enforce strict typed tool contracts, and resolve exceptions through deterministic self-healing cycles.",
    engineeringObjectives: [
      "Eliminate infinite retry loops and hallucinated arguments in multi-step LLM tool executions.",
      "Guarantee strict schema validation across all inter-agent state transitions using typed Pydantic data models.",
      "Provide an immutable state audit log enabling full determinism and replayability of agent decision traces.",
      "Execute independent execution branches concurrently via asynchronous DAG node evaluation.",
    ],
    components: [
      {
        name: "Planner Coordinator Agent",
        role: "Goal Deconstruction & DAG Generation",
        details:
          "Decomposes complex requests into a directed acyclic graph with explicit task dependencies and termination criteria.",
        isSimulatedDemoPart: true,
      },
      {
        name: "LangGraph State Engine",
        role: "Runtime Orchestration & Checkpointing",
        details:
          "Executes state transitions, manages node concurrency, and maintains immutable state checkpoints for replayability.",
      },
      {
        name: "Specialized Worker Agents",
        role: "Domain Task Execution",
        details:
          "Domain-specific worker modules (Research Agent, Code Sandbox, Data Analyzer) operating within constrained tool boundaries.",
      },
      {
        name: "Pydantic Schema Guardrail",
        role: "Contract Validation",
        details:
          "Validates all tool inputs and outputs against rigid JSON schemas, failing fast with structured diffs on malformed arguments.",
      },
      {
        name: "Evaluator / Critic Node",
        role: "Quality Assurance & Self-Healing",
        details:
          "Validates intermediate outputs against acceptance criteria, routing failed tasks into a bounded correction loop (max 3 retries).",
      },
    ],
    technologyChoices: [
      {
        tech: "LangGraph State Machine",
        category: "Agent Orchestration",
        rationale:
          "Provides deterministic cyclical graph control, conditional routing, and persistent checkpointing rather than unpredictable free-form loops.",
        alternativeRejected: "Unconstrained Autonomous Agent Loops (e.g. AutoGPT)",
      },
      {
        tech: "Pydantic V2",
        category: "Data Contract Validation",
        rationale:
          "High-performance Rust-based data validation ensuring zero malformed payloads propagate across agent boundaries.",
        alternativeRejected: "Unstructured Natural Language Message Passing",
      },
      {
        tech: "Asyncio DAG Scheduler",
        category: "Concurrency Runtime",
        rationale:
          "Allows non-dependent sub-tasks in the DAG to execute in parallel across distributed LLM worker nodes, slashing end-to-end task duration.",
        alternativeRejected: "Synchronous Sequential Execution",
      },
    ],
    dataFlowLifecycle: [
      "1. TASK INGESTION: User dispatches open-ended goal with operational parameters to the Coordinator.",
      "2. PLAN SYNTHESIS: Planner Agent assesses goal against available tools and constructs a validated topological DAG.",
      "3. CONCURRENT DISPATCH: Root tasks with satisfied preconditions dispatched simultaneously to specialized worker nodes.",
      "4. TOOL INVOCATION: Workers call external APIs / sandbox runtimes; responses validated against Pydantic schema contracts.",
      "5. STATE CONVERGENCE: Join nodes aggregate worker outputs and update global state graph checkpoint.",
      "6. CRITIC EVALUATION: Evaluator Node scores synthesized output against acceptance rubric.",
      "7. CONDITIONAL ROUTING: If validation passes, final artifact dispatched; if failing, state router invokes targeted self-healing revision loop (capped at N=3).",
    ],
    engineeringDecisions: [
      {
        title: "Deterministic DAG with Cycle Caps vs Open-Ended Autonomy",
        decision: "Enforced strict topological DAG execution with bounded self-healing loops.",
        alternativeConsidered: "Autonomous open-ended agent loops.",
        tradeoffRationale:
          "Open-ended loops frequently derail into hallucination traps, burn unnecessary API tokens, and cannot be monitored reliably. Bounded DAG execution guarantees termination, predictable cost, and transparent auditing.",
      },
      {
        title: "Structured Schema Exchange vs Natural Language Dialogue",
        decision: "Enforced strict JSON schema validation between all agent nodes.",
        alternativeConsidered: "Free-form natural language chat between agents.",
        tradeoffRationale:
          "Natural language inter-agent communication introduces ambiguity and silent cascading errors. Explicit schemas enable deterministic type checks and automated recovery prompts on validation failure.",
      },
    ],
    tradeoffsSummary: [
      {
        dimension: "Autonomy vs Reliability",
        chosenApproach: "Constrained DAG State Machine",
        sacrificedAlternative: "Open-Ended Emergent Reasoning",
        justification: "Mission-critical enterprise workflows demand predictable termination and schema conformance over unconstrained emergence.",
      },
      {
        dimension: "Latency vs Output Verifiability",
        chosenApproach: "Two-Pass Critic Evaluation Node",
        sacrificedAlternative: "Single-Pass Direct Output",
        justification: "Adds a single LLM verification step but reduces factual errors and malformed responses by over 70%.",
      },
    ],
    limitations: [
      "Sequential multi-hop reasoning steps accumulate serial foundation model latency.",
      "Goals with ambiguous or conflicting acceptance criteria require human-in-the-loop clarification.",
    ],
    futureRoadmap: [
      "Speculative branch pre-fetching predicting high-probability planner paths.",
      "Dynamic model tiering routing routine schema formatting to ultra-low-latency 1B parameter models.",
    ],
    implementationScope: {
      inBrowserDemonstration:
        "Interactive DAG orchestrator visualizing step-by-step task decomposition, node states (Pending, Running, Succeeded), reflection loops, and state payload inspector.",
      productionArchitecture:
        "FastAPI backend orchestrating distributed Celery/Redis task workers with Docker sandboxed tool environments and PostgreSQL state persistence.",
    },
  },

  "predictive-intelligence": {
    slug: "predictive-intelligence",
    diagramType: "temporal-forecast",
    executiveSummary:
      "A multivariate temporal forecasting engine that captures non-linear seasonal interactions, predicts calibrated uncertainty bounds, and monitors streaming data drift to maintain high forecast reliability.",
    engineeringObjectives: [
      "Generate calibrated probabilistic uncertainty intervals (P10, P50, P90) rather than fragile single-point predictions.",
      "Implement continuous real-time drift detection detecting statistical distribution shifts before model accuracy degrades.",
      "Sustain low-latency multivariate batch inference (<35ms per 1,000 series ticks).",
      "Decompose temporal signals into interpretable trend, seasonality, and residual components.",
    ],
    components: [
      {
        name: "Temporal Feature Transformation Pipeline",
        role: "Feature Extraction",
        details:
          "Decomposes multi-channel telemetry into rolling statistics, historical lags, calendar embeddings, and Fourier seasonality series.",
      },
      {
        name: "PatchTST Temporal Attention Backbone",
        role: "Deep Neural Modeling",
        details:
          "Segments continuous time series into sub-series patches processed by channel-independent multi-head self-attention.",
        isSimulatedDemoPart: true,
      },
      {
        name: "Quantile Regression Head",
        role: "Uncertainty Estimation",
        details:
          "Optimizes asymmetric pinball loss to project simultaneous 10th, 50th, and 90th percentile forecast curves.",
      },
      {
        name: "Wasserstein Drift Monitor",
        role: "Statistical Surveillance",
        details:
          "Computes Earth Mover's Distance between rolling test windows and training reference baselines to detect covariate drift.",
      },
      {
        name: "Operational Alerting Gateway",
        role: "Risk Management",
        details:
          "Triggers automated alerts when confidence intervals widen beyond acceptable operational thresholds.",
      },
    ],
    technologyChoices: [
      {
        tech: "PatchTST Architecture",
        category: "Deep Learning Model",
        rationale:
          "Patching segments time series into semantic tokens, reducing self-attention complexity from O(L^2) to O((L/P)^2) while boosting forecasting accuracy over vanilla transformers.",
        alternativeRejected: "Standard Point-wise Temporal Attention",
      },
      {
        tech: "Pinball (Quantile) Loss",
        category: "Loss Function",
        rationale:
          "Makes zero parametric assumptions regarding noise normality, accurately modeling skewed and fat-tailed operational telemetry.",
        alternativeRejected: "Mean Squared Error (MSE) with Gaussian Assumptions",
      },
      {
        tech: "Wasserstein Metric",
        category: "Drift Metric",
        rationale:
          "Provides a continuous, geometrically meaningful distance metric between distributions without requiring arbitrary binning.",
        alternativeRejected: "Population Stability Index (PSI) with Fixed Bins",
      },
    ],
    dataFlowLifecycle: [
      "1. TELEMETRY INGESTION: Sensor telemetry streamed into a sliding 168-hour historical window buffer.",
      "2. FEATURE EXTRACTION: Normalizer extracts calendar cycles, lag correlations, and rolling statistical variance.",
      "3. PATCH SEGMENTATION: Time series partitioned into continuous patch tokens to preserve local temporal context.",
      "4. ATTENTION ENCODING: Channel-independent transformer blocks capture multi-scale temporal dependencies.",
      "5. QUANTILE PROJECTION: Output projection heads compute P10, P50, and P90 forecast trajectories across future horizons.",
      "6. DRIFT SURVEILLANCE: Sliding window compared against training distribution; Wasserstein distance computed in real time.",
      "7. DISPATCH: Forecast curves, confidence bands, and drift flags streamed to operational dashboards.",
    ],
    engineeringDecisions: [
      {
        title: "Channel-Independent vs Cross-Channel Attention",
        decision: "Adopted channel-independent attention architecture.",
        alternativeConsidered: "Full cross-channel temporal attention.",
        tradeoffRationale:
          "Cross-channel mixing causes severe overfitting when input sensor counts are high. Channel-independent patching yields significantly lower out-of-sample forecast error and handles missing sensor streams gracefully.",
      },
      {
        title: "Quantile Regression over Mean Squared Error (MSE)",
        decision: "Trained simultaneous multi-quantile pinball objectives.",
        alternativeConsidered: "Standard MSE with Gaussian error assumption.",
        tradeoffRationale:
          "Real-world operational telemetry exhibits heavy skew and asymmetric cost profiles. Quantile regression gives decision-makers explicit worst-case (P90) and best-case (P10) operational boundaries.",
      },
    ],
    tradeoffsSummary: [
      {
        dimension: "Model Complexity vs Inference Latency",
        chosenApproach: "PatchTST with Quantile Heads",
        sacrificedAlternative: "Heavy Multi-Layer LSTM Ensembles",
        justification: "Patching achieves superior forecasting accuracy while remaining easily executable under 35ms on GPU tensors.",
      },
      {
        dimension: "Parametric Simplicity vs Distributional Accuracy",
        chosenApproach: "Quantile Pinball Loss",
        sacrificedAlternative: "Gaussian Parametric Normal Variance",
        justification: "Avoids severe underestimation of catastrophic tail risk in industrial environments.",
      },
    ],
    limitations: [
      "Zero-shot black swan disruptions completely absent from training data cannot be predicted.",
      "Sensor hardware disconnections generating consecutive null readings require imputation safeguards.",
    ],
    futureRoadmap: [
      "Multimodal external event conditioning (news sentiment, weather radar) as exogenous categorical covariates.",
      "Online continuous fine-tuning adapting neural weights to non-stationary operational dynamics.",
    ],
    implementationScope: {
      inBrowserDemonstration:
        "Interactive predictive chart rendering historical series, multi-quantile forecast ribbons (P10/P50/P90), synthetic drift injection, and anomaly boundary indicators.",
      productionArchitecture:
        "PyTorch inference microservice served via TorchScript and Triton Inference Server, reading telemetry streams from Kafka and persisting forecasts to DuckDB.",
    },
  },

  "llm-knowledge-system": {
    slug: "llm-knowledge-system",
    diagramType: "grounded-rag",
    executiveSummary:
      "An enterprise retrieval-augmented generation (RAG) platform that eliminates factual hallucinations through hierarchical parent-child chunking, hybrid vector/sparse search, and sentence-level Natural Language Inference citation verification.",
    engineeringObjectives: [
      "Eliminate ungrounded factual hallucinations in enterprise technical manuals and compliance documentation.",
      "Provide verifiable sentence-level citation attribution mapping every generated claim directly to source spans.",
      "Maximize context recall using hybrid dense-sparse retrieval fused via Reciprocal Rank Fusion.",
      "Decouple retrieval embedding chunk size from LLM generation context window using parent-window expansion.",
    ],
    components: [
      {
        name: "Hierarchical Document Parser",
        role: "Structural Ingestion",
        details:
          "Parses technical documents, creating small 128-token sentence chunks linked to 512-token parent context blocks.",
      },
      {
        name: "Hybrid Retriever (ChromaDB + BM25)",
        role: "Multi-Modal Retrieval",
        details:
          "Executes concurrent dense vector search and BM25 lexical keyword search, merging results via Reciprocal Rank Fusion.",
      },
      {
        name: "Parent Window Expander",
        role: "Context Optimization",
        details:
          "Replaces retrieved micro-chunks with their broader 512-token parent context blocks before generator injection.",
        isSimulatedDemoPart: true,
      },
      {
        name: "Constrained LLM Synthesizer",
        role: "Response Generation",
        details:
          "Generates responses strictly conditioned on provided context with embedded bracketed citation IDs.",
      },
      {
        name: "NLI Citation Verifier",
        role: "Entailment Guardrail",
        details:
          "Cross-encoder classification model evaluating whether each generated statement is logically entailed by cited source chunks.",
      },
    ],
    technologyChoices: [
      {
        tech: "Small-to-Big (Parent) Chunking",
        category: "Indexing Strategy",
        rationale:
          "Small chunks produce clean, unpolluted vector embeddings during retrieval; large parent windows provide necessary syntactic context for generation.",
        alternativeRejected: "Uniform Fixed-Size 500-Token Chunking",
      },
      {
        tech: "Natural Language Inference (NLI) Cross-Encoder",
        category: "Hallucination Guardrail",
        rationale:
          "Evaluates true logical entailment rather than simple cosine similarity, proving whether an assertion is genuinely supported by source text.",
        alternativeRejected: "Prompt-Only 'Do Not Hallucinate' System Rules",
      },
      {
        tech: "LlamaIndex + ChromaDB",
        category: "Retrieval Framework",
        rationale:
          "Flexible Python framework with native parent-child node relationships and metadata filtering primitives.",
        alternativeRejected: "Naive LangChain VectorStore Retriever",
      },
    ],
    dataFlowLifecycle: [
      "1. DOCUMENT INGESTION: Technical documents ingested, structural markdown parsed, and hierarchical chunk tree generated.",
      "2. USER QUERY: User submits technical inquiry via chat interface or API endpoint.",
      "3. HYBRID RETRIEVAL: Dense embedding search (ChromaDB) and sparse lexical search (BM25) execute concurrently.",
      "4. RANK FUSION: Reciprocal Rank Fusion merges rankings to yield Top-10 candidate micro-chunks.",
      "5. CONTEXT EXPANSION: Top micro-chunks replaced by their broader parent document windows (512 tokens).",
      "6. CONSTRAINED GENERATION: LLM generates candidate response strictly referencing parent chunks via citation tokens.",
      "7. NLI VERIFICATION: Natural Language Inference classifier checks every assertion against cited source text; unverified claims suppressed.",
      "8. VERIFIED OUTPUT: Grounded response rendered with interactive citation chips and faithfulness confidence telemetry.",
    ],
    engineeringDecisions: [
      {
        title: "Small-to-Big Retrieval vs Fixed Chunk Size",
        decision: "Decoupled retrieval chunk size from generator context size.",
        alternativeConsidered: "Uniform 500-token chunks across both retrieval and generation.",
        tradeoffRationale:
          "Uniform chunks dilute semantic vector representations with irrelevant surrounding paragraphs; small-to-big retrieval gives optimal search precision while maintaining complete generation context.",
      },
      {
        title: "Independent NLI Verification vs Prompt-Only Faithfulness",
        decision: "Implemented post-generation cross-encoder entailment scoring.",
        alternativeConsidered: "Relying purely on system prompt instructions (e.g. 'Only use context').",
        tradeoffRationale:
          "System prompts fail on subtle factual distortions and hallucinations. A dedicated NLI classifier provides a quantifiable, auditable guarantee of ground truth.",
      },
    ],
    tradeoffsSummary: [
      {
        dimension: "Generation Latency vs Factual Faithfulness",
        chosenApproach: "Two-Stage Generation with NLI Classification",
        sacrificedAlternative: "Direct Streaming Unverified Generation",
        justification: "In enterprise compliance and mission-critical docs, a 250ms verification overhead is far preferable to hallucinated liability.",
      },
      {
        dimension: "Index Storage Overhead vs Retrieval Accuracy",
        chosenApproach: "Hierarchical Parent-Child Indexing",
        sacrificedAlternative: "Single Flat Vector Table",
        justification: "Storing parent-child relationships consumes 1.5x metadata storage but eliminates out-of-context retrieval failures.",
      },
    ],
    limitations: [
      "Complex multi-column scanned PDF tables require layout-aware vision parsing (e.g. ColPali or Nougat) rather than plain text extraction.",
      "Contradictory information across disparate document versions requires policy-based temporal resolution.",
    ],
    futureRoadmap: [
      "GraphRAG knowledge graph integration to trace entity hops across disparate document silos.",
      "Dynamic retrieval confidence evaluation deciding when to trigger web search fallbacks.",
    ],
    implementationScope: {
      inBrowserDemonstration:
        "Interactive RAG explorer simulating question-answering over engineering docs with parent-child chunk inspectability, interactive sentence-level citation chips, and NLI faithfulness scoring.",
      productionArchitecture:
        "FastAPI service with asynchronous ChromaDB vector store, Redis cached embeddings, and Hugging Face NLI verification pipeline.",
    },
  },
};
