import { Instructions, nextInstruction } from "./instructionsHelperClass.js";

const instructionObject = new Instructions({
    map: new Map([
        ["Objective", "Your goal is to arrange all cards into the 4 empty foundation piles, organized by suit in ascending order, starting with an Ace and progressing to a King. You achieve this by moving face-up cards from the stock pile and the tableau."],
        ["The tableau", "The main area of gameplay is the tableau, which is made up of 7 columns of 28 cards laid out from left to right. The first column consists of one card, and the subsequent columns have an additional card until the last column has 7. The last card in each column is face-up, while the rest remain face-down until revealed."],
        ["The Stockpile", "The remaining 24 cards, placed face-down, become the stockpile, which you draw from 1 at a time when you run out of moves on the tableau."],
        ["The Wastepile", "Any cards you flip from the stockpile move face-up into the waste pile. The face-up card that is revealed can be used to make plays."],
        ["The Foundation piles", "These are the 4 piles you arrange your cards into. Each pile is organized by suit, and cards are placed in ascending order, starting with an Ace and ending with a King."]
    ]),
    instructiontitles: [
        "Objective",
        "The tableau",
        "The Stockpile",
        "The Wastepile",
        "The Foundation piles"
    ],
    counter: 0
});

document
.getElementById("nxt-info-btn")
.addEventListener("click", () => nextInstruction(instructionObject));