/**
 * Game.js
 *
 * Contains the main Solitaire gameplay logic, including tableau moves,
 * stock/waste behavior, and foundation pile updates.
 */
// import necessary maps and arrays
import { HeartCards, SpadeCards, ClubCards, DiamondCards,Allcard ,tableauCards} from "./CardMaps.js";
import{ SelectRandomCard,visitedCards} from "./Random.js";
import {tableau1,tableau2,tableau3,tableau4,tableau5,tableau6,tableau7, stockCards,alltableu } from "./fillPiles.js";
import { addtableau1Cards,addtableau2Cards,addtableau3Cards,addtableau4Cards,addtableau5Cards,addtableau6Cards,addtableau7Cards,
    addtableaucards,getCardImg,getCardImgArr} from "./addTableu.js";

/**
 * Cards that have moved from stock into the waste area.
 * @type {string[]}
 */
var stockCards2=[]
// foundation arrays 
var foundationpiles=[document.getElementById("foundation-1"),document.getElementById("foundation-2")
    ,document.getElementById("foundation-3"),document.getElementById("foundation-4")]
var foundationState=[[null],[null],[null],[null]];

var tableauPiles=[document.getElementById("tableau-1"),document.getElementById("tableau-2"),document.getElementById("tableau-3"),
    document.getElementById("tableau-4"),document.getElementById("tableau-5"),document.getElementById("tableau-6"),document.getElementById("tableau-7")
];



// stores the displayed card in each tableau pile
var tableauDisplayedCards;

var tableauPileCards=[[tableau1[0]],[tableau2[0]],[tableau3[0]],[tableau4[0]],[tableau5[0]],[tableau6[0]],[tableau7[0]]]


var cardOrder=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

document.addEventListener("DOMContentLoaded", function() {
    addtableaucards();    
    initTabelauDisplayCards();

});
function initTabelauDisplayCards(){
    tableauDisplayedCards=[tableau1[0],tableau2[0],tableau3[0],
                        tableau4[0],tableau5[0],tableau6[0],tableau7[0]];
    
                    }

// logic for the drawing cards from the stock pile

/**
 * Move an Ace from the waste pile into the first available foundation pile.
 * @param {string} card - A card code such as "HA".
 */
function addAceToFoundationPile(card){
    let cardimg =getCardImg(card);
        // finds foundation pile that is empty
        
        for (let i = 0; i < foundationpiles.length; i++) {
            if(addToFoundation(i,card)){
                stockCards2.pop();
                break;
           }
        
            
}


}
function addAceFromTableuToFoundatoin(card,fromIndex){
    let movedCardDiv = tableauCards[fromIndex].pop();

    alltableu[fromIndex].shift();
    let cardimg =getCardImg(card);


    for (let i = 0; i < foundationpiles.length; i++) {
            
            if (addToFoundation(i,card)===true){
            
                removeAndDisplayNext(fromIndex);
                break;
            }
        
        }

}
function removeAndDisplayNext(fromIndex){
    tableauPileCards[fromIndex].pop();                  
    removeSourcePile(fromIndex);
    displayNextCardInTableu(fromIndex);
}

function addToFoundation (foundationIndex,card){
    if (foundationState[foundationIndex][0]===null){
        foundationState[foundationIndex][0]=card;

        let cardimg =getCardImg(card);
        foundationpiles[foundationIndex].src=cardimg;
  
        return true;
    }
    else{
        return false;
    }
}

// remove the last card element from the source tableau pile after moving it
function removeSourcePile(fromIndex){
    let sourcePile = document.getElementById(`tableau-${fromIndex + 1}`);
    sourcePile.removeChild(sourcePile.lastElementChild);

}

/**
 * Wraps a moved card image in a container and appends it to the target tableau pile.
 * @param {HTMLElement} targetPile - The destination tableau pile element.
 * @param {HTMLImageElement} newImg - The image element for the moved card.
 */
// needs to be modified to add every card in the pile 
function addCardToTarget(targetPile,newImg){
    let wrapper = document.createElement("div");
    wrapper.classList.add("card-another");
    wrapper.appendChild(newImg);
    targetPile.appendChild(wrapper);
    // newImg needs an id of tableupile-cardindexinpile and to be added to tableuCards
}

