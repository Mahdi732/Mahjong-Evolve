import { create } from "zustand";
import { Tile, RoundHistory, result, bet } from "@/types/game";
import { roundAffection } from "@/logic/gameLogic";

interface GameState {
    score: number;
    tile : Tile[];
    discardedTiles : Tile[];
    playerTiles: Tile[];
    opponentTiles: Tile[];
    reshuffleCount: number;
    gameHistory: RoundHistory[];
    specailTailValue : object;
    result: result | null;
    placeBet: (bet: bet, userTiles : Tile[], opponentTiles : Tile[]) => void;
}

function initialize() {
    const tilePacket : Tile[] = [];
    function generateTiles() : Tile[] {return tilePacket}
    function genrateUserTail() : Tile[] {return []}
    function genrateOpponentTail() : Tile[] {return []}
    return [generateTiles, genrateUserTail, genrateOpponentTail];
}

const tileGenerator = initialize();

export const useGameStore = create<GameState>((set) => ({ 
    score: 0,
    tile : tileGenerator[0](),
    discardedTiles : [],
    playerTiles: tileGenerator[1](),
    opponentTiles: tileGenerator[2](),
    reshuffleCount: 0,
    gameHistory: [],
    result: null,
    specailTailValue : {
        "dragon" : 5,
        "wind" : 5,
        "flower" : 5,
        "season" : 5,
    },
    placeBet: (bet: bet, userTiles : Tile[], opponentTiles : Tile[]) => {
        roundAffection(bet, userTiles, opponentTiles);
    }

}))