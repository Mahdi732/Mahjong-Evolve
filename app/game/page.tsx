"use client";
import { useState, useEffect } from "react";
import GameInfo from "@/components/gameInfo";
import GameSpace from "@/components/gameSpace";

export default function GamePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <span className="text-neutral-500 text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header>
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 border-b border-neutral-800">
          <a href="/" className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer">
            ← Menu
          </a>
          <span className="text-xs font-bold text-white tracking-wider">MAHJONG EVOLVE</span>
          <div className="w-10" />
        </div>
        <GameInfo />
      </header>
      <GameSpace />
    </div>
  );
}
