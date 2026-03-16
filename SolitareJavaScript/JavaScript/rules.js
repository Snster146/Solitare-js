import { Instructions, nextInstruction } from "./instructionsHelperClass.js";

const instructionObject = new Instructions({
    map: new Map([
        ["Move face-up cards only", " A face-down card in the tableau cannot be overturned and played until the face-up card on top of it is removed. If you play a face-up card from the waste pile, it will reveal another face-up card that can then be played on the foundation piles or tableau columns."],
        ["Move a card from one tableau column to another if the card is the alternate color and one rank lower.", "For example, a 6 of Clubs can be placed on top of a 7 of Diamonds or Hearts."],
        ["Move a group of sequenced cards", "To do so, the highest-ranking card in the group must be placed on a card that is an alternate higher and one rank higher."],
        ["Reveal face-down cards in tableau columns", "Once a face-up card on top of a face-down card is moved, it will be turned face-up and available to play."],
        ["Build foundation piles.", "Begin foundation piles with an Ace then add cards of the same suit to each pile in ascending order. In the Spades foundation, the next card after the Ace of Spades, for example, will be a 2 of Spades."]
    ]),
    instructiontitles: [
        "Move face-up cards only",
        "Move a card from one tableau column to another if the card is the alternate color and one rank lower.",
        "Move a group of sequenced cards",
        "Reveal face-down cards in tableau columns",
        "Build foundation piles."
    ],
    counter: 0
});

document
.getElementById("nxt-rule-btn")
.addEventListener("click", () => nextInstruction(instructionObject));