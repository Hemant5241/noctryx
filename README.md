# NOCTRYX // ENGINEERING PORTFOLIO & TECHNICAL SHOWCASE

<div align="center">

```
  _  _  ____   ___  _____  ____  _  _  _  _
 ( \( )/ ___) / __)(_   _)(  _ \( \/ )( \/ )
  )  (( (___ ( (__   | |   )   / )  /  )  (
 (_)\_)\____) \___)  (_)  (_)\_)(__/  (_/\_)
```

**An independent full-stack developer portfolio, interactive systems showcase, and architectural laboratory.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-149eca?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Netlify Status](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://noctryx.netlify.app/)

[**Explore Live Deployment →**](https://noctryx.netlify.app/) • [**View Catalogue**](https://noctryx.netlify.app/projects) • [**Case Studies**](https://noctryx.netlify.app/projects/neural-search-engine) • [**Contact Terminal**](https://noctryx.netlify.app/contact)

</div>

---

## 1. Overview & Design Philosophy

**Noctryx** is an independent developer portfolio and full-stack engineering showcase built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Unlike conventional static portfolios, Noctryx is engineered as an interactive technical platform. It merges industrial Swiss typography, visible coordinate grids, and an uncompromising brutalist visual identity with five client-side interactive prototypes, dynamic telemetry, a multi-theme engine, and fluid responsive design across all viewports.

### Core Objectives

- **Independent Systems Showcase:** Conceived as an engineering concept and design laboratory demonstrating frontend systems architecture, state orchestration, and performance optimization. It is not a commissioned client engagement.
- **Transparent Technical Storytelling:** Every case study features comprehensive architecture diagrams, data-flow lifecycles, explicit trade-off matrices, and client-side simulated playgrounds.
- **Zero-Compromise Performance:** Sub-50ms target render state transitions, server-side partial prerendering, optimized SVG geometry, and GPU-accelerated canvas visualizers.

---

## 2. Design System & Theme Engine

Noctryx features three thoroughly developed visual personalities. Each theme is configured through a centralized CSS variable tokens pipeline, with persistent state managed across browser tabs via `useSyncExternalStore` and `localStorage`.

Both the **Navbar Theme Selector** and the **Command Menu (`Cmd+K`)** provide unified real-time interactive hover previews, rendering the target palette inside the selector pill before global activation.

| Theme | Aesthetic Identity | Background | Foreground | Primary Accent | Secondary Accent |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Technical Brutalism** *(Default)* | Industrial blueprint paper, visible structural gridlines, raw mechanical contrast. | `#F4F1EA` | `#0D0D0D` | `#FF3B00` *(Electric Orange)* | `#CCFF00` *(Acid Yellow)* |
| **Crimson Noir** | Obsidian depth, cinematic luxury, atmospheric laser glow, and chrome silver typography. | `#080808` | `#CDCBCA` | `#D41514` *(Laser Crimson)* | `#CDCBCA` *(Chrome Silver)* |
| **Signal Studio** | Warm vanilla atelier, rich midnight violet ink, high-energy pop accents, and electric violet. | `#FFF0D1` | `#1B1020` | `#FF4FA3` *(Hot Pink)* | `#C6FF00` *(Acid Lime)* |

### Visual Identity Tokens

- **Monogram & Mark:** An adaptive monogram with precision engineering crosshairs, variable corner radii, and industrial coordinate telemetry reflecting the active theme.
- **Typography:** Swiss industrial hierarchy powered by Next.js font optimization (`Geist` and `Geist Mono`), featuring monospaced data readouts, tabular numerics, and uppercase micro-labels.
- **Micro-Interactions:** Subtle coordinate badges, live UTC clocks, live systems availability indicators, and interactive technical dividers.

---

## 3. Core Features & Capabilities

### Fluid Responsive Architecture
Thoughtfully adapted across four distinct viewport tiers (mobile `<640px`, tablet `640px–1024px`, desktop `1024px–1440px`, and ultra-wide `>1440px`):
- Touch-friendly navigation drawer with animated backdrop blur on mobile.
- Vertically stacked KPI telemetry cards and horizontal scrolling ticker tracks.
- Asymmetric responsive grids that preserve visual balance and touch targets without layout shifts.

### Om Orbit Custom Cursor (`OmOrbitCursor`)
An ultra-smooth hardware-accelerated cursor system built for precision desktop navigation:
- Direct DOM manipulation via `requestAnimationFrame` with zero React re-render overhead.
- Dual-stage eased interpolation: central pointer dot paired with a trailing orbital ring.
- **Strict Size Invariance:** Never scales or balloons upon hovering interactive elements.
- **Smart DOM Suppression:** Automatically yields to the native text cursor over input fields, textareas, and editable surfaces.
- **Safe Hardware Fallback:** Cleanly excluded on touch and mobile devices via `(hover: hover) and (pointer: fine)` media queries.

### Global Command Menu (`Cmd+K` / `Ctrl+K`)
A keyboard-driven HUD overlay enabling immediate keyboard navigation across the entire portfolio:
- Quick jump to Home, About, Projects Catalogue, Contact, and all five deep case studies.
- Interactive Theme Selector with real-time theme previews.
- Quick links to external profiles and email clipboard copy with celebratory confetti feedback.
- Accessible focus-trapping, ARIA dialog roles, and escape key handling.

### GitHub Integration Route (`/api/github`)
A dedicated Next.js Route Handler querying public GitHub profile data and repository statistics:
- Provides repository names, descriptions, star counts, fork counts, and primary languages.
- Gracefully falls back to an illustrative specimen preview mode when `NEXT_PUBLIC_GITHUB_USERNAME` is omitted, ensuring zero build or runtime failures.

---

## 4. Technical Showcase & Case Studies

Noctryx documents five deep architectural case studies. Each project includes a problem statement, technical solution, component decomposition, technology trade-off analysis, SVG system architecture diagram, and a **fully functional in-browser interactive simulator**.

> **Verification Notice:** All five case studies are architectural concepts, engineering prototypes, and client-side simulations created to demonstrate technical competency, systems thinking, and UI/UX engineering. All benchmark figures, latency readouts, and throughput numbers are illustrative simulated indicators and do not represent commercial client deliveries or production deployments.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      NOCTRYX CASE STUDY SUITE                          │
├──────────────────┬─────────────────────────────┬───────────────────────┤
│ Slug             │ Core Architecture           │ Interactive Demo      │
├──────────────────┼─────────────────────────────┼───────────────────────┤
│ /neural-search   │ HNSW Vector Retrieval & PQ8 │ Semantic Query Rerank │
│ /vision-ai       │ Edge TensorRT INT8 Tracking │ Multi-Target HUD View │
│ /agentic-flow    │ Directed Acyclic Graph DAG  │ Multi-Agent Runner    │
│ /predictive-ml   │ Quantile Temporal Attention │ Drift & Anomaly Inject│
│ /llm-knowledge   │ Grounded Enterprise RAG     │ Sentence NLI Verifier │
└──────────────────┴─────────────────────────────┴───────────────────────┘
```

### 1. Neural Search Engine (`/projects/neural-search-engine`)
- **Focus:** Dense vector retrieval, asymmetric bi-encoders, and hierarchical navigable small-world (HNSW) indexing.
- **Interactive Demo (`NeuralSearchDemo.tsx`):** Executes real-time client-side semantic similarity ranking against an in-memory technical document corpus. Allows comparing Dense Cosine (HNSW), Sparse Lexical (BM25), and Hybrid Reciprocal Rank Fusion (RRF) with dynamic Top-K and threshold controls.
- **Simulated Metrics:** Illustrated 14.2ms P99 latency, 0.892 MRR@10, and 4.1x index memory reduction via PQ8 product quantization.

### 2. Vision AI Pipeline (`/projects/vision-ai`)
- **Focus:** Edge computer vision, INT8 TensorRT optimization, spatial centroid tracking, and Kalman filter occlusion recovery.
- **Interactive Demo (`VisionAiDemo.tsx`):** A simulated edge viewfinder rendering bounding boxes, tracking vectors, and spatial telemetry across multiple scenarios (Autonomous Transit, Industrial Inspection, Robotics SLAM) with selectable inference runtimes (TensorRT INT8, FP16 CUDA, ONNX CPU).
- **Simulated Metrics:** Illustrated 64.8 FPS sustained throughput, 7.8ms frame latency, and 0.914 MOTA multi-object tracking accuracy.

### 3. Agentic Workflow (`/projects/agentic-workflow`)
- **Focus:** Multi-agent state orchestration, dynamic directed acyclic graphs (DAGs), topological dependency resolution, and bounded recursion guardrails.
- **Interactive Demo (`AgenticWorkflowDemo.tsx`):** Visualizes goal decomposition across specialized agents (Researcher, Critic, Synthesizer). Supports automated and step-by-step execution modes with live thought traces and Pydantic tool call verification.
- **Simulated Metrics:** Illustrated 94.6% task completion rate, 3.2 avg tool iterations, and 100% loop containment across simulated runs.

### 4. Predictive Intelligence (`/projects/predictive-intelligence`)
- **Focus:** Multivariate temporal forecasting, quantile attention mechanisms, uncertainty intervals (P10–P90), and real-time distribution drift detection.
- **Interactive Demo (`PredictiveIntelligenceDemo.tsx`):** An interactive SVG time-series visualizer rendering forecast horizons with confidence ribbons, interactive historical time windows, and an anomaly injection toggle evaluating Wasserstein distance drift.
- **Simulated Metrics:** Illustrated 4.12% MAPE error, 0.89 Quantile Score, and sub-100ms drift alarm response.

### 5. Grounded LLM Knowledge (`/projects/llm-knowledge-system`)
- **Focus:** Enterprise retrieval-augmented generation (RAG), hierarchical parent-child chunking, and sentence-level natural language inference (NLI) citation verification.
- **Interactive Demo (`LlmKnowledgeSystemDemo.tsx`):** Inspects generated synthesis text with clickable sentence-level citation badges. Highlights source document chunks and displays NLI entailment confidence scores in real time.
- **Simulated Metrics:** Illustrated 98.4% citation faithfulness, 1.2% hallucination rate, and 420ms retrieval pipeline latency.

---

## 5. Technology Stack

Verified directly against [`package.json`](file:///E:/Projects/om-shinde-portfolio/package.json) and repository source code:

| Layer | Technology | Version | Purpose |
| :--- | :--- | :---: | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.4.5` | App Router, Turbopack compiler, Partial Prerendering, Static Optimization |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | React Server Components (RSC), Concurrent rendering, Action primitives |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5` | Strict type safety across components, props, contexts, and data models |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4` | Utility-first styling with `@tailwindcss/turbopack` integration |
| **Animation Engine** | [Motion](https://motion.dev/) | `^14.9.1` | Hardware-accelerated UI transitions, spring physics, layout animations |
| **Interactive Canvas** | HTML5 Canvas API | Native | Interactive neural tensor visualizer with mouse-reactive gravity fields |
| **Iconography** | [Lucide React](https://lucide.dev/) | `^1.69.0` | Crisp, accessible, theme-aware SVG iconography |
| **Confetti FX** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | `^1.9.4` | Celebratory micro-interactions for email copy and contact transmission |
| **Code Linting** | [ESLint](https://eslint.org/) | `^9` | Next.js core Web Vitals linting rules (`eslint-config-next`) |
| **Deployment** | [Netlify](https://www.netlify.com/) | Runtime v5 | OpenNext serverless functions and CDN edge caching via `netlify.toml` |

---

## 6. Architecture & Project Structure

```
noctryx/
├── .env.example              # Template for public site URL and GitHub integration
├── .gitignore                # Git exclusions (build caches, node_modules, .netlify)
├── AGENTS.md                 # Project operational guidelines
├── eslint.config.mjs         # ESLint configuration
├── netlify.toml              # Netlify build command, publish directory & Node config
├── next.config.ts            # Next.js 16 compiler & caching configuration
├── package.json              # Project dependencies, scripts & metadata
├── tsconfig.json             # TypeScript strict configuration
├── public/                   # Static public assets (SVG marks, icons, badges)
└── src/
    ├── app/                  # Next.js App Router routes & metadata
    │   ├── layout.tsx        # Root HTML layout with ThemeProvider & fonts
    │   ├── page.tsx          # Home page (Hero, Canvas, Skills, Showcase)
    │   ├── globals.css       # Tailwind v4 imports & theme variable definitions
    │   ├── not-found.tsx     # Custom brutalist 404 telemetry view
    │   ├── robots.ts         # Automated search crawler directives
    │   ├── sitemap.ts        # Dynamic XML sitemap generator
    │   ├── opengraph-image.tsx # Edge-rendered dynamic OpenGraph social card
    │   ├── about/            # Engineering manifesto, timeline & HUD portrait
    │   ├── contact/          # In-browser contact console & copy-to-clipboard
    │   ├── projects/         # Filterable projects catalogue & matrix table
    │   │   └── [slug]/       # Dynamic case study page with interactive demos
    │   └── api/
    │       └── github/       # Route handler proxying public GitHub activity
    ├── components/
    │   ├── brand/            # Adaptive monograms & industrial dividers
    │   ├── cursor/           # Custom OmOrbitCursor precision tracking component
    │   ├── demos/            # 5 interactive client-side AI simulation engines
    │   ├── github/           # Live GitHub activity & commit history cards
    │   ├── home/             # Landing page sections & NeuralVisualizer canvas
    │   ├── layout/           # Header, Footer, CommandMenu, LiveClock, StatusBadge
    │   ├── projects/         # Architectural SVG diagrams & catalogue filters
    │   └── theme/            # Real-time interactive theme hover preview cards
    ├── context/
    │   └── ThemeContext.tsx  # Centralized 3-theme state store via useSyncExternalStore
    └── data/                 # Strongly typed portfolio content & configurations
        ├── caseStudies.ts    # Architecture diagrams, tradeoffs & deep case study specs
        ├── experience.ts     # Education & career timeline records
        ├── profile.ts        # Profile identity, manifesto, headlines & location
        ├── projects.ts       # 5 showcase projects, approach, metrics & metadata
        ├── skills.ts         # Categorized engineering competencies & tools
        └── socials.ts        # Social links & GitHub integration config
```

---

## 7. Getting Started

### Prerequisites

- **Node.js:** `v20.x` or later (`node -v`)
- **Package Manager:** `npm` `v10.x` or later (or compatible `pnpm` / `yarn`)
- **Git:** Installed and configured

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hemant5241/noctryx.git
   cd noctryx
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional):**
   ```bash
   cp .env.example .env.local
   ```
   *By default, the application runs out-of-the-box without `.env.local`. Configure the variables below if you wish to connect your own domain or GitHub profile:*
   - `NEXT_PUBLIC_SITE_URL`: Canonical URL for SEO sitemaps and OpenGraph generation (e.g., `https://noctryx.netlify.app/`).
   - `NEXT_PUBLIC_GITHUB_USERNAME`: GitHub handle for live repository telemetry. If omitted, the app displays the specimen preview mode.

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Validation Commands

Verify code health using the exact package scripts:

```bash
# Perform strict TypeScript type checking without emitting files
npx tsc --noEmit

# Run Next.js ESLint linting suite
npm run lint

# Compile an optimized production build
npm run build

# Start the compiled production server locally
npm run start
```

---

## 8. Deployment on Netlify

Noctryx is configured for zero-friction deployment on [Netlify](https://www.netlify.com/) using the official Next.js Runtime (v5 OpenNext):

### Build Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

### Deploying a Fork to Netlify

1. Fork the [`noctryx`](https://github.com/Hemant5241/noctryx) repository on GitHub.
2. Sign in to your [Netlify Dashboard](https://app.netlify.com/) and click **Add new site > Import an existing project**.
3. Authorize GitHub and select your forked `noctryx` repository.
4. Netlify automatically reads `netlify.toml` and detects:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `.next`
5. Under **Site configuration > Environment variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-site-name.netlify.app`
   - `NEXT_PUBLIC_GITHUB_USERNAME` = `your-github-username`
6. Click **Deploy Site**.

Live verified deployment: [https://noctryx.netlify.app/](https://noctryx.netlify.app/)

---

## 9. Configuration & Operational Limitations

- **GitHub Activity Telemetry:** The `/api/github` route polls the public GitHub REST API. If rate limits are reached or `NEXT_PUBLIC_GITHUB_USERNAME` is unconfigured, the component displays an illustrative specimen matrix rather than throwing errors. No private access tokens are required or bundled.
- **Contact Console Simulation:** The terminal form located at `/contact` is an interactive client-side simulation. Submitting a message triggers an immediate synthetic transmission hash (`TX_XXXXXXX`), logs the payload to the developer console, and plays a celebratory confetti animation. It does not establish unauthenticated outbound SMTP connections.
- **Client-Side Simulation Demos:** All five interactive laboratories run entirely client-side using React state and HTML5 Canvas. While adhering to authentic mathematical and architectural principles (e.g., HNSW cosine similarity, Kalman filters, Wasserstein drift, NLI entailment), the datasets and benchmarks are synthetic educational specimens.

---

## 10. Credits & Licensing

### Open Source Acknowledgments

Noctryx stands on the shoulders of the modern open-source web ecosystem:

- [Next.js](https://nextjs.org/) — React Framework by Vercel
- [React](https://react.dev/) — User Interface Library by Meta
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling engine by Tailwind Labs
- [Motion](https://motion.dev/) — Production-ready motion animation engine
- [Lucide Icons](https://lucide.dev/) — Community-maintained icon set
- [Canvas Confetti](https://github.com/catdad/canvas-confetti) — High-performance browser confetti by Kiril Vatev
- [Geist Font](https://vercel.com/font) — Modern geometric & monospaced typography by Vercel

### Code & Asset Usage

This repository is shared for review, portfolio evaluation, and educational inspection. All bespoke project copy, architectural diagrams, and brand styling are proprietary to the project author.

Third-party dependencies retain their respective open-source licenses (MIT, Apache 2.0). Before reusing substantial portions of code or custom design patterns for commercial purposes, please check the relevant upstream licenses and contact the repository owner.

---

## 11. Feedback & Community Contributions

Thanks for taking the time to explore Noctryx! If you have feedback, fresh ideas, or suggestions that could make the experience better, I'd genuinely love to hear them. Found something broken? Please open an issue. Want to improve something yourself? Feel free to fork the repository and submit a pull request. Every thoughtful suggestion and contribution is appreciated.

### Contribution Workflow

1. **Fork the repository** on GitHub.
2. **Clone your fork locally:**
   ```bash
   git clone https://github.com/<your-username>/noctryx.git
   cd noctryx
   ```
3. **Create a dedicated feature branch:**
   ```bash
   git checkout -b feature/your-improvement-name
   ```
4. **Implement focused changes** adhering to the existing TypeScript strict standards and brutalist styling conventions.
5. **Run local validation checks:**
   ```bash
   npx tsc --noEmit
   npm run lint
   npm run build
   ```
6. **Commit your modifications** with clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add concise improvement description"
   ```
7. **Push to your personal fork:**
   ```bash
   git push origin feature/your-improvement-name
   ```
8. **Open a Pull Request** against `master` detailing your changes, rationale, and any visual updates.

---

<div align="center">

**[Explore the Live Deployment on Netlify →](https://noctryx.netlify.app/)**

*Engineered with precision, brutalist aesthetics, and modern web standards.*

</div>
