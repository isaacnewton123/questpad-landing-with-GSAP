# QuestPad — Web3 Gamified Landing Page

<div align="center">
  <img src="public/brand/questpad.webp" alt="QuestPad Logo" width="100" />
  <h3>Play, Quest & Earn Real Crypto</h3>
  <p><strong>Proven By Proofs Not Trust</strong></p>

  <p>
    <a href="https://t.me/QuestPadBot">
      <img src="https://img.shields.io/badge/Telegram-@QuestPadBot-0088cc?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram Bot" />
    </a>
    <a href="https://t.me/QuestPad">
      <img src="https://img.shields.io/badge/Community-QuestPad-0088cc?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram Community" />
    </a>
    <img src="https://img.shields.io/badge/Blockchain-TON-0098EA?style=for-the-badge&logo=ton&logoColor=white" alt="TON Blockchain" />
    <img src="https://img.shields.io/badge/Deposit-0%25%20Required-00F0FF?style=for-the-badge" alt="Zero Deposit" />
  </p>
</div>

---

## 📌 Overview

**QuestPad** is a modern, high-performance landing page for the zero-cost gamified Web3 platform built directly on the **TON (The Open Network)** blockchain as a Telegram Mini App.

This landing page delivers a cinematic, pinned-scroll storytelling experience powered by **React 19**, **GSAP (ScrollTrigger)**, **Tailwind CSS v4**, and **Vite** running on **Bun**.

---

## ✨ Key Features

- **🎬 Cinematic Pinned Scroll Experience (GSAP ScrollTrigger)**
  - **Hero 1**: Staggered typography entrance:
    - `PLAY, QUEST` glides in from the top.
    - `EARN` expands from the center depth.
    - `REAL CRYPTO` rises smoothly from the bottom.
  - **Hero 2**: 3D Phone mockup emergence surrounded by interactive feature modules:
    - *Lucky Spin Arcade*: Daily streak spins with instant TON prizes.
    - *Trees Forest*: PvP competitive farming game.
    - *Verified Partner Quests*: Instant FCFS pools and community raffles.
  - **Dynamic Header Color Transition**: Header logo and "Get Started" CTA button dynamically adapt their color scheme based on the active hero section.
  - **Portal Zoom Transition**: Seamless scale transition transporting the user into the FAQ section.

- **⚡ Lightweight Clean Preloader**
  - Instant `#0047AB` background fallback preventing white flashes on cold load.
  - Real asset preloading (fonts and critical illustrations).
  - Smooth linear progress interpolation (0% → 100%) with seamless fade exit into the hero animation.

- **📜 Legal Modal System**
  - Integrated Terms of Service & Privacy Policy tabs.
  - URL hash deep-linking (`#terms`, `#privacy`) with automatic modal triggering.

- **🚀 100% WebP Asset Optimization**
  - All illustrations and brand assets converted to high-quality `.webp`, reducing the total asset bundle size by over **80%** (total image bundle is ~75 KB).
  - Pure vector SVG favicon and icons.

- **🔍 Full SEO & Social Link Previews**
  - Complete Open Graph (Facebook, Telegram, WhatsApp, Discord) and Twitter Card meta tags using `questpad.webp`.
  - JSON-LD Structured Data Schema (`WebApplication` standard).
  - Mobile theme color `#0047AB` for native browser header styling.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Core UI library & state management |
| **TypeScript** | Strict type safety and maintainability |
| **Vite 8** | Next-generation ultra-fast frontend tooling |
| **Bun** | High-performance JavaScript runtime & package manager |
| **Tailwind CSS v4** | Modern utility-first CSS styling |
| **GSAP 3** | Professional animation engine (`ScrollTrigger`, `MatchMedia`) |
| **Phosphor Icons (`react-icons/pi`)** | Clean modern vector iconography |

---

## 📁 Project Structure

```plaintext
landing/questpad/
├── public/
│   ├── brand/
│   │   └── questpad.webp       # Official brand logo asset
│   ├── illustrations/
│   │   └── phone.webp          # Phone mockup illustration
│   ├── favicon.webp            # WebP Favicon
│   ├── favicon.svg             # Vector SVG Favicon
│   └── icons.svg               # Vector SVG icons
├── src/
│   ├── assets/
│   │   ├── brand/
│   │   │   └── questpad.webp
│   │   └── illustrations/
│   │       ├── gamepad.webp    # Arcade minigames asset
│   │       ├── phone.webp      # Mobile mockup asset
│   │       ├── task.webp       # Daily quests asset
│   │       └── TON_token.webp  # TON cryptocurrency asset
│   ├── components/
│   │   ├── LegalModal.tsx      # Terms of Service & Privacy modal
│   │   └── Preloader.tsx       # Clean logo preloader with asset caching
│   ├── constants/
│   │   ├── privacy.ts          # Privacy Policy document content
│   │   └── terms.ts            # Terms of Service document content
│   ├── App.css
│   ├── App.tsx                 # Main application & GSAP scroll orchestrator
│   ├── index.css               # Global Tailwind & typography styles
│   └── main.tsx                # React application entrypoint
├── index.html                  # HTML entry with full SEO & meta tags
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) (v18+)

### Installation

1. Clone the repository and navigate to the landing page directory:
   ```bash
   cd landing/questpad
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

### Development Server

Start the local Vite development server:
```bash
bun dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Compile TypeScript and build the optimized production bundle:
```bash
bun run build
# or
npm run build
```

Preview the production build locally:
```bash
bun run preview
# or
npm run preview
```

---

## 🌐 Community & Enquiries

- **Official Telegram Bot**: [@QuestPadBot](https://t.me/QuestPadBot)
- **Telegram Community**: [t.me/QuestPad](https://t.me/QuestPad)
- **General Questions & Business Enquiries**: [@Isaacnewton1234](https://t.me/Isaacnewton1234)

---

## 📄 License

This project is proprietary and protected under the QuestPad project terms. All rights reserved.
