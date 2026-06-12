/**
 * Game.js
 *
 * Contains the main Solitaire gameplay logic, including tableau moves,
 * stock/waste behavior, and foundation pile updates.
 */

import { getCardImg, BACK_CARD_IMG, EMPTY_CARD_IMG, cardOrder } from "./CardMaps.js";
import { dealNewGame } from "./fillPiles.js";

/** @type {{code: string, faceUp: boolean}[][]} 7 tableau piles */
let tableaus = [];

/** @type {string[][]} 4 foundation piles, suit determined by the first (Ace) card placed */
let foundations = [[], [], [], []];

/** @type {string[]} Face-down draw pile. Last element is the next card to draw. */
let stock = [];

/** @type {string[]} Face-up waste pile. Last element is the currently visible card. */
let waste = [];

// ----- DOM references -----
const tableauEls = [
    document.getElementById("tableau-1"),
    document.getElementById("tableau-2"),
    document.getElementById("tableau-3"),
    document.getElementById("tableau-4"),
    document.getElementById("tableau-5"),
    document.getElementById("tableau-6"),
    document.getElementById("tableau-7")
];

const foundationEls = [
    document.getElementById("foundation-1"),
    document.getElementById("foundation-2"),
    document.getElementById("foundation-3"),
    document.getElementById("foundation-4")
];

const stockEl = document.getElementById("card-stock1");
const stockImgEl = stockEl ? stockEl.querySelector("img") : null;
const wasteEl = document.getElementById("card-stock2");
const wasteImgEl = document.getElementById("card-stock2_img");
const winMessageEl = document.getElementById("win-message");
const newGameBtn = document.getElementById("new-game-btn");
const winNewGameBtn = document.getElementById("win-new-game-btn");
/**
 * Start (or restart) a brand new game.
 */
function startNewGame() {
    const dealt = dealNewGame();
    tableaus = dealt.tableaus;
    foundations = [[], [], [], []];
    stock = dealt.stock;
    waste = [];

    if (winMessageEl) {
        winMessageEl.classList.remove("show");
    }

    render();
}

/**
 * Re-render the entire board from the current game state.
 */
function render() {
    renderTableaus();
    renderFoundations();
    renderStock();
    renderWaste();
    checkWinCondition();
}

function renderTableaus() {
    for (let i = 0; i < tableaus.length; i++) {
        const pileEl = tableauEls[i];
        pileEl.innerHTML = "";

        const pile = tableaus[i];
        for (let k = 0; k < pile.length; k++) {
            const card = pile[k];

            const wrapper = document.createElement("div");
            wrapper.classList.add("card-another");

            const img = document.createElement("img");
            img.src = card.faceUp ? getCardImg(card.code) : BACK_CARD_IMG;

            if (card.faceUp) {
                img.style.cursor = "pointer";
                img.addEventListener("click", () => handleTableauCardClick(i, k));
            }

            wrapper.appendChild(img);
            pileEl.appendChild(wrapper);
        }
    }
}

function renderFoundations() {
    for (let i = 0; i < foundations.length; i++) {
        const pile = foundations[i];
        if (pile.length > 0) {
            foundationEls[i].src = getCardImg(pile[pile.length - 1]);
        } else {
            foundationEls[i].src = EMPTY_CARD_IMG;
        }
    }
}

function renderStock() {
    if (!stockImgEl) { return; }
    stockImgEl.src = stock.length > 0 ? BACK_CARD_IMG : EMPTY_CARD_IMG;
}

function renderWaste() {
    if (waste.length > 0) {
        wasteImgEl.src = getCardImg(waste[waste.length - 1]);
    } else {
        wasteImgEl.src = EMPTY_CARD_IMG;
    }
}

/**
 * Whether `card` is a red suit (Hearts or Diamonds).
 * @param {string} card
 * @returns {boolean}
 */
function isRed(card) {
    return card[0] === "H" || card[0] === "D";
}

/**
 * Checks whether `card` can legally be placed on top of a tableau pile
 * whose current top card is `targetTopCode` (or `null` if the pile is empty).
 * Rules: empty piles only accept Kings; otherwise alternating colour and
 * descending rank by exactly 1.
 * @param {string} card
 * @param {string|null} targetTopCode
 * @returns {boolean}
 */
function canPlaceOnTableau(card, targetTopCode) {
    if (targetTopCode === null) {
        return card.slice(1) === "K";
    }

    const sameColour = isRed(card) === isRed(targetTopCode);
    const rankDiff = cardOrder.indexOf(targetTopCode.slice(1)) - cardOrder.indexOf(card.slice(1));

    return !sameColour && rankDiff === 1;
}

/**
 * Checks whether `card` can legally be placed on a foundation pile.
 * Empty foundations only accept an Ace; otherwise the card must match
 * the foundation's suit and be exactly one rank above the current top card.
 * @param {string} card
 * @param {string[]} foundationPile
 * @returns {boolean}
 */
function canPlaceOnFoundation(card, foundationPile) {
    if (foundationPile.length === 0) {
        return card.slice(1) === "A";
    }

    const topCard = foundationPile[foundationPile.length - 1];
    const sameSuit = card[0] === topCard[0];
    const rankDiff = cardOrder.indexOf(card.slice(1)) - cardOrder.indexOf(topCard.slice(1));

    return sameSuit && rankDiff === 1;
}

