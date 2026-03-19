//import necessary maps and arrays
import { HeartCards, SpadeCards, ClubCards, DiamondCards,Allcard } from "./CardMaps.js";
import{ SelectRandomCard,visitedCards} from "./Random.js";
import {foundation1,foundation2,foundation3,foundation4,foundation5,foundation6,foundation7, stockCards } from "./fillPiles.js";

function getCardImg(cardArr){
    let cardlImages=[]
    for (let i =0;i<cardArr.length;i++){
        switch(cardArr[i][0]){
            // if of Heart set 
            case "H":
                cardlImages.push(HeartCards.get(cardArr[i]));
                break;
            case "D":
                cardlImages.push(DiamondCards.get(cardArr[i]));
                break;
            case "S":
                cardlImages.push(SpadeCards.get(cardArr[i]));
                break;
            case "C":
                cardlImages.push(ClubCards.get(cardArr[i]));
                break;
            }
    }
    return cardlImages;
}

function addfoundationcards(){
    addfoundation1Cards();
    addfoundation2Cards();
    addfoundation3Cards();
    addfoundation4Cards();
    addfoundation5Cards();
    addfoundation6Cards();
    addfoundation7Cards();
}

function addfoundation1Cards(){
    let cardfound1=document.getElementById("card-foundation-1-1");
    let cardimages=getCardImg(foundation1);
    cardfound1.src=cardimages[0];
}

function addfoundation2Cards(){
    let cardfound21 = document.getElementById("card-foundation-2-1");
    let cardfound22 = document.getElementById("card-foundation-2-2");

    
    let cardImages = getCardImg(foundation2);
    
    
    cardfound21.src = "../images/pixelart/emptyCard.png";
    cardfound22.src=cardImages[0];
}

function addfoundation3Cards(){
    let cardfound31 = document.getElementById("card-foundation-3-1");
    let cardfound32 = document.getElementById("card-foundation-3-2");
    let cardfound33 = document.getElementById("card-foundation-3-3");

    
    let cardImages = getCardImg(foundation3);
    
    
    cardfound31.src = "../images/pixelart/emptyCard.png";
    cardfound32.src="../images/pixelart/emptyCard.png";
    cardfound33.src=cardImages[0];
}
function addfoundation4Cards(){
    let cardfound41 = document.getElementById("card-foundation-4-1");
    let cardfound42 = document.getElementById("card-foundation-4-2");
    let cardfound43 = document.getElementById("card-foundation-4-3");
    let cardfound44 = document.getElementById("card-foundation-4-4");

    
    let cardImages = getCardImg(foundation4);
    
    
    cardfound41.src = "../images/pixelart/emptyCard.png";
    cardfound42.src="../images/pixelart/emptyCard.png";
    cardfound43.src="../images/pixelart/emptyCard.png";
    cardfound44.src=cardImages[0];

}
function addfoundation5Cards(){
    let cardfound51 = document.getElementById("card-foundation-5-1");
    let cardfound52 = document.getElementById("card-foundation-5-2");
    let cardfound53 = document.getElementById("card-foundation-5-3");
    let cardfound54 = document.getElementById("card-foundation-5-4");
    let cardfound55 = document.getElementById("card-foundation-5-5");

    
    let cardImages = getCardImg(foundation5);
    
    
    cardfound51.src = "../images/pixelart/emptyCard.png";
    cardfound52.src="../images/pixelart/emptyCard.png";
    cardfound53.src="../images/pixelart/emptyCard.png";
    cardfound54.src="../images/pixelart/emptyCard.png";
    cardfound55.src=cardImages[0];
}
function addfoundation6Cards(){
    let cardfound61 = document.getElementById("card-foundation-6-1");
    let cardfound62 = document.getElementById("card-foundation-6-2");
    let cardfound63 = document.getElementById("card-foundation-6-3");
    let cardfound64 = document.getElementById("card-foundation-6-4");
    let cardfound65 = document.getElementById("card-foundation-6-5");
    let cardfound66 = document.getElementById("card-foundation-6-6");

    
    let cardImages = getCardImg(foundation6);
    
    
    cardfound61.src = "../images/pixelart/emptyCard.png";
    cardfound62.src="../images/pixelart/emptyCard.png";
    cardfound63.src="../images/pixelart/emptyCard.png";
    cardfound64.src="../images/pixelart/emptyCard.png";
    cardfound65.src="../images/pixelart/emptyCard.png";
    cardfound66.src=cardImages[0];

}
function addfoundation7Cards(){
    let cardfound71 = document.getElementById("card-foundation-7-1");
    let cardfound72 = document.getElementById("card-foundation-7-2");
    let cardfound73 = document.getElementById("card-foundation-7-3");
    let cardfound74 = document.getElementById("card-foundation-7-4");
    let cardfound75 = document.getElementById("card-foundation-7-5");
    let cardfound76 = document.getElementById("card-foundation-7-6");
    let cardfound77 = document.getElementById("card-foundation-7-7");

    
    let cardImages = getCardImg(foundation7);
    
    
    cardfound71.src = "../images/pixelart/emptyCard.png";
    cardfound72.src="../images/pixelart/emptyCard.png";
    cardfound73.src="../images/pixelart/emptyCard.png";
    cardfound74.src="../images/pixelart/emptyCard.png";
    cardfound75.src="../images/pixelart/emptyCard.png";
    cardfound76.src="../images/pixelart/emptyCard.png";
    cardfound77.src=cardImages[0];

}


document.addEventListener("DOMContentLoaded", function() {
   addfoundationcards();

});