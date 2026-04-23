import { Tile, bet, result } from "@/types/game";

export const roundAffection = (bet : bet, userTiles : Tile[], opponentTiles : Tile[] ) : result => {
    const userHandTile : Tile[] = userTiles;
    const opponentHandTile : Tile[] = opponentTiles;

    const userHandValue : number = getTilesValue(userHandTile);
    const opponentHandValue : number = getTilesValue(opponentHandTile);

    let roundStatus : result = "lose";
    let winSpecailTail : Tile[] = [];
    let loseSpecailTail : Tile[] = [];

    if (bet == 'higher') {
        if (userHandValue > opponentHandValue) {
            roundStatus = "win";
            winSpecailTail = getSpecailTail(userHandTile);
            loseSpecailTail = getSpecailTail(opponentHandTile);
        } else {
            winSpecailTail = getSpecailTail(opponentHandTile);
            loseSpecailTail = getSpecailTail(userHandTile);
        }
    } else if (bet == 'lower') {
        if (userHandValue < opponentHandValue) {
            roundStatus = "win";
            winSpecailTail = getSpecailTail(userHandTile);
            loseSpecailTail = getSpecailTail(opponentHandTile);
        } else {
            winSpecailTail = getSpecailTail(opponentHandTile);
            loseSpecailTail = getSpecailTail(userHandTile);
        }
    } else if (bet == 'same') {
        if (userHandValue == opponentHandValue) {
            roundStatus = "win";
            winSpecailTail = getSpecailTail(userHandTile);
            loseSpecailTail = getSpecailTail(opponentHandTile);
        } else {
            winSpecailTail = getSpecailTail(opponentHandTile);
            loseSpecailTail = getSpecailTail(userHandTile);
        }
    }

    createNewHistory(roundStatus, bet, userHandValue, opponentHandValue);
    editSpecailTailValue(roundStatus, winSpecailTail, loseSpecailTail);

    return roundStatus;
}


const getTilesValue = (tails : Tile[]) => {
    let value : number = 0;

    tails.forEach((tail) => {
        value += tail.value;
    })

    return value;
}

const getSpecailTail = (tails : Tile[]) : Tile[] => {
    return tails.filter((tail) => {
        return tail.type == "dragon" || tail.type == "wind";
    })
}

const createNewHistory = (roundStatus : result, betType : bet, userHandValue : number, opponentHandValue : number) => {
}

const editSpecailTailValue = (roundStatus : result, winSpecailTail : Tile[], loseSpecailTail : Tile[]) => {
}