/**
 * Try to place `card` onto the first foundation pile that will accept it.
 * @param {string} card
 * @returns {boolean} true if the card was moved.
 */
function tryAddToFoundation(card) {
    for (let i = 0; i < foundations.length; i++) {
        if (canPlaceOnFoundation(card, foundations[i])) {
            foundations[i].push(card);
            return true;
        }
    }
    return false;
}

/**
 * Try to place `card` onto the first tableau pile (other than `excludeIndex`)
 * that will accept it as a single card.
 * @param {string} card
 * @param {number} [excludeIndex] - Tableau index to skip (the source pile).
 * @returns {boolean} true if the card was moved.
 */
function tryMoveCardToTableau(card, excludeIndex) {
    for (let j = 0; j < tableaus.length; j++) {
        if (j === excludeIndex) { continue; }

        const targetPile = tableaus[j];
        const targetTop = targetPile.length > 0 ? targetPile[targetPile.length - 1].code : null;

        if (canPlaceOnTableau(card, targetTop)) {
            targetPile.push({ code: card, faceUp: true });
            return true;
        }
    }
    return false;
}

/**
 * After cards are removed from a tableau pile, flip its new top card
 * face-up if needed.
 * @param {number} pileIndex
 */
function flipNewTopCard(pileIndex) {
    const pile = tableaus[pileIndex];
    if (pile.length > 0 && !pile[pile.length - 1].faceUp) {
        pile[pile.length - 1].faceUp = true;
    }
}

/**
 * Handle a click on the stock pile: draw a card to the waste pile, or
 * recycle the waste pile back into the stock once it is empty.
 */
function handleStockClick() {
    if (stock.length === 0) {
        if (waste.length === 0) { return; }
        stock = waste.reverse();
        waste = [];
    } else {
        waste.push(stock.pop());
    }
    render();
}

/**
 * Handle a click on the waste pile's top (visible) card: try to move it
 * to a foundation, then to a tableau pile.
 */
function handleWasteClick() {
    if (waste.length === 0) { return; }

    const card = waste[waste.length - 1];

    if (tryAddToFoundation(card) || tryMoveCardToTableau(card)) {
        waste.pop();
        render();
    }
}

/**
 * Handle a click on a face-up tableau card. If it's the top card of its
 * pile, try moving it to a foundation, then to another tableau pile.
 * Otherwise, try moving the whole face-up run starting at this card onto
 * another tableau pile.
 * @param {number} pileIndex
 * @param {number} cardIndex
 */
function handleTableauCardClick(pileIndex, cardIndex) {
    const pile = tableaus[pileIndex];
    const card = pile[cardIndex];
    if (!card) { return; }
    const isTopCard = cardIndex === pile.length - 1;

    if (isTopCard) {
        if (tryAddToFoundation(card.code)) {
            pile.pop();
            flipNewTopCard(pileIndex);
            render();
            return;
        }

        if (tryMoveCardToTableau(card.code, pileIndex)) {
            pile.pop();
            flipNewTopCard(pileIndex);
            render();
            return;
        }

        return;
    }

    // Moving a multi-card run: take this card and everything on top of it.
    const movingCards = pile.slice(cardIndex);
    const headCard = movingCards[0].code;

    for (let j = 0; j < tableaus.length; j++) {
        if (j === pileIndex) { continue; }

        const targetPile = tableaus[j];
        const targetTop = targetPile.length > 0 ? targetPile[targetPile.length - 1].code : null;

        if (canPlaceOnTableau(headCard, targetTop)) {
            tableaus[pileIndex] = pile.slice(0, cardIndex);
            targetPile.push(...movingCards);

            flipNewTopCard(pileIndex);
            render();
            return;
        }
    }
}

/**
 * Handle a click on a foundation pile: move its top card back onto the
 * first tableau pile that will accept it.
 * @param {number} foundationIndex
 */
function handleFoundationClick(foundationIndex) {
    const pile = foundations[foundationIndex];
    if (pile.length === 0) { return; }

    const topCard = pile[pile.length - 1];

    for (let j = 0; j < tableaus.length; j++) {
        const targetPile = tableaus[j];
        const targetTop = targetPile.length > 0 ? targetPile[targetPile.length - 1].code : null;

        if (canPlaceOnTableau(topCard, targetTop)) {
            pile.pop();
            targetPile.push({ code: topCard, faceUp: true });
            render();
            return;
        }
    }
}

/**
 * The game is won once all four foundation piles hold a full 13-card suit
 * (Ace through King).
 */
function checkWinCondition() {
    const won = foundations.every(pile => pile.length === 13);
    if (won && winMessageEl) {
        winMessageEl.classList.add("show");
    }
}

if (stockEl) { stockEl.addEventListener("click", handleStockClick); }
if (wasteEl) { wasteEl.addEventListener("click", handleWasteClick); }

for (let i = 0; i < foundationEls.length; i++) {
    foundationEls[i].addEventListener("click", () => handleFoundationClick(i));
}

if (newGameBtn) {
    newGameBtn.addEventListener("click", startNewGame);
}
if (winNewGameBtn) {
    winNewGameBtn.addEventListener("click", startNewGame);
}

// Module scripts run after the DOM has been parsed, so the board
// elements above are already available - start the game immediately.
startNewGame();

