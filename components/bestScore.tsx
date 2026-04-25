"use client";
import { useEffect, useState } from "react";
import { getTopScores } from "@/utils/scores";

export default function BestScore() {
  const [scores, setScores] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setScores(getTopScores());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-xs border border-neutral-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
        Top 5 Scores
      </h2>
      {scores.length === 0 ? (
        <p className="text-neutral-600 text-sm text-center py-4">No scores yet.</p>
      ) : (
        <div className="space-y-1.5">
          {scores.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-md bg-neutral-900"
            >
              <span className="text-neutral-500 text-xs font-mono">#{i + 1}</span>
              <span className="text-white font-semibold text-sm">{s} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}