//import necessary maps and arrays
import { HeartCards, SpadeCards, ClubCards, DiamondCards,Allcard } from "./CardMaps.js";
import{ SelectRandomCard,visitedCards} from "./Random.js";
import {tableau1,tableau2,tableau3,tableau4,tableau5,tableau6,tableau7, stockCards } from "./fillPiles.js";
import { addtableau1Cards,addtableau2Cards,addtableau3Cards,addtableau4Cards,addtableau5Cards,addtableau6Cards,addtableau7Cards,
    addtableaucards,getCardImg,getCardImgArr} from "./addTableu.js";

var stockCards2=[]
var foundationpiles=[document.getElementById("foundation-1"),document.getElementById("foundation-2")
    ,document.getElementById("foundation-3"),document.getElementById("foundation-4")]
var foundationState=[null,null,null,null];

document.addEventListener("DOMContentLoaded", function() {
    addtableaucards();    
});

document.getElementById("card-stock1").addEventListener("click",function(){
        // if (stockCards.length==0){
        //     alert("no more cards left in stock pile");
        //     return;   
        // }
        
        let stockcard2_card=getCardImgArr(stockCards);
        
        document.getElementById("card-stock2_img").src=stockcard2_card[0];
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
            if (foundationState[i] === null) {
                foundationState[i] = currstockcard;
                foundationpiles[i].src = cardimg;
                break;
            }
}
 
     }
});