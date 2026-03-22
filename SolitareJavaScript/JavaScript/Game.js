//import necessary maps and arrays
import { HeartCards, SpadeCards, ClubCards, DiamondCards,Allcard ,tableauCards} from "./CardMaps.js";
import{ SelectRandomCard,visitedCards} from "./Random.js";
import {tableau1,tableau2,tableau3,tableau4,tableau5,tableau6,tableau7, stockCards } from "./fillPiles.js";
import { addtableau1Cards,addtableau2Cards,addtableau3Cards,addtableau4Cards,addtableau5Cards,addtableau6Cards,addtableau7Cards,
    addtableaucards,getCardImg,getCardImgArr} from "./addTableu.js";

var stockCards2=[]
// foundation arrays 
var foundationpiles=[document.getElementById("foundation-1"),document.getElementById("foundation-2")
    ,document.getElementById("foundation-3"),document.getElementById("foundation-4")]
var foundationState=[[null],[null],[null],[null]];

var tableauPiles=[document.getElementById("tableau-1"),document.getElementById("tableau-2"),document.getElementById("tableau-3"),
    document.getElementById("tableau-4",document.getElementById("tableau-5"),document.getElementById("tableau-6"),document.getElementById("tableau-7"))
];
// stores the displayed card in each tableau pile
var tableauDisplayedCards=[tableau1[0],tableau2[0],tableau3[0],
                        tableau4[0],tableau5[0],tableau6[0],tableau7[0]];

var cardOrder=["A","1","2","3","4","5","6","7","8","9","J","Q","K"];

document.addEventListener("DOMContentLoaded", function() {
    addtableaucards();    
    document.getElementById("debug-label").innerHTML = tableauDisplayedCards;

});

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

// method to add cards from stock
document.getElementById("card-stock2").addEventListener("click",function(){
    let currstockcard=stockCards2[stockCards2.length-1];
// if current card in stock2 pile is an ace
    if (currstockcard[1]==="A"){
        // retreives image of ace card in stock pile
        let cardimg =getCardImg(currstockcard);
        // finds foundation pile that is empty
        
        for (let i = 0; i < foundationpiles.length; i++) {
            if (foundationState[i][0] === null) {
                foundationState[i][0] = currstockcard;
                foundationpiles[i].src = cardimg;
                stockCards2.pop();
                let cardImg = getCardImg(stockCards[stockCards2.indexOf(currstockcard)]);
                document.getElementById("card-stock2_img").src=cardImg;
                break;
            }
}
 
     }
});

function addCardToTableu(card1,card2,fromIndex,toIndex){
    let card1Set=card1[0];
    let card2Set=card2[0];

    let card1Num=card1[1];
    let card2Num=card2[1];
    
    let isRed1 = (card1Set === "H" || card1Set === "D");
    let isRed2 = (card2Set === "H" || card2Set === "D");

    if (isRed1 !== isRed2) {
        // check descending order
        if (cardOrder.indexOf(card2Num) - cardOrder.indexOf(card1Num) === 1) {
            let movedCardDiv = tableauCards[fromIndex].pop();
            tableauCards[toIndex].push(movedCardDiv);
            
            let targetPile = document.getElementById(`tableau-${toIndex + 1}`);
            let newImg = document.createElement("img");
            newImg.src = getCardImg(card1);
            let wrapper = document.createElement("div");
            wrapper.classList.add("card-another");
            wrapper.appendChild(newImg);
            targetPile.appendChild(wrapper);

            let sourcePile = document.getElementById(`tableau-${fromIndex + 1}`);
            sourcePile.removeChild(sourcePile.lastElementChild);

            document.getElementById("debug-label").innerHTML = "Moved!";
        }
}
}

// loops through every tableau pile
for (let i = 0; i < tableauCards.length; i++) {
    tableauCards[i][tableauCards[i].length - 1].addEventListener("click", function () {

        let selectedCard = tableauDisplayedCards[i];

        for (let j = 0; j < tableauCards.length; j++) {
            if (i !== j) {
                let targetCard = tableauDisplayedCards[j];
                addCardToTableu(selectedCard, targetCard, i, j);
            }
        }
    });
}