function displayNextCardInTableu(fromIndex){
    // sets the tableau pile to empty if the moved card was the last card in the tableau pile
    if (alltableu[fromIndex].length===0){
        tableauDisplayedCards[fromIndex]="";
        tableauPileCards[fromIndex]=[];
        return;
    }

    let fromTableuNext=alltableu[fromIndex].shift();
    
    RevealNextTableauCard(fromIndex,fromTableuNext);
    
}
function RevealNextTableauCard(fromIndex,fromTableuNext){
    let fromTableuNextImg=getCardImg(fromTableuNext);
    
    let revealedCard= tableauCards[fromIndex][tableauCards[fromIndex].length-1]
    
    revealedCard.src=fromTableuNextImg;

    tableauDisplayedCards[fromIndex]=fromTableuNext;

    tableauPileCards[fromIndex].push(fromTableuNext);

    revealedCard.addEventListener("click",initializeTableauListeners());

}
/*This method takes inputs card1, card2 , fromIndex and toIndex
    card1 is the card that the user selected for example "H2"
    card2 is the display card on the current iteration of the display cards in the tableu piles for example "S2"
    fromIndex is the index of the selected cards tableu pile 
    toIndex is the index of the tableu pile of the display card we are currently on in the iteration
    
    This function checks if the selected card can be added to the pile of the display card in the current iteration of all tableu piles
    If it can, the card will be added to that tableu pile and the next card in the pile from where the card moved will be the display card of the 
    tableu pile that the moved card was apart of   
*/

function addCardToTableuFromStock(card1,card2,toIndex){
    
    


    if (canMoveToTableu(card1,card2)){
        // // check descending order
        let cardimg =getCardImg(card1);

        addCardImgToTableu(card1,toIndex);


        return true;
        
    }


}

function canMoveToTableu(card1,card2){
    let card1Set=card1[0];
    let card2Set=card2[0];

    let card1Num=card1.slice(1);
    let card2Num=card2.slice(1);

    if (card1Num=="A"){return false;}

    let isRed1 = (card1Set === "H" || card1Set === "D");
    let isRed2 = (card2Set === "H" || card2Set === "D");

    return isRed1!==isRed2 && cardOrder.indexOf(card2Num)-cardOrder.indexOf(card1Num)==1;

}

function addCardToTableu(card1,card2,fromIndex,toIndex){

    if (canMoveToTableu(card1,card2)){
    
            
            let movedCardDiv = tableauCards[fromIndex].pop();
            tableauPileCards[fromIndex].pop();


            alltableu[fromIndex].shift();
            // tableauCards[fromIndex].pop();
            // tableauCards[toIndex].push(movedCardDiv);

            addCardImgToTableu(card1,toIndex);

            removeSourcePile(fromIndex);

            displayNextCardInTableu(fromIndex);

            // addCardImgToTableu(card1,toIndex);
            
            return true;
        }
    else{
        return false;
    }
    }



function addCardImgToTableu(card,toIndex){
    let targetPile = document.getElementById(`tableau-${toIndex + 1}`);
    let newImg = document.createElement("img");
    newImg.src = getCardImg(card);
    newImg.id=`card-tableau-${toIndex+1}-${tableauCards[toIndex].length+1}`
    tableauCards[toIndex].push(newImg);
    // newImg needs an id of tableupile-cardindexinpile and to be added to tableuCards

    addCardToTarget(targetPile,newImg);
    tableauDisplayedCards[toIndex] = card;

    tableauPileCards[toIndex].push(card);
    return;
}

function addStockToFoundation(card){
    let card1Set=card[0];
    let card1Num = card.slice(1);
    for (let i=0;i<foundationState.length;i++){

        let currFoundationCard = foundationState[i][foundationState[i].length - 1];
        
        if (currFoundationCard===null){
            continue;
        }
        
        let currFoundationSet = currFoundationCard[0];
        let currFoundationNum = currFoundationCard.slice(1);

        if ((card1Set===currFoundationSet) && (cardOrder.indexOf(card1Num) - cardOrder.indexOf(currFoundationNum) === 1)){
            // logic to add tableau card to foundation pile
            let cardimg =getCardImg(card);
            let newImg = document.createElement("img");
            newImg.src = cardimg;
            
            foundationState[i].push(card);
            foundationpiles[i].src=cardimg;
// then only pop from foundationpiles[i] if a card is moved from there to tableau

            document.getElementById("debug-label").innerHTML=foundationState;
            
            return true;
        }
    }
    }



