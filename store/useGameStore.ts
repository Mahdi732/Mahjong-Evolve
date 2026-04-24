import { create } from "zustand";
import { Tile, RoundHistory, result, bet, specialTailValue } from "@/types/game";
import { gameOverChecker, roundAffection, reFullishTiles } from "@/logic/gameLogic";
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

            let currentReshuffleCount : number = state.reshuffleCount;
            let currentTile : Tile[] = state.tile;
            let currentDiscardedTiles : Tile[] = state.discardedTiles;

            if (state.tile.length <= 10) {
                if(state.reshuffleCount >= 2) {
                    return {
                        ...state,
                        result: "lose"
                    }
                }
                const reshuffledTiles = reFullishTiles(currentDiscardedTiles);
                
                currentReshuffleCount += 1;
                currentTile =  [...currentTile, ...reshuffledTiles];
                currentDiscardedTiles = [];
                
            }

            const [newSpecialTailValue, newHistory, newScore] = roundAffection(bet, state.playerTiles, state.opponentTiles, state.specialTailValue, state.score);
            const isGameOver = gameOverChecker(newSpecialTailValue);

            const editedDeck = currentTile.map(t => {
                if (t.type === "number") return t;
                return {
                    ...t,
                    value: newSpecialTailValue[t.type]
                }
            })

            const opponentNewHand = editedDeck.splice(0, 5);

            return {
                score: newScore,
                tile: editedDeck,
                discardedTiles: [...currentDiscardedTiles, ...state.playerTiles],
                playerTiles: [...state.opponentTiles],
                opponentTiles: opponentNewHand,
                reshuffleCount: currentReshuffleCount,
                specialTailValue: newSpecialTailValue,
                gameHistory: [...state.gameHistory, newHistory],
                result: isGameOver || (state.reshuffleCount >= 3 ? "lose" : null),
                
            }
        })
    }

}))