import { Tile, bet, result, specialTailValue, RoundHistory } from "@/types/game";

export const roundAffection = (bet: bet, userTiles: Tile[], opponentTiles: Tile[], specialTailsValue: specialTailValue, currentScore: number): [specialTailValue, RoundHistory, number] => {
    const userHandValue: number = getTilesValue(userTiles, specialTailsValue);
    const opponentHandValue: number = getTilesValue(opponentTiles, specialTailsValue);

    let roundStatus: result = "lose";
    let specialTailSelected: Tile[] = [];

    specialTailSelected = getSpecailTail(userTiles);

    if (bet == 'higher' && userHandValue < opponentHandValue) {
        roundStatus = "win";
    } else if (bet == 'lower' && userHandValue > opponentHandValue) {
        roundStatus = "win";
    } else if (bet == 'same' && userHandValue == opponentHandValue) {
        roundStatus = "win";
    }

    const newHistory = createNewHistory(roundStatus, bet, userHandValue, opponentHandValue);
    const newSpecialTailsValue = editSpecialTailValue(specialTailSelected, specialTailsValue, roundStatus);

    const newScore = (roundStatus == 'win'? currentScore + 1 : currentScore);

    return [newSpecialTailsValue, newHistory, newScore];
}


const getTilesValue = (tails: Tile[], specialTailsValue: specialTailValue) => {
    let value: number = 0;

    tails.forEach((tail) => {
        if (tail.type === 'number') {
            value += tail.value;
        } else {
            value += specialTailsValue[tail.type];
        }
    })

    return value;
}

const getSpecailTail = (tails: Tile[]): Tile[] => {
    return tails.filter(t => t.type !== 'number')
}

const createNewHistory = (roundStatus: result, betType: bet, userHandValue: number, opponentHandValue: number) => {
    return {
        id: '',
        bet: betType,
        playerTileSum: userHandValue,
        opponentTileSum: opponentHandValue,
        result: roundStatus
    };
}

const editSpecialTailValue = (specialTailSelected: Tile[], specialTailValue: specialTailValue, roundStatus: result) => {
    const editedSpecialTailValue = { ...specialTailValue };
    specialTailSelected.forEach((tail) => {
        const key = tail.type as keyof specialTailValue;
        editedSpecialTailValue[key] += (roundStatus === "win" ? 1 : -1);
    })
    return editedSpecialTailValue;
}