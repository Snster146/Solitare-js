/**
 * Game.js
 *
 * Contains the main Solitaire gameplay logic, including tableau moves,
 * stock/waste behavior, and foundation pile updates.
 */

import { HeartCards, SpadeCards, ClubCards, DiamondCards, Allcard, tableauCards } from "./CardMaps.js";
import { SelectRandomCard, visitedCards } from "./Random.js";
import { tableau1, tableau2, tableau3, tableau4, tableau5, tableau6, tableau7, stockCards, alltableu } from "./fillPiles.js";
import {
    addtableau1Cards, addtableau2Cards, addtableau3Cards, addtableau4Cards,
    addtableau5Cards, addtableau6Cards, addtableau7Cards,
    addtableaucards, getCardImg, getCardImgArr
} from "./addTableu.js";

/**
 * Cards that have moved from stock into the waste area.
 * @type {string[]}
 */
var stockCards2 = [];

// Foundation pile elements and state
var foundationpiles = [
    document.getElementById("foundation-1"),
    document.getElementById("foundation-2"),
    document.getElementById("foundation-3"),
    document.getElementById("foundation-4")
];

var foundationState = [[null], [null], [null], [null]];

var tableauPiles = [
    document.getElementById("tableau-1"),
    document.getElementById("tableau-2"),
    document.getElementById("tableau-3"),
    document.getElementById("tableau-4"),
    document.getElementById("tableau-5"),
    document.getElementById("tableau-6"),
    document.getElementById("tableau-7")
];

// Stores the displayed (top face-up) card code in each tableau pile
var tableauDisplayedCards;

var tableauPileCards = [
    [tableau1[0]], [tableau2[0]], [tableau3[0]], [tableau4[0]],
    [tableau5[0]], [tableau6[0]], [tableau7[0]]
];

var cardOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

document.addEventListener("DOMContentLoaded", function () {
    addtableaucards();
    initTabelauDisplayCards();
});

function initTabelauDisplayCards() {
    tableauDisplayedCards = [
        tableau1[0], tableau2[0], tableau3[0],
        tableau4[0], tableau5[0], tableau6[0], tableau7[0]
    ];
}


/**
 * Move an Ace from the waste pile into the first available (empty) foundation pile.
 * @param {string} card - A card code such as "HA".
 */
function addAceToFoundationPile(card) {
    for (let i = 0; i < foundationpiles.length; i++) {
        if (addToFoundation(i, card)) {
            stockCards2.pop();
            // FIX 5: show new top of waste pile, not draw pile
            updateWasteImage();
            break;
        }
    }
}

function addAceFromTableuToFoundatoin(card, fromIndex) {
    tableauCards[fromIndex].pop();
    alltableu[fromIndex].shift();

    for (let i = 0; i < foundationpiles.length; i++) {
        if (addToFoundation(i, card) === true) {
            removeAndDisplayNext(fromIndex);
            break;
        }
    }
}

/**
 * Add a card to a foundation pile at the given index.
 * Accepts an Ace into an empty slot; otherwise returns false.
 * @param {number} foundationIndex
 * @param {string} card
 * @returns {boolean}
 */
function addToFoundation(foundationIndex, card) {
    let topCard = foundationState[foundationIndex][foundationState[foundationIndex].length - 1];
    if (topCard === null) {
        // FIX 1: push onto the stack instead of overwriting [0]
        foundationState[foundationIndex].push(card);
        foundationpiles[foundationIndex].src = getCardImg(card);
        return true;
    }
    return false;
}


function removeAndDisplayNext(fromIndex) {
    tableauPileCards[fromIndex].pop();
    removeSourcePile(fromIndex);
    displayNextCardInTableu(fromIndex);
}

function removeSourcePile(fromIndex) {
    let sourcePile = document.getElementById(`tableau-${fromIndex + 1}`);
    sourcePile.removeChild(sourcePile.lastElementChild);
}

/**
 * Wraps a moved card image in a container div and appends it to the target pile.
 * @param {HTMLElement} targetPile
 * @param {HTMLImageElement} newImg
 */
function addCardToTarget(targetPile, newImg) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("card-another");
    wrapper.appendChild(newImg);
    targetPile.appendChild(wrapper);
}

function displayNextCardInTableu(fromIndex) {
    if (alltableu[fromIndex].length === 0) {
        tableauDisplayedCards[fromIndex] = "";
        tableauPileCards[fromIndex] = [];
        return;
    }
    let fromTableuNext = alltableu[fromIndex].shift();
    RevealNextTableauCard(fromIndex, fromTableuNext);
}

