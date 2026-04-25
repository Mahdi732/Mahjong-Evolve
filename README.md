#🀄 Mahjong Hand Betting Game
A high-performance, web-based betting engine built with Next.js 14, TypeScript, and Zustand. This project demonstrates advanced state management, dynamic game loop logic, and a scalable "Feature-Ready" architecture.

🚀 Technical Stack
Framework: Next.js 14 (App Router)

Language: TypeScript (Strict Mode)

State Management: Zustand (Immutable State Updates)

Styling: Tailwind CSS

Logic: Custom Mahjong Tile Evolution Engine

🧠 Game Logic & Architecture
The core engine is engineered for scalability and predictability, ensuring complex array manipulations don't trigger unnecessary re-renders or state inconsistencies.

Core Systems
Dynamic Tile Evolution: Non-number tiles (Dragons, Winds, Flowers, Seasons) begin at a base value of 5. Values fluctuate (+1/-1) based on round outcomes until they hit boundary conditions (0 or 10), triggering a game-over state.

Deck Inflation System: To support infinite gameplay loops, the engine automatically reshuffles a fresh 144-tile deck into the discard pile whenever the draw pile reaches critical depletion.

Fairness Buffer: A 10-tile threshold check is enforced to guarantee every round remains a balanced 5-vs-5 match, even during mid-round reshuffle events.

The "Workspace Pattern": To handle destructive array methods (like splice) within Zustand, the logic implements a workspace clone strategy. This ensures all "deck surgery" is performed on a draft before being committed back to the immutable state.

Game Over Conditions
Critical Value: Any single special tile value reaches 0 or 10.

Exhaustion: The Draw Pile is exhausted for the 3rd time (reshuffle limit reached).

🛠️ Setup & Installation
To run this project locally, follow these steps:

Clone the repository:

Bash
git clone https://github.com/Mahdi732/mahjong-betting-game.git
cd mahjong-betting-game
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open the app: Navigate to http://localhost:3000 in your browser.

🤖 AI Utilization Disclosure
In alignment with technical assessment transparency, here is the breakdown of development:

✍️ Handwritten
Architectural Design: Core state management flow and "Workspace Pattern" logic.

Deck Mechanics: Custom algorithms for deck surgery, reshuffling, and fairness buffers.

Frontend: Component composition, Tailwind CSS implementation, and UI/UX flow.

Type Safety: All TypeScript interface definitions and strict type checking.

🤖 AI Assisted
Optimization: Logic refinement within the Zustand set functions to prevent "skipped rounds" during high-frequency state updates.

Documentation: Polishing technical English for UI labels and README clarity
