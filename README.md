# 🀄 Mahjong Hand Betting Game

A high-performance, web-based betting engine built with **Next.js 14**, **TypeScript**, and **Zustand**.  
This project showcases advanced state management, dynamic game-loop logic, and a scalable, feature-ready architecture.

---

## 🚀 Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **State Management:** Zustand (Immutable State Updates)
- **Styling:** Tailwind CSS
- **Core Logic:** Custom Mahjong Tile Evolution Engine

---

## 🧠 Game Logic & Architecture

The core engine is designed for **scalability** and **predictability**, ensuring complex array operations do not cause unnecessary re-renders or state inconsistencies.

### Core Systems

#### 1) Dynamic Tile Evolution
- Non-number tiles (**Dragons, Winds, Flowers, Seasons**) start at a base value of **5**.
- Tile values fluctuate by **+1 / -1** based on round outcomes.
- Reaching boundary values (**0** or **10**) triggers a **game-over** condition.

#### 2) Deck Inflation System
- To support continuous gameplay, the engine reshuffles a fresh **144-tile deck** into the discard pile when the draw pile becomes critically low.

#### 3) Fairness Buffer
- A **10-tile threshold check** ensures each round remains a balanced **5-vs-5** match, including during mid-round reshuffles.

#### 4) Workspace Pattern
- To safely use destructive array operations (e.g., `splice`) with Zustand, the logic uses a **workspace clone strategy**.
- All deck mutations are applied to a draft workspace and then committed back to immutable state.

---

## 🛑 Game Over Conditions

The game ends when one of the following occurs:

1. **Critical Value:** Any special tile reaches **0** or **10**.
2. **Exhaustion:** The draw pile is exhausted for the **third time** (reshuffle limit reached).

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (LTS recommended)
- npm

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mahdi732/mahjong-betting-game.git
   cd mahjong-betting-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Visit: [http://localhost:3000](http://localhost:3000)

---

## 🤖 AI Utilization Disclosure

In the interest of technical assessment transparency:

### ✍️ Handwritten
- Architectural design (core state flow + Workspace Pattern)
- Deck mechanics (deck surgery, reshuffling, fairness buffers)
- Frontend implementation (component structure, Tailwind styling, UI/UX flow)
- Type safety (interfaces and strict type-checking)

### 🤖 AI-Assisted
- Optimization of Zustand `set` logic to prevent skipped rounds during high-frequency updates
- Documentation polishing (technical English for UI labels and README clarity)

---

## 📌 Notes

This project focuses on:
- Deterministic state transitions
- High-performance round updates
- Clear separation of concerns for future feature expansion
