export class Instructions {
    constructor({ map, instructiontitles, counter }) {
        this.instructionsMap = map;
        this.instructionTitles = instructiontitles;
        this._counter = counter;
    }

    // getter
    get counter() {
        return this._counter;
    }

    get titles() {
        return this.instructionTitles;
    }

    // setter
    set counter(value) {
        if (value === this.instructionTitles.length) {
            this._counter = 0;
        } else {
            this._counter = value;
        }
    }

    set instructionsMapSetter(map) {
        this.instructionsMap = map;
    }

    getInstructionTitle(i) {
        return this.instructionTitles[i];
    }

    getInstructionContent(key) {
        return this.instructionsMap.get(key);
    }

    getInstructionByCounter(counter) {
        const key = this.instructionTitles[counter];
        return [key, this.instructionsMap.get(key)];
    }
}


// let instructionObject = new Instructions({
//     'map': new Map([
//         ["Move face-up cards only", "A face-down card in the tableau cannot be overturned..."],
//         ["Move a card from one tableau column to another if the card is the alternate color and one rank lower.", "For example, a 6 of Clubs can be placed on top of a 7 of Diamonds or Hearts."],
//         ["Stockpile", "The remaining 24 cards become the stockpile."],
//         ["Wastepile", "Cards flipped from the stockpile move face-up into the waste pile."],
//         ["Foundation piles", "These are the 4 piles you arrange cards into."]
//     ]),
//     'instructiontitles': [
//         "Move face-up cards only",
//         "Move a card from one tableau column to another if the card is the alternate color and one rank lower.",
//         "Stockpile",
//         "Wastepile",
//         "Foundation piles"
//     ],
//     'counter': 0
// });

export function nextInstruction(instructionObject) {
    let i = instructionObject.counter;
    i = (i + 1) % instructionObject.titles.length;

    let instructiondetails = instructionObject.getInstructionByCounter(i);
    let title=instructiondetails[0];
    let details=instructiondetails[1];
    document.getElementById("instructions-h1").innerHTML = title;
    document.getElementById("instructions-p").innerHTML = details;

    instructionObject.counter = i;
}

// document.getElementById("nxt-info-btn").addEventListener("click",function(){
//     nextInstruction(instructionObject);
// });