function addCardToFoundation(card,fromIndex){
    let card1Set=card[0];
    let card1Num = card.slice(1);
    for (let i=0;i<foundationState.length;i++){
        let currFoundationCard=foundationState[i][0]
        if (currFoundationCard===null){continue;}
        let currFoundationSet = currFoundationCard[0];
        let currFoundationNum = currFoundationCard.slice(1);
        if ((card1Set===currFoundationSet) && (cardOrder.indexOf(card1Num) - cardOrder.indexOf(currFoundationNum) === 1)){
            // logic to add tableau card to foundation pile
            let movedCardDiv=tableauCards[fromIndex].pop();
            alltableu[fromIndex].shift();
            let cardImg=getCardImg(card);
            foundationState[i][0]=card;
            foundationpiles[i].src=cardImg;
            removeSourcePile(fromIndex);
            displayNextCardInTableu(fromIndex);
        }
    }

}

function moveFoundationToTableau(fromFoundationIndex,toTableauIndex){

    let foundationPile = foundationState[fromFoundationIndex];

    if (foundationPile.length === 0){
        return false;
    }

    let foundationCard = foundationPile[foundationPile.length - 1];

    let tableauCard = tableauDisplayedCards[toTableauIndex];

    if (!canMoveToTableu(foundationCard, tableauCard)){
        return false;
    }

    foundationPile.pop();

    addCardImgToTableu(foundationCard,toTableauIndex);

    if (foundationPile.length === 0){

        foundationpiles[fromFoundationIndex].src = "";

    } 
    else {

        let nextTopCard =
            foundationPile[foundationPile.length - 1];

        foundationpiles[fromFoundationIndex].src =
            getCardImg(nextTopCard);
    }

    return true;
}




// loops through every tableau pile
function initializeTableauListeners(){
    for (let i = 0; i < tableauCards.length; i++) {
        // add event listener for if a display card in a tableu pile is pressed
        tableauCards[i][tableauCards[i].length - 1]
        .addEventListener("click", function () {

            
            let selectedCard = tableauDisplayedCards[i];
            console.log(tableauDisplayedCards);
            for (let i=0; i<tableauPileCards.length;i++){
                console.log(tableauPileCards[i]);
                console.log(tableauCards[i]);
            }
            if (selectedCard[1] == "A") {
                addAceFromTableuToFoundatoin(selectedCard, i);
            }


            for (let j = 0; j < tableauCards.length; j++) {

                // checks that selected and target are not same pile
                if (i !== j) {

                    let targetCard = tableauDisplayedCards[j];

                    let canAddToTableau = addCardToTableu(selectedCard,targetCard,i,j);

                    if (canAddToTableau != true) {
                        addCardToFoundation(selectedCard, i);
                    }
                    else{
                        return;
                    }
                }
            }
        });
    }
}

function initializeFoundationListeners(){
    // do something
    for (let i=0;i<foundationpiles.length;i++){
        foundationpiles[i].addEventListener("click",function(){
            for (let j=0;j<tableauDisplayedCards.length;j++){
                let tableauCard=tableauDisplayedCards[j];
                if (moveFoundationToTableau(i,j)===true){
                    return;
                }
            }
        });
    }
}




document.getElementById("card-stock1").addEventListener("click", function () {

    if (stockCards.length === 0) {
        stockCards.push(...stockCards2.reverse());
        stockCards2.length = 0;
    }

    let cardImg = getCardImg(stockCards[0]);

    document.getElementById("card-stock2_img").src = cardImg;

    stockCards2.push(stockCards[0]);
    stockCards.shift();

});

document.getElementById("card-stock2").addEventListener("click",function(){
    let currstockcard=stockCards2[stockCards2.length-1];
    


    // if current card in stock2 pile is an ace
    if (currstockcard[1]==="A"){
        // retreives image of ace card in stock pile
        addAceToFoundationPile(currstockcard,false);
        document.getElementById("card-stock2_img").src=getCardImg(stockCards[0]);
 
     }
     else{
        // loop through every card in tableu pile, see if card can be added , add card
        for (let i=0; i<tableauDisplayedCards.length;i++){
            // current display card from tableau 
            let targetCard=tableauDisplayedCards[i];
            if(addCardToTableuFromStock(currstockcard,targetCard,i)===true){
                // remove selected stock card from stock card 2 data structure
                
                stockCards2.pop(); 
                document.getElementById("card-stock2_img").src=getCardImg(stockCards[0]);
                return;
            }
            else{
                if(addStockToFoundation(currstockcard)===true){
                    stockCards2.pop();
                    document.getElementById("card-stock2_img").src=getCardImg(stockCards[0]);
                    return;
                };
                
            }
        }
    }
});

initializeTableauListeners();
initializeFoundationListeners();