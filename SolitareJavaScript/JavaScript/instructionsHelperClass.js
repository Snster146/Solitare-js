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
        value === this.instructionTitles.length ? this._counter=0 :this._counter=value;
       
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
