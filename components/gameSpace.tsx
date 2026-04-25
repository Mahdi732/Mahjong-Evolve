"use client";
import { useGameStore } from "@/store/useGameStore";
import { Tile, bet } from "@/types/game";
import { useState, useEffect, useCallback } from "react";
import { saveScore } from "@/utils/scores";

type GamePhase = "betting" | "revealing";

/* ── Tile Card ── */
function TileCard({ tile, faceDown = false }: { tile: Tile; faceDown?: boolean }) {
  if (faceDown) {
    return (
      <div className="w-16 h-24 rounded-lg border border-neutral-700 bg-neutral-900 flex items-center justify-center">
        <span className="text-lg text-neutral-600 select-none">?</span>
      </div>
    );
  }

  return (
    <div className="w-16 h-24 rounded-lg border border-neutral-700 bg-neutral-900 flex flex-col items-center justify-center gap-0.5">
      <span className="text-[10px] text-neutral-500 capitalize">{tile.type === "number" ? tile.name.split(" ")[0] : tile.type}</span>
      <span className="text-xl font-bold text-white leading-none">{tile.value}</span>
      <span className="text-[9px] text-neutral-600 truncate w-full text-center px-1">{tile.name}</span>
    </div>
  );
}

/* ── History Modal ── */
function HistoryModal({ onClose }: { onClose: () => void }) {
  const gameHistory = useGameStore((s) => s.gameHistory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 max-w-md w-full mx-4 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Round History</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors cursor-pointer">✕</button>
        </div>
        {gameHistory.length === 0 ? (
          <p className="text-neutral-600 text-sm text-center py-6">No rounds played yet.</p>
        ) : (
          <div className="space-y-1.5">
            {gameHistory.map((round, i) => (
              <div key={round.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-xs text-neutral-500 font-mono">#{i + 1}</span>
                <span className="text-xs text-neutral-400 capitalize">{round.bet}</span>
                <span className="text-xs text-neutral-400">
                  {round.playerTileSum} vs {round.opponentTileSum}
                </span>
                <span className={`text-xs font-bold uppercase ${round.result === "win" ? "text-white" : "text-neutral-600"}`}>
                  {round.result}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Game Over Overlay ── */
function GameOverOverlay({ result, score, isNewHighScore }: { result: "win" | "lose"; score: number; isNewHighScore: boolean }) {
  const isWin = result === "win";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in">
      <div className="flex flex-col items-center gap-6 border border-neutral-800 rounded-2xl p-10 max-w-xs w-full mx-4">
        <h2 className="text-3xl font-black text-white">
          {isWin ? "YOU WIN" : "GAME OVER"}
        </h2>
        <div className="flex flex-col items-center gap-1">
          <span className="text-neutral-500 text-xs uppercase tracking-wider">Final Score</span>
          <span className="text-4xl font-black text-white">{score}</span>
        </div>
        {isNewHighScore && (
          <span className="text-xs text-neutral-400 border border-neutral-700 rounded-full px-3 py-1">
            ★ New Top 5 Score
          </span>
        )}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-2 px-8 py-3 rounded-lg bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors cursor-pointer active:scale-[0.98]"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

/* ── Main GameSpace ── */
export default function GameSpace() {
  const playerTiles = useGameStore((s) => s.playerTiles);
  const opponentTiles = useGameStore((s) => s.opponentTiles);
  const placeBet = useGameStore((s) => s.placeBet);
  const result = useGameStore((s) => s.result);
  const score = useGameStore((s) => s.score);
  const gameHistory = useGameStore((s) => s.gameHistory);

  const [phase, setPhase] = useState<GamePhase>("betting");
  const [prevPlayerTiles, setPrevPlayerTiles] = useState<Tile[]>([]);
  const [prevOpponentTiles, setPrevOpponentTiles] = useState<Tile[]>([]);
  const [lastResult, setLastResult] = useState<"win" | "lose" | null>(null);
  const [lastBet, setLastBet] = useState<bet | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    if (result && !scoreSaved) {
      setIsNewHighScore(saveScore(score));
      setScoreSaved(true);
    }
  }, [result, score, scoreSaved]);

  const handleBet = useCallback((betType: bet) => {
    setPrevPlayerTiles([...playerTiles]);
    setPrevOpponentTiles([...opponentTiles]);
    setLastBet(betType);
    placeBet(betType);
    setPhase("revealing");
  }, [playerTiles, opponentTiles, placeBet]);

  useEffect(() => {
    if (phase === "revealing" && gameHistory.length > 0) {
      setLastResult(gameHistory[gameHistory.length - 1].result);
    }
  }, [phase, gameHistory]);

  const handleContinue = () => {
    setPhase("betting");
    setLastResult(null);
    setLastBet(null);
  };

  const displayPlayerTiles = phase === "revealing" ? prevPlayerTiles : playerTiles;
  const displayOpponentTiles = phase === "revealing" ? prevOpponentTiles : opponentTiles;
  const hideOpponent = phase === "betting";

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8">
        <span className="text-xs text-neutral-600 font-mono">
          Round {gameHistory.length + (phase === "betting" ? 1 : 0)}
        </span>

        <div className="flex items-center justify-center gap-6 md:gap-12 w-full max-w-3xl flex-wrap md:flex-nowrap">
          {/* Opponent (left) */}
          <div className="flex flex-col items-center gap-3 flex-1 min-w-[200px]">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Opponent</h3>
            <div className="flex gap-1.5 flex-wrap justify-center">
              {displayOpponentTiles.map((tile) => (
                <TileCard key={tile.id} tile={tile} faceDown={hideOpponent} />
              ))}
            </div>
            {phase === "revealing" && gameHistory.length > 0 && (
              <span className="text-xs text-neutral-500">
                Sum: <span className="text-white font-bold">{gameHistory[gameHistory.length - 1].opponentTileSum}</span>
              </span>
            )}
          </div>

          {/* Center controls */}
          <div className="flex flex-col items-center gap-4 min-w-[140px]">
            {phase === "betting" ? (
              <>
                <span className="text-neutral-600 text-[10px] uppercase tracking-widest">Your Bet</span>
                <button
                  id="bet-higher"
                  onClick={() => handleBet("higher")}
                  className="w-32 py-2.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer active:scale-[0.97]"
                >
                  ▲ HIGHER
                </button>
                <button
                  id="bet-lower"
                  onClick={() => handleBet("lower")}
                  className="w-32 py-2.5 rounded-lg border border-neutral-600 text-white font-bold text-xs hover:bg-neutral-900 transition-colors cursor-pointer active:scale-[0.97]"
                >
                  ▼ LOWER
                </button>
              </>
            ) : (
              <>
                <div className="animate-fade-in flex flex-col items-center gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">
                    Bet: {lastBet}
                  </span>
                  <span className={`text-2xl font-black ${lastResult === "win" ? "text-white" : "text-neutral-600"}`}>
                    {lastResult === "win" ? "WIN" : "LOSS"}
                  </span>
                </div>
                {!result && (
                  <button
                    id="continue-btn"
                    onClick={handleContinue}
                    className="px-5 py-2 rounded-lg border border-neutral-700 text-white text-xs font-medium hover:bg-neutral-900 transition-colors cursor-pointer active:scale-[0.97]"
                  >
                    Continue →
                  </button>
                )}
              </>
            )}
          </div>

          {/* Player (right) */}
          <div className="flex flex-col items-center gap-3 flex-1 min-w-[200px]">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Your Hand</h3>
            <div className="flex gap-1.5 flex-wrap justify-center">
              {displayPlayerTiles.map((tile) => (
                <TileCard key={tile.id} tile={tile} />
              ))}
            </div>
            {phase === "revealing" && gameHistory.length > 0 && (
              <span className="text-xs text-neutral-500">
                Sum: <span className="text-white font-bold">{gameHistory[gameHistory.length - 1].playerTileSum}</span>
              </span>
            )}
          </div>
        </div>

        <button
          id="history-btn"
          onClick={() => setShowHistory(true)}
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer border-b border-neutral-800 hover:border-neutral-600 pb-0.5"
        >
          History ({gameHistory.length})
        </button>
      </div>

      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
      {result && <GameOverOverlay result={result} score={score} isNewHighScore={isNewHighScore} />}
    </>
  );
}
