"use client";
import BestScore from "@/components/bestScore";

export default function Home() {
  const handleStartGame = () => {
    window.location.href = "/game";
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-12 px-4 py-16">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Mahjong Evolve
        </h1>
        <p className="text-neutral-500 text-sm text-center max-w-sm">
          Compare tile hands. Bet higher or lower. Build your score.
        </p>
      </div>

      <button
        id="start-game-btn"
        onClick={handleStartGame}
        className="px-10 py-3.5 rounded-lg bg-white text-black font-bold text-sm tracking-wide hover:bg-neutral-200 transition-colors cursor-pointer active:scale-[0.98]"
      >
        START GAME
      </button>

      <BestScore />
    </div>
  );
}
