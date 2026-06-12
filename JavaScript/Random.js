/**
 * Random.js
 *
 * Provides randomization utilities used to build and shuffle a full
 * 52 card deck for dealing a new game.
 */

/**
 * Shuffle an array in place using the Fisher-Yates algorithm.
 * @param {any[]} array - Array to shuffle.
 * @returns {any[]} The same array, shuffled.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Build a flat array containing every card code from the four suit maps.
 * @param {Map[]} allCard - Array of the four suit Maps (Hearts, Spades, Clubs, Diamonds).
 * @returns {string[]} Array of all 52 card codes, e.g. ["H2", "H3", ..., "DK"].
 */
function buildDeck(allCard) {
    let deck = [];
    for (let i = 0; i < allCard.length; i++) {
        for (const cardCode of allCard[i].keys()) {
            deck.push(cardCode);
        }
    }
    return deck;
}

export { shuffle, buildDeck };
