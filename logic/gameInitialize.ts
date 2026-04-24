import { Tile, TileType } from "@/types/game";

export default function initialize() {
    const tilePacket: Tile[] = [];
    generateNumberTile(tilePacket)
    generateSpecialTile(tilePacket)
    function generateTiles(): Tile[] { return tilePacket }
    function genrateUserTail(): Tile[] { return [] }
    function genrateOpponentTail(): Tile[] { return [] }
    return [generateTiles, genrateUserTail, genrateOpponentTail];
}

const generateNumberTile = (packet : Tile[]) => {
    const tileName = ["Dots", "Bamboo", "Characters"];
    tileName.forEach(t => {
        for (let num = 1; num <= 9; num++) {
            for (let copy = 1; copy <= 4; copy++) {
                packet.push({
                    id: "id" + Math.random().toString(16).slice(2),
                    type: "number",
                    value: num,
                    name: t + ' ' + copy
                })
            }
        }
    })
}

const generateSpecialTile = (packet : Tile[]) => {
    const tileCategorie = [
        {type : "dragon", name : ["Red", "Green", "White"]},
        {type : "wind", name : ["North", "South", "East", "West"]},
        {type : "flower", name : ["Plum", "Orchid", "Bamboo", "Chrysanthemum"]},
        {type : "season", name : ["Spring", "Summer", "Autumn", "Winter"]},
    ];

    tileCategorie.forEach(t => {
        t.name.forEach(n => {
            const copyCount = (t.type === "flower" || t.type === "season") ? 1 : 4;
            for (let copy = 1; copy <= copyCount; copy++) {
                packet.push({
                    id: "id" + Math.random().toString(16).slice(2),
                    type: t.type as TileType,
                    value: 0,
                    name: n + ' ' + copy
                })
            }
        })
    })
}