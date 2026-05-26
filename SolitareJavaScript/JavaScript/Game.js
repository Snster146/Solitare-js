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
    document.getElementById("debug-label").innerHTML = tableauPileCards;
    initTabelauDisplayCards();

});
function initTabelauDisplayCards(){
    tableauDisplayedCards=[tableau1[0],tableau2[0],tableau3[0],
                        tableau4[0],tableau5[0],tableau6[0],tableau7[0]];
    
                    }

// logic for the drawing cards from the stock pile
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

/**
 * Move an Ace from the waste pile into the first available foundation pile.
 * @param {string} card - A card code such as "HA".
 */
function addAceToFoundationPile(card){
    let cardimg =getCardImg(card);
        // finds foundation pile that is empty
        
        for (let i = 0; i < foundationpiles.length; i++) {
            if (foundationState[i][0] === null) {
                foundationState[i][0] = card;
                foundationpiles[i].src = cardimg;
                stockCards2.pop();
                document.getElementById("debug-label").innerHTML=tableauPileCards;
                // let cardImg = getCardImg(stockCards[stockCards2.indexOf(card)]);
                // document.getElementById("card-stock2_img").src=cardImg;
                break;
            }
}

}
function addAceFromTableuToFoundatoin(card,fromIndex){
    let movedCardDiv = tableauCards[fromIndex].pop();

    alltableu[fromIndex].shift();
    let cardimg =getCardImg(card);


    // document.getElementById("debug-label").innerHTML=alltableu[fromIndex];
    for (let i = 0; i < foundationpiles.length; i++) {
            if (foundationState[i][0] === null) {
                foundationState[i][0] = card;
                foundationpiles[i].src = cardimg;

                tableauPileCards[fromIndex].pop();                  
                removeSourcePile(fromIndex);
                displayNextCardInTableu(fromIndex);
                document.getElementById("debug-label").innerHTML=tableauPileCards;              
                break;
            }
    }

}


// method to add cards from stock
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

            }
            else{
                if(addStockToFoundation(currstockcard)===true){
                    stockCards2.pop();
                    document.getElementById("card-stock2_img").src=getCardImg(stockCards[0]);

                };
                
            }
        }
    }
});


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
}

function displayNextCardInTableu(fromIndex){
    let fromTableuNext=alltableu[fromIndex][0];
    let fromTableuNextImg=getCardImg(fromTableuNext);
    
    let revealedCard= tableauCards[fromIndex][tableauCards[fromIndex].length-1]
    
    revealedCard.src=fromTableuNextImg;
    
    tableauDisplayedCards[fromIndex]=fromTableuNext;

    tableauPileCards[fromIndex].push(fromTableuNext);

    revealedCard.addEventListener("click",initializeTableauCardListeners());

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
    let card1Set=card1[0];
    let card2Set=card2[0];

    let card1Num=card1.slice(1);
    let card2Num=card2.slice(1);

    let isRed1 = (card1Set === "H" || card1Set === "D");
    let isRed2 = (card2Set === "H" || card2Set === "D");
    
   if (card1Num==="K"){

        for (let i=0;i<tableauPileCards.length;i++){

            if (tableauPileCards[i].length==0){
                
                let cardimg =getCardImg(card1);

                let targetPile = document.getElementById(`tableau-${toIndex + 1}`);
                let newImg = document.createElement("img");
                newImg.src = cardimg;
            
            // document.getElementById("debug-label")=tableauDisplayedCards;
                addCardToTarget(targetPile,newImg);
                tableauDisplayedCards[toIndex] = card1;
                tableauPileCards[toIndex].push(card1);
                document.getElementById("debug-label").innerHTML=tableauPileCards;
            // tableauDisplayedCards[1]=card2;
            // targetpile, toIndex, card2
                return true;
            }
        }
    }

    if (isRed1 !== isRed2) {

        // // check descending order
        if (cardOrder.indexOf(card2Num) - cardOrder.indexOf(card1Num) === 1) {
            let cardimg =getCardImg(card1);

            let targetPile = document.getElementById(`tableau-${toIndex + 1}`);
            let newImg = document.createElement("img");
            newImg.src = cardimg;
            
            // document.getElementById("debug-label")=tableauDisplayedCards;
            addCardToTarget(targetPile,newImg);
            tableauDisplayedCards[toIndex] = card1;
            tableauPileCards[toIndex].push(card1);
            document.getElementById("debug-label").innerHTML=tableauPileCards;
            // tableauDisplayedCards[1]=card2;
            // targetpile, toIndex, card2
            return true;
        }
        
}



}

