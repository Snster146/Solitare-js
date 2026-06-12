/**
 * fillPiles.js
 *
 * Generates the initial tableau and stock card sets for the Solitaire game.
 */
import { Allcard } from "./CardMaps.js";
import { shuffle, buildDeck } from "./Random.js";

/**
 * Deal a brand new game.
 * @returns {{tableaus: {code: string, faceUp: boolean}[][], stock: string[]}}
 */
function dealNewGame() {
    const deck = shuffle(buildDeck(Allcard));

    const tableaus = [];
    let idx = 0;
    for (let pileSize = 1; pileSize <= 7; pileSize++) {
        let pile = [];
        for (let j = 0; j < pileSize; j++) {
            pile.push({ code: deck[idx], faceUp: j === pileSize - 1 });
            idx++;
        }
        tableaus.push(pile);
    }

    const stock = deck.slice(idx);

    return { tableaus, stock };
}

export { dealNewGame };