import { Allcard } from "./CardMaps.js";


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

function RandomSet(Allcard){
    shuffle(Allcard);
    return Allcard[0];
}
function ProcessSetCards(set){
    
    let selectedKeys =[] 
    set.keys().forEach(element => {
    selectedKeys.push(element);    

});
    return selectedKeys;

}
    
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
