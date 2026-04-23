import { create } from "zustand";
import { Tile, GameHistory, result, bet } from "@/types/game";

interface GameState {
    score: number;
    tile : Tile[];
    discardedTiles : Tile[];
    playerTiles: Tile[];
    opponentTiles: Tile[];
    reshuffleCount: number;
    gameHistory: GameHistory[];
    specailTailValue : object;
    result: result | null;
    placeBet: (bet: bet) => void;
}

export const useGameStore = create<GameState>((set) => ({ 
    score: 0,
    tile : tileGenerator[0](),
    discardedTiles : [],
    playerTiles: tileGenerator[1](),
    opponentTiles: tileGenerator[2](),
    reshuffleCount: 3,
    gameHistory: [],
    result: null,
    specailTailValue : {
        "dragon" : 5,
        "wind" : 5,
        "flower" : 5,
        "season" : 5,
    },
    placeBet: (bet: bet) => {
    }

}))

function initialize() {
    function generateTiles() : Tile[] {return []}
    function genrateUserTail() : Tile[] {return []}
    function genrateOpponentTail() : Tile[] {return []}
    return [generateTiles, genrateUserTail, genrateOpponentTail];
}

const tileGenerator = initialize();