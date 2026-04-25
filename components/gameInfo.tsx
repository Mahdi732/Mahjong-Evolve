"use client";
import { useGameStore } from "@/store/useGameStore";

export default function GameInfo() {
  const score = useGameStore((s) => s.score);
  const reshuffleCount = useGameStore((s) => s.reshuffleCount);
  const tileCount = useGameStore((s) => s.tile.length);
  const discardedCount = useGameStore((s) => s.discardedTiles.length);
  const specialTailValue = useGameStore((s) => s.specialTailValue);

  const stats = [
    { label: "Score", value: score },
    { label: "Reshuffles", value: `${reshuffleCount}/2` },
    { label: "Pack", value: tileCount },
    { label: "Discarded", value: discardedCount },
  ];

  return (
    <div className="w-full px-4 py-3 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-6 flex-wrap">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500">{stat.label}</span>
            <span className="text-sm font-bold text-white">{stat.value}</span>
          </div>
        ))}

        <div className="h-4 w-px bg-neutral-800" />

        {Object.entries(specialTailValue).map(([key, val]) => {
          const labels: Record<string, string> = { dragon: "DRG", wind: "WND", flower: "FLR", season: "SSN" };
          return (
            <div key={key} className="flex items-center gap-1.5">
              <span className="text-[10px] text-neutral-600 font-mono">{labels[key]}</span>
              <div className="w-10 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-300"
                  style={{ width: `${(val / 10) * 100}%`, opacity: val <= 2 ? 0.4 : 1 }}
                />
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}