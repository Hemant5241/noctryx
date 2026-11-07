# HEMANT BHOSALE — FULL STACK DEVELOPER PORTFOLIO

A bespoke, high-performance personal portfolio website built for **Hemant Bhosale**, a Full Stack Developer specializing in responsive web applications, modern React/Next.js architectures, TypeScript, and interactive technical showcases.

Designed with an unapologetic **Brutalist UI** visual language, industrial Swiss typography, visible coordinate grids, paper-white and deep-black contrast, aggressive electric orange (`#FF3B00`), and acid yellow (`#CCFF00`).

---

## 🚀 Live Routes & Architecture

| Route | Name | Purpose & Features |
| :--- | :--- | :--- |
| `/` | **Home / Index** | Hero with interactive HTML5 Canvas Neural Tensor Lattice visualizer, engineering manifesto, infinite animated skill ticker, asymmetric 5-project showcase, career timeline, and contact trigger. |
| `/about` | **About / Philosophy** | In-depth engineering philosophy, research interests, viewfinder HUD portrait placeholder (`1:1` ratio), and academic/experience timeline. |
| `/projects` | **Projects Catalogue** | Filterable catalogue with category pills (Semantic Search, CV, Agents, Time-series, RAG), text search, and comparative architectural benchmark matrix table. |
| `/projects/neural-search-engine` | **Case Study 01** | HNSW vector retrieval, product quantization (PQ8), sub-15ms P99 SLA, and embedded **Interactive Neural Search Playground**. |
| `/projects/vision-ai` | **Case Study 02** | 60+ FPS TensorRT INT8 spatial tracking, Kalman occlusion association, and embedded **Interactive Edge Viewfinder Simulator**. |
| `/projects/agentic-workflow` | **Case Study 03** | Directed acyclic graph (DAG) state orchestrator with bounded recursion, and embedded **Interactive Multi-Agent Thought & Tool Runner**. |
| `/projects/predictive-intelligence` | **Case Study 04** | Temporal quantile attention forecaster with uncertainty ribbons, and embedded **Interactive Multivariate SVG Forecasting Chart**. |
| `/projects/llm-knowledge-system` | **Case Study 05** | Grounded enterprise RAG with sentence-level citation verification, and embedded **Interactive Citation Grounding Inspector**. |
| `/contact` | **Contact Terminal** | Brutalist dispatch console with client-side transmission generation, direct email copy with celebratory confetti, GPG key, and response SLA. |
| `/_not-found` | **Custom 404** | Industrial error telemetry with route recovery coordinates. |
| `/sitemap.xml` | **SEO Sitemap** | Automatically generated XML sitemap covering all dynamic project slugs. |
| `/robots.txt` | **Crawler Rules** | Standard search engine directives. |

---

## 🧠 5 Functional Interactive AI Demonstrations

1. **Neural Search Engine (`NeuralSearchDemo.tsx`)**:
   - Computes real-time client-side semantic similarity against a technical AI document corpus.
   - Dual-mode evaluation comparing Dense Cosine (HNSW) vs Sparse Lexical (BM25) vs Reciprocal Rank Fusion (Hybrid).
   - Dynamic Top-K and cutoff threshold sliders with matched token attribution.
2. **Vision AI Pipeline (`VisionAiDemo.tsx`)**:
   - Simulated edge computer vision viewfinder with real-time detection bounding boxes, spatial centroids, and Kalman tracking IDs.
   - Multi-scenario selector (Autonomous Transit, Industrial Inspection, Robotics SLAM).
   - Interactive runtime engine toggle (TensorRT INT8, FP16 CUDA, ONNX CPU) updating FPS and latency readouts.
3. **Agentic Workflow Orchestrator (`AgenticWorkflowDemo.tsx`)**:
   - Multi-agent state machine decomposing complex prompts into topological execution DAGs.
   - Step-by-step and automated execution modes with live thought traces and Pydantic tool call contracts.
4. **Predictive Intelligence Forecaster (`PredictiveIntelligenceDemo.tsx`)**:
   - Multivariate time-series forecaster with 10%-90% quantile uncertainty ribbons.
   - Anomaly injection simulator demonstrating real-time distribution drift detection via Wasserstein distance.
5. **Grounded LLM Knowledge System (`LlmKnowledgeSystemDemo.tsx`)**:
   - Enterprise RAG architecture with structural parent-child chunking.
   - Interactive sentence-level citation chips linking assertions directly to source document chunks with NLI entailment scores.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16.4.5 (App Router, Turbopack, Partial Prerendering)
- **Language:** TypeScript 5 (Strict mode)
- **UI & Styling:** Tailwind CSS v4, Lucide React icons
- **Animations & Interactivity:** HTML5 Canvas, Motion / Framer Motion, canvas-confetti
- **Typography:** Geist & Geist Mono (Swiss Industrial)

---

## 🔧 Personalization Guide for Hemant Bhosale

All portfolio information is centralized in typed, documented files under `src/data/`:

1. **Profile Metadata (`src/data/profile.ts`)**:
   - Update `name`, `role`, `headline`, `shortBio`, `manifesto`, and `location`.
2. **Career & Education Timeline (`src/data/experience.ts`)**:
   - Replace placeholder roles, companies, universities, degrees, and dates with your verified credentials.
3. **Socials & Email (`src/data/socials.ts`)**:
   - Replace placeholder URLs with your verified GitHub, LinkedIn, and direct contact email.
4. **Portrait Image (`src/app/about/page.tsx`)**:
   - Drop a square (`1:1`) photograph into `public/` and reference it in the designated HUD container.
5. **Projects (`src/data/projects.ts`)**:
   - Connect live GitHub repository URLs when ready.

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Run TypeScript check
npx tsc --noEmit

# Run ESLint check
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```