function addCardToTableu(card1,card2,fromIndex,toIndex){
    


    let card1Set=card1[0];
    let card2Set=card2[0];

    let card1Num=card1.slice(1);
    let card2Num=card2.slice(1);
    
    if (card1Num=="A"){return false;}

    let isRed1 = (card1Set === "H" || card1Set === "D");
    let isRed2 = (card2Set === "H" || card2Set === "D");

    if (card1Num==="K"){

        for (let i=0;i<tableauPileCards.length;i++){

            if (tableauPileCards[i].length==0){
                
                let movedCardDiv=tableauCards[fromIndex].pop();
                
                // alltableu[fromIndex].shift();
                tableauPileCards[fromIndex].pop();

                
                tableauCards[toIndex].push(movedCardDiv);
                
                let targetPile = document.getElementById(`tableau-${toIndex + 1}`);
                let newImg = document.createElement("img");
                
                newImg.src = getCardImg(card1);
                addCardToTarget(targetPile,newImg);
                
                tableauDisplayedCards[toIndex] = card1;

                tableauPileCards[toIndex].push(card1);

                removeSourcePile(fromIndex);

                displayNextCardInTableu(fromIndex);
                Document.getElementById("debug-label").innerHTML=tableauPileCards;
            
                return true;
            }
        }
    }

    if (isRed1 !== isRed2) {
        // check descending order
        if (cardOrder.indexOf(card2Num) - cardOrder.indexOf(card1Num) === 1) {
            // accessing the html element associated with the moved card
            // initTabelauDisplayCards();
            let movedCardDiv = tableauCards[fromIndex].pop();

            alltableu[fromIndex].shift();
            // tableauCards[fromIndex].pop();
            tableauCards[toIndex].push(movedCardDiv);

            // accesses target pile and creates a new image with the moved card to store
            let targetPile = document.getElementById(`tableau-${toIndex + 1}`);
            let newImg = document.createElement("img");
            newImg.src = getCardImg(card1);

            addCardToTarget(targetPile,newImg);
            tableauDisplayedCards[toIndex] = card1;

            tableauPileCards[toIndex].push(card1);

            removeSourcePile(fromIndex);

            displayNextCardInTableu(fromIndex);
            
            document.getElementById("debug-label").innerHTML=tableauPileCards;
            return true;
        }
}
}

function addStockToFoundation(card){
    let card1Set=card[0];
    let card1Num = card.slice(1);
    for (let i=0;i<foundationState.length;i++){

        let currFoundationCard=foundationState[i][0]
        if (currFoundationCard===null){continue;}
        let currFoundationSet = currFoundationCard[0];
        let currFoundationNum = currFoundationCard.slice(1);

        if ((card1Set===currFoundationSet) && (cardOrder.indexOf(card1Num) - cardOrder.indexOf(currFoundationNum) === 1)){
            // logic to add tableau card to foundation pile
            document.getElementById("debug-label").innerHTML="can add"
            let cardimg =getCardImg(card);
            let newImg = document.createElement("img");
            newImg.src = cardimg;
            
            foundationState[i][0]=card;
            foundationpiles[i].src=cardimg;
            return true;
        }
    }
    }



function addCardToFoundation(card,fromIndex){
    // document.getElementById("debug-label").innerHTML=card;
    let card1Set=card[0];
    let card1Num = card.slice(1);
    for (let i=0;i<foundationState.length;i++){
        let currFoundationCard=foundationState[i][0]
        if (currFoundationCard===null){continue;}
        let currFoundationSet = currFoundationCard[0];
        let currFoundationNum = currFoundationCard.slice(1);
        // document.getElementById("debug-label").innerHTML=currFoundationSet;
        if ((card1Set===currFoundationSet) && (cardOrder.indexOf(card1Num) - cardOrder.indexOf(currFoundationNum) === 1)){
            // logic to add tableau card to foundation pile
            let movedCardDiv=tableauCards[fromIndex].pop();
            alltableu[fromIndex].shift();
            let cardImg=getCardImg(card);
            foundationState[i][0]=card;
            foundationpiles[i].src=cardImg;
            document.getElementById("debug-label").innerHTML=tableauPileCards;
            removeSourcePile(fromIndex);
            displayNextCardInTableu(fromIndex);
        }
    }

}

// loops through every tableau pile
function initializeTableauCardListeners(){
    for (let i = 0; i < tableauCards.length; i++) {

        // add event listener for if a display card in a tableu pile is pressed
        tableauCards[i][tableauCards[i].length - 1]
            .addEventListener("click", function () {

            let selectedCard = tableauDisplayedCards[i];

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
                }
            }
        });
    }
}
initializeTableauCardListeners();