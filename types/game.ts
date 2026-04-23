export type TileType = "number" | "dragon" | "wind" | "flower" | "season";

export type bet  = "higher" | "lower" | "same";

export type result = "win" | "lose" ;

export interface Tile {
    id : string,
    type : TileType,
    value : number,
    name : string
}

export interface GameHistory {
    id : string, 
    bet : bet,
    playerTileSum : number,
    opponentTileSum : number,
    result : result
}