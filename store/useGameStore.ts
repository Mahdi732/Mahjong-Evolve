import { create } from "zustand";
import { Tile, RoundHistory, result, bet, specialTailValue } from "@/types/game";
import { roundAffection } from "@/logic/gameLogic";
import initialize from "@/logic/gameInitialize";

interface GameState {
    score: number;
    tile: Tile[];
    discardedTiles: Tile[];
    playerTiles: Tile[];
    opponentTiles: Tile[];
    reshuffleCount: number;
    gameHistory: RoundHistory[];
    specialTailValue: specialTailValue;
    result: result | null;
    placeBet: (bet: bet) => void;
}

const tileGenerator = initialize();


export const useGameStore = create<GameState>((set) => ({
    score: 0,
    tile: tileGenerator[0](),
    discardedTiles: [],
    playerTiles: tileGenerator[1](),
    opponentTiles: tileGenerator[2](),
    reshuffleCount: 0,
    gameHistory: [],
    result: null,
    specialTailValue: {
        dragon: 5,
        wind: 5,
        flower: 5,
        season: 5,
    },
    placeBet: (bet: bet) => {
        set((state) => {
            const [newSpecialTailValue, newHistory, newScore] = roundAffection(bet, state.playerTiles, state.opponentTiles, state.specialTailValue, state.score);

            const editedDeck = state.tile.map(t => {
                if (t.type === "number") return t;
                return {
                    ...t,
                    value: newSpecialTailValue[t.type]
                }
            })


            return {
                tile: editedDeck,
                specialTailValue: newSpecialTailValue,
                gameHistory: [...state.gameHistory, newHistory],
                score: newScore
            }
        })
    }

}))