function RevealNextTableauCard(fromIndex, fromTableuNext) {
    let fromTableuNextImg = getCardImg(fromTableuNext);
    let revealedCard = tableauCards[fromIndex][tableauCards[fromIndex].length - 1];
    revealedCard.src = fromTableuNextImg;
    tableauDisplayedCards[fromIndex] = fromTableuNext;
    tableauPileCards[fromIndex].push(fromTableuNext);
}

/**
 * Checks whether card1 can legally be placed on top of card2 in the tableau.
 * Rules: alternating colour, descending rank by 1. Aces cannot be placed on tableau.
 */
function canMoveToTableu(card1, card2) {
    let card1Set = card1[0];
    let card2Set = card2[0];

    let card1Num = card1.slice(1);
    let card2Num = card2.slice(1);

    if (card1Num === "A") { return false; }

    let isRed1 = (card1Set === "H" || card1Set === "D");
    let isRed2 = (card2Set === "H" || card2Set === "D");
    
    if (card1Num==="K"&&card2===""){
        return true;
    }

    return isRed1 !== isRed2 && cardOrder.indexOf(card2Num) - cardOrder.indexOf(card1Num) === 1;
}

function addCardImgToTableu(card, toIndex) {
    let targetPile = document.getElementById(`tableau-${toIndex + 1}`);
    let newImg = document.createElement("img");
    newImg.src = getCardImg(card);
    newImg.id = `card-tableau-${toIndex + 1}-${tableauCards[toIndex].length + 1}`;
    tableauCards[toIndex].push(newImg);
    addCardToTarget(targetPile, newImg);
    tableauDisplayedCards[toIndex] = card;
    tableauPileCards[toIndex].push(card);
}

function addCardToTableuFromStock(card1, card2, toIndex) {
    if (canMoveToTableu(card1, card2)) {
        addCardImgToTableu(card1, toIndex);
        initializeTableauListeners();
        return true;
    }
}

function addCardToTableu(card1, card2, fromIndex, toIndex) {
    if (canMoveToTableu(card1, card2)) {
        tableauCards[fromIndex].pop();
        tableauPileCards[fromIndex].pop();
        alltableu[fromIndex].shift();
        addCardImgToTableu(card1, toIndex);
        removeSourcePile(fromIndex);
        displayNextCardInTableu(fromIndex);
        return true;
    }
    return false;
}


/**
 * Try to move the top waste card onto any matching foundation pile.
 * @param {string} card
 * @returns {boolean}
 */
function addStockToFoundation(card) {
    let card1Set = card[0];
    // FIX 6: use slice(1) for correct "10" handling
    let card1Num = card.slice(1);

    for (let i = 0; i < foundationState.length; i++) {
        // FIX 2: read top of stack, not always [0]
        let currFoundationCard = foundationState[i][foundationState[i].length - 1];

        if (currFoundationCard === null) { continue; }

        let currFoundationSet = currFoundationCard[0];
        let currFoundationNum = currFoundationCard.slice(1);

        if (card1Set === currFoundationSet &&
            cardOrder.indexOf(card1Num) - cardOrder.indexOf(currFoundationNum) === 1) {
            // FIX 1: push onto foundation stack
            foundationState[i].push(card);
            foundationpiles[i].src = getCardImg(card);
            return true;
        }
    }
    return false;
}

/**
 * Try to move a face-up tableau card onto any matching foundation pile.
 * @param {string} card  - The card to move.
 * @param {number} fromIndex - Source tableau index.
 */
function addCardToFoundation(card, fromIndex) {
    let card1Set = card[0];
    // FIX 6: use slice(1) for correct "10" handling
    let card1Num = card.slice(1);

    for (let i = 0; i < foundationState.length; i++) {
        // FIX 2: read top of foundation stack, not always [0]
        let currFoundationCard = foundationState[i][foundationState[i].length - 1];
        if (currFoundationCard === null) { continue; }

        let currFoundationSet = currFoundationCard[0];
        let currFoundationNum = currFoundationCard.slice(1);

        if (card1Set === currFoundationSet &&
            cardOrder.indexOf(card1Num) - cardOrder.indexOf(currFoundationNum) === 1) {
            tableauCards[fromIndex].pop();
            alltableu[fromIndex].shift();
            // FIX 1: push onto foundation stack
            foundationState[i].push(card);
            foundationpiles[i].src = getCardImg(card);
            removeSourcePile(fromIndex);
            displayNextCardInTableu(fromIndex);
            return true;
        }
    }
    return false;
}

