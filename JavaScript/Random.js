/**
 * Random.js
 *
 * Provides randomized card selection utilities used to deal the tableau and stock.
 */
import { Allcard } from "./CardMaps.js";

/**
 * Shuffle an array in place using Fisher-Yates.
 * @param {any[]} a - Array to shuffle.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

/**
 * Choose a random set of cards from the collection of suit maps.
 * @param {Map[]} Allcard - Array of card suit maps.
 * @returns {Map} A randomly selected set map.
 */
function RandomSet(Allcard){
    shuffle(Allcard);
    return Allcard[0];
}

/**
 * Extract all card keys from a Map of card image resources.
 * @param {Map} set - Single suit map of card codes to image paths.
 * @returns {string[]} List of card codes.
 */
function ProcessSetCards(set){
    
    let selectedKeys =[] 
    set.keys().forEach(element => {
    selectedKeys.push(element);    

});
    return selectedKeys;

}
    
/**
 * Return a single random card code from a list of available cards.
 * @param {string[]} cardsInSet - Array of card codes.
 * @returns {string} Randomly selected card code.
 */
function SelectCardFromSet(cardsInSet){
    shuffle(cardsInSet);
    // let selectedCard= (selectedKeys[0]);
    return cardsInSet[0];

}

function SelectRandomCard(Allcards){
    let selectedSet=RandomSet(Allcards);
    let cards=ProcessSetCards(selectedSet);
    return SelectCardFromSet(cards);
}

let visitedCards=[]
function Select_i_RandomCards(Allcards,i){
    let iRandomCards=[]
    for (let j =0;j<i;j++){
        let selectedCard=SelectRandomCard(Allcard);
    if (!(visitedCards.includes(selectedCard))){
        iRandomCards.push(selectedCard);  
        visitedCards.push(selectedCard);
    }
    else{
        j--;
    }
    
    }
    return iRandomCards;

}


export { SelectRandomCard, Select_i_RandomCards,visitedCards};
