# 🌌 Dheeraj Sharma — Personal Brand Website & AI Engineer Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_14+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GitHub REST API](https://img.shields.io/badge/GitHub_API-181717?style=for-the-badge&logo=github&logoColor=white)
![Vercel Ready](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A high-performance personal brand website engineered for an AI Engineer, Builder, and Product Entrepreneur.**

[Live Telemetry](#-live-github-telemetry) • [Architecture](#-project-architecture) • [Features](#-key-features) • [Quickstart](#-getting-started) • [Customization](#-customization-guide)

</div>

---

## 💡 Overview

This is **not** a traditional academic portfolio or static resume page. It is built as a **digital first impression** for **Dheeraj Sharma** ([@dheeraj-srma](https://github.com/dheeraj-srma))—communicating deep technical competence in AI systems, computer vision, predictive analytics, enterprise portals, and SaaS product engineering within **10 seconds** of landing on the page.

Designed with inspiration from **Apple, Vercel, Linear, Framer, and Stripe**, the application prioritizes whitespace, typography, layered depth, and fluid 60 FPS motion over superficial decorations.

---

## ✨ Key Features

### 🌌 1. Dynamic Layered Canvas Background
The page features a multi-tiered animated backdrop that feels alive without distracting the user:
* **Base Layer**: Deep `#050505` obsidian background.
* **Layer 2 (Gradient Blobs)**: Smoothly pulsing Electric Blue (`#3B82F6`), Purple (`#A855F7`), and Pink (`#EC4899`) ambient blur orbs.
* **Layer 3 (Noise Overlay)**: Subtle SVG fractal noise for tactile depth.
* **Layer 4 (Interactive Particles)**: 60 FPS HTML5 canvas particle starfield with connection lines that dynamically react to cursor distance.

---

### 🚀 2. Hero Section & Dynamic Role Switcher
* **Typewriter Rotator**: Cycles through core engineering identities:
  `AI Architect` • `ML Engineer` • `Software Engineer` • `Data Scientist` • `Data Analyst` • `Builder`
* **360° Profile Ring**: Circular avatar flanked by an animated rotating gradient ring and floating glass tech badges.
* **Problem-Solving Statement**: Immediate focus on real-world impact over academic listings.

---

### 💎 3. Glassmorphism & 3D Tilt Cards
* **Cursor-Following Spotlight**: Custom radial highlight follows cursor coordinates across all card containers (`SpotlightCard.tsx`).
* **3D Perspective Tilt**: Spring-physics tilt calculation based on mouse coordinates relative to card centers.
* **Zero Percentage Bars**: Replaced generic skill sliders with interactive, glowing technology chips categorized into *Programming*, *AI & ML*, *Data & Visualization*, *Backend*, *Databases*, and *Tools*.

---

### 📊 4. Live GitHub Telemetry
* **Real-time API Integration**: Dynamically fetches stats from the GitHub REST API (`https://api.github.com/users/dheeraj-srma`).
* **Live Repositories & Stars**: Automated counter for public repositories, followers, and total stars.
* **Primary Language Bar**: Calculates language proportions across public repositories and renders a color-coded legend bar.
* **Recent Repos Stream**: Direct live preview cards for recently updated projects.

---

### 🛣️ 5. Growth Evolution Roadmap
* **Non-Traditional Timeline**: Replaces bulleted employment lists with a compounding growth trajectory.
* **Interactive Milestones**: Highlights progress from first lines of code to Desktop Applications, AI Voice Assistant, Enterprise ERP Order Portal, Analytics Pipelines, and Future AI Ventures.

---

### 📬 6. Contact Hub & Social Channels
* **Glass Form**: Sleek contact interface with transmission status feedback.
* **Direct Channels**: Direct links to Email (`dheerajkauhsik136@gmail.com`), GitHub ([dheeraj-srma](https://github.com/dheeraj-srma)), LinkedIn ([dheerajsharma0025](https://www.linkedin.com/in/dheerajsharma0025/)), and Instagram ([@srma_g_ka_beta](https://www.instagram.com/srma_g_ka_beta/)).

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14+ (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glass Utilities |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom Brand SVG Components |
| **API Layer** | GitHub REST API v3 via Custom SWR/Hooks |
| **Deployment** | Vercel Ready |

---

## 📂 Project Architecture

```bash
portfolio/
├── app/
│   ├── globals.css           # Global theme variables, noise overlay, glass utility classes
│   ├── layout.tsx            # Metadata, OpenGraph, JSON-LD structured schema, font setup
│   └── page.tsx              # Main single-page application entry point
├── components/
│   ├── common/
│   │   ├── BackgroundCanvas.tsx  # 60 FPS Canvas particle starfield & animated gradient blobs
│   │   ├── Icons.tsx             # Custom SVG components (GitHub, LinkedIn, Instagram)
│   │   └── SpotlightCard.tsx     # 3D Tilt perspective glassmorphism card container
│   ├── navigation/
│   │   └── Navbar.tsx            # Floating glass navbar with scroll shrink & mobile dock
│   └── sections/
│       ├── HeroSection.tsx       # 2-column hero, role switcher, portrait ring
│       ├── AboutSection.tsx      # 8 identity capability cards
│       ├── SkillsSection.tsx     # Categorized interactive tech chips
│       ├── ProjectsSection.tsx   # Glass project showcase cards with stack tags & demo links
│       ├── WhatIBuildSection.tsx # Product engineering & outcome focus cards
│       ├── GitHubSection.tsx     # Live GitHub stats, language breakdown, recent repos
│       ├── JourneySection.tsx    # Interactive growth roadmap timeline
│       ├── StatsSection.tsx      # Scroll-triggered count-up counters
│       ├── PhilosophySection.tsx # Rotating typography quote carousel
│       ├── ContactSection.tsx    # Glass contact form & social media links
│       └── Footer.tsx            # Minimal footer & smooth back-to-top trigger
├── hooks/
│   ├── useGitHubData.ts      # Live GitHub API fetching hook with fallbacks
│   └── useMousePosition.ts   # Mouse coordinate tracking for spotlight effects
├── lib/
│   ├── data.ts               # Centralized structured data (Projects, Skills, Milestones, Quotes)
│   └── utils.ts              # Tailwind class merging utility (clsx + tailwind-merge)
└── public/                   # Static assets & favicon
```

---

## ⚡ Quickstart & Installation

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dheeraj-srma/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

4. **Open application in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Customization Guide

All personal info, projects, skills, roadmap milestones, and quote philosophies are centralized inside [`lib/data.ts`](file:///d:/portfolio/lib/data.ts).

### Updating Personal Details:
Edit `PERSONAL_INFO` in `lib/data.ts`:
```typescript
export const PERSONAL_INFO = {
  name: "Dheeraj Sharma",
  title: "AI, ML & Data Science Engineer",
  username: "dheeraj-srma",
  githubUrl: "https://github.com/dheeraj-srma",
  linkedinUrl: "https://www.linkedin.com/in/dheerajsharma0025/",
  instagramUrl: "https://www.instagram.com/srma_g_ka_beta/",
  email: "dheerajkauhsik136@gmail.com",
  avatarUrl: "https://github.com/dheeraj-srma.png",
  // ...
};
```

---

## 🚀 Building & Production Deployment

To generate an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run start
```

### Deploying to Vercel

```bash
npx vercel
```

---

## 👨‍💻 Author

**Dheeraj Sharma**  
*AI Engineer, Builder & Product Entrepreneur*  
* GitHub: [@dheeraj-srma](https://github.com/dheeraj-srma)  
* LinkedIn: [dheerajsharma0025](https://www.linkedin.com/in/dheerajsharma0025/)  
* Instagram: [@srma_g_ka_beta](https://www.instagram.com/srma_g_ka_beta/)  
* Email: [dheerajkauhsik136@gmail.com](mailto:dheerajkauhsik136@gmail.com)

---

<div align="center">
  <sub>Built with discipline & precision. Styled for maximum visual impact.</sub>
</div>