/**
 * Move the top card of a foundation pile back onto a tableau pile.
 * @param {number} fromFoundationIndex
 * @param {number} toTableauIndex
 * @returns {boolean}
 */
function moveFoundationToTableau(fromFoundationIndex, toTableauIndex) {
    let foundationPile = foundationState[fromFoundationIndex];

    if (foundationPile.length === 0) { return false; }

    let topCard = foundationPile[foundationPile.length - 1];
    if (topCard === null) { return false; }

    let tableauCard = tableauDisplayedCards[toTableauIndex];

    if (!canMoveToTableu(topCard, tableauCard)) { return false; }

    foundationPile.pop();
    addCardImgToTableu(topCard, toTableauIndex);

    // Update foundation display
    let newTop = foundationPile[foundationPile.length - 1];
    foundationpiles[fromFoundationIndex].src = (newTop && newTop !== null)
        ? getCardImg(newTop)
        : "";

    return true;
}

function getNumReveledInTableuPile(PileIndex){
    let count=0;
    for (let i=0;i<tableauCards[PileIndex].length;i++){
        if(tableauCards[PileIndex][i].src.split("pixelart/")[1]==="emptyCard.png"){
            continue;
        } 
        else{
            count=count+1;
        }
    }
    return count;
}

function initializeTableauListeners() {
    for (let i = 0; i < tableauCards.length; i++) {
        for (let k = 0; k < tableauCards[i].length; k++) {

          
            (function(i, k) {
                tableauCards[i][k].addEventListener("click", function () {

                    if (tableauCards[i][k].src.split("pixelart/")[1] === "emptyCard.png") {
                        return;
                    }

                    let numRevealed = getNumReveledInTableuPile(i);

                    let bottomFaceUpIndex = tableauPileCards[i].length - numRevealed;
                    let bottomCard = tableauPileCards[i][tableauPileCards[i].length - 1];
                    let topCard = tableauPileCards[i][0];

                    if (bottomCard.slice(1) === "A") {
                        addAceFromTableuToFoundatoin(bottomCard, i);
                        initializeTableauListeners();
                        return;
                    }

                    let movedToTableau = false;
                    for (let j = 0; j < tableauCards.length; j++) {
                        if (i !== j) {
                            let targetCard = tableauPileCards[j][tableauPileCards[j].length-1];
                            
                            console.log(`${bottomCard} : ${targetCard}`);
                            if (addCardToTableu(bottomCard, targetCard, i, j)) {
                                
                                movedToTableau = true;
                                break;
                            }
                        }
                    }

                    if (!movedToTableau) {
                        addCardToFoundation(bottomCard, i);
                    }

                    initializeTableauListeners();
                });
            })(i, k);
        }
    }
}


function initializeFoundationListeners() {
    for (let i = 0; i < foundationpiles.length; i++) {
        foundationpiles[i].addEventListener("click", function () {
            for (let j = 0; j < tableauDisplayedCards.length; j++) {
                if (moveFoundationToTableau(i, j) === true) {
                    initializeTableauListeners();
                    return;
                }
            }
        });
    }
}


function updateWasteImage() {
    let wasteImg = document.getElementById("card-stock2_img");
    if (stockCards2.length > 0) {
        wasteImg.src = getCardImg(stockCards2[stockCards2.length - 1]);
    } else {
        wasteImg.src = "";
    }
}


document.getElementById("card-stock1").addEventListener("click", function () {
    // Recycle waste pile back into stock when stock is empty
    if (stockCards.length === 0) {
        stockCards.push(...stockCards2.reverse());
        stockCards2.length = 0;
    }

    let cardImg = getCardImg(stockCards[0]);
    document.getElementById("card-stock2_img").src = cardImg;

    stockCards2.push(stockCards[0]);
    stockCards.shift();
});

document.getElementById("card-stock2").addEventListener("click", function () {
    let currstockcard = stockCards2[stockCards2.length - 1];
    if (!currstockcard) { return; }

    if (currstockcard.slice(1) === "A") {
        addAceToFoundationPile(currstockcard);
        // updateWasteImage is called inside addAceToFoundationPile
        return;
    }

    for (let i = 0; i < tableauDisplayedCards.length; i++) {
        let targetCard = tableauDisplayedCards[i];
        if (addCardToTableuFromStock(currstockcard, targetCard, i) === true) {
            stockCards2.pop();
            updateWasteImage();
            return;
        }
    }

    if (addStockToFoundation(currstockcard) === true) {
        stockCards2.pop();
        updateWasteImage();
    }
});


initializeTableauListeners();
initializeFoundationListeners();