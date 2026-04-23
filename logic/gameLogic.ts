import { useGameStore } from "@/store/useGameStore"


export const roundAffection = (bet : string ) => {
    const userHandValue = useGameStore((state) => state.playerTiles);
    const opponentHandTile = useGameStore((state) => state.opponentTiles);


}


const getTilesValue = (tails : []) => {
    
}