/**
 * CardMaps.js
 *
 * Defines all card image resources and provides shared board element references.
 */
var HeartCards= new Map([
    ["H2","../images/pixelart/2_hearts.png"],
    ["H3","../images/pixelart/3_hearts.png"],
    ["H4","../images/pixelart/4_hearts.png"],
    ["H5","../images/pixelart/5_hearts.png"],
    ["H6","../images/pixelart/6_hearts.png"],
    ["H7","../images/pixelart/7_hearts.png"],
    ["H8","../images/pixelart/8_hearts.png"],
    ["H9","../images/pixelart/9_hearts.png"],
    ["H10","../images/pixelart/10_hearts.png"],
    ["HA","../images/pixelart/ace_hearts.png"],
    ["HJ","../images/pixelart/J_hearts.png"],
    ["HK","../images/pixelart/K_hearts.png"],
    ["HQ","../images/pixelart/Q_hearts.png"],
]);

var SpadeCards= new Map([
    ["S2","../images/pixelart/2_spades.png"],
    ["S3","../images/pixelart/3_spades.png"],
    ["S4","../images/pixelart/4_spades.png"],
    ["S5","../images/pixelart/5_spades.png"],
    ["S6","../images/pixelart/6_spades.png"],
    ["S7","../images/pixelart/7_spades.png"],
    ["S8","../images/pixelart/8_spades.png"],
    ["S9","../images/pixelart/9_spades.png"],
    ["S10","../images/pixelart/10_spades.png"],
    ["SA","../images/pixelart/ace_spades.png"],
    ["SJ","../images/pixelart/J_spades.png"],
    ["SK","../images/pixelart/K_spades.png"],
    ["SQ","../images/pixelart/Q_spades.png"],
]);

var ClubCards= new Map([
    ["C2","../images/pixelart/2_clubs.png"],
    ["C3","../images/pixelart/3_clubs.png"],
    ["C4","../images/pixelart/4_clubs.png"],
    ["C5","../images/pixelart/5_clubs.png"],
    ["C6","../images/pixelart/6_clubs.png"],
    ["C7","../images/pixelart/7_clubs.png"],
    ["C8","../images/pixelart/8_clubs.png"],
    ["C9","../images/pixelart/9_clubs.png"],
    ["C10","../images/pixelart/10_clubs.png"],
    ["CA","../images/pixelart/ace_clubs.png"],
    ["CJ","../images/pixelart/J_clubs.png"],
    ["CK","../images/pixelart/K_clubs.png"],
    ["CQ","../images/pixelart/Q_clubs.png"],
]);

var DiamondCards= new Map([
    ["D2","../images/pixelart/2_diamond.png"],
    ["D3","../images/pixelart/3_diamond.png"],
    ["D4","../images/pixelart/4_diamond.png"],
    ["D5","../images/pixelart/5_diamond.png"],
    ["D6","../images/pixelart/6_diamond.png"],
    ["D7","../images/pixelart/7_diamond.png"],
    ["D8","../images/pixelart/8_diamond.png"],
    ["D9","../images/pixelart/9_diamond.png"],
    ["D10","../images/pixelart/10_diamond.png"],
    ["DA","../images/pixelart/ace_diamond.png"],
    ["DJ","../images/pixelart/J_diamond.png"],
    ["DK","../images/pixelart/K_diamond.png"],
    ["DQ","../images/pixelart/Q_diamond.png"],
]);
// All four suit maps together - used to build a full 52 card deck.
var Allcard = [HeartCards, SpadeCards, ClubCards, DiamondCards];

// Shared image paths used for face-down cards and empty pile slots.
var BACK_CARD_IMG = "../images/pixelart/back_card.png";
var EMPTY_CARD_IMG = "../images/pixelart/emptyCard.png";

/**
 * Ranks in order from lowest to highest, used to determine valid
 * tableau/foundation sequencing.
 * @type {string[]}
 */
var cardOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

/**
 * Convert a single card code (e.g. "H2", "DQ", "C10") into its image path.
 * @param {string} cardName
 * @returns {string|undefined}
 */
function getCardImg(cardName) {
    switch (cardName[0]) {
        case "H":
            return HeartCards.get(cardName);
        case "D":
            return DiamondCards.get(cardName);
        case "S":
            return SpadeCards.get(cardName);
        case "C":
            return ClubCards.get(cardName);
        default:
            return undefined;
    }
}

export {
    HeartCards, SpadeCards, ClubCards, DiamondCards, Allcard,
    BACK_CARD_IMG, EMPTY_CARD_IMG, cardOrder, getCardImg
};
