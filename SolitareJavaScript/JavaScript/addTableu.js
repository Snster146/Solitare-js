import { HeartCards, SpadeCards, ClubCards, DiamondCards } from "./CardMaps.js";
import { tableau1, tableau2, tableau3, tableau4, tableau5, tableau6, tableau7 } from "./fillPiles.js";
function getCardImgArr(cardArr){
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

function getCardImg(cardName){
    switch(cardName[0]){
            // if of Heart set 
        case "H":
            return HeartCards.get(cardName);
            break;
        case "D":
            return DiamondCards.get(cardName);
            break;
        case "S":
            return SpadeCards.get(cardName);
            break;
        case "C":
            return ClubCards.get(cardName);
            break;
        }
}

function addtableaucards(){
    addtableau1Cards();
    addtableau2Cards();
    addtableau3Cards();
    addtableau4Cards();
    addtableau5Cards();
    addtableau6Cards();
    addtableau7Cards();
}

function addtableau1Cards(){
    let cardtableau1=document.getElementById("card-tableau-1-1");
    let cardimages=getCardImgArr(tableau1);
    cardtableau1.src=cardimages[0];
}

function addtableau2Cards(){
    let cardtableau21 = document.getElementById("card-tableau-2-1");
    let cardtableau22 = document.getElementById("card-tableau-2-2");

    
    let cardImages = getCardImgArr(tableau2);
    
    
    cardtableau21.src = "../images/pixelart/emptyCard.png";
    cardtableau22.src=cardImages[0];
}

function addtableau3Cards(){
    let cardtableau31 = document.getElementById("card-tableau-3-1");
    let cardtableau32 = document.getElementById("card-tableau-3-2");
    let cardtableau33 = document.getElementById("card-tableau-3-3");

    
    let cardImages = getCardImgArr(tableau3);
    
    
    cardtableau31.src = "../images/pixelart/emptyCard.png";
    cardtableau32.src="../images/pixelart/emptyCard.png";
    cardtableau33.src=cardImages[0];
}
function addtableau4Cards(){
    let cardtableau41 = document.getElementById("card-tableau-4-1");
    let cardtableau42 = document.getElementById("card-tableau-4-2");
    let cardtableau43 = document.getElementById("card-tableau-4-3");
    let cardtableau44 = document.getElementById("card-tableau-4-4");

    
    let cardImages = getCardImgArr(tableau4);
    
    
    cardtableau41.src = "../images/pixelart/emptyCard.png";
    cardtableau42.src="../images/pixelart/emptyCard.png";
    cardtableau43.src="../images/pixelart/emptyCard.png";
    cardtableau44.src=cardImages[0];

}
function addtableau5Cards(){
    let cardtableau51 = document.getElementById("card-tableau-5-1");
    let cardtableau52 = document.getElementById("card-tableau-5-2");
    let cardtableau53 = document.getElementById("card-tableau-5-3");
    let cardtableau54 = document.getElementById("card-tableau-5-4");
    let cardtableau55 = document.getElementById("card-tableau-5-5");

    
    let cardImages = getCardImgArr(tableau5);
    
    
    cardtableau51.src = "../images/pixelart/emptyCard.png";
    cardtableau52.src="../images/pixelart/emptyCard.png";
    cardtableau53.src="../images/pixelart/emptyCard.png";
    cardtableau54.src="../images/pixelart/emptyCard.png";
    cardtableau55.src=cardImages[0];
}
function addtableau6Cards(){
    let cardtableau61 = document.getElementById("card-tableau-6-1");
    let cardtableau62 = document.getElementById("card-tableau-6-2");
    let cardtableau63 = document.getElementById("card-tableau-6-3");
    let cardtableau64 = document.getElementById("card-tableau-6-4");
    let cardtableau65 = document.getElementById("card-tableau-6-5");
    let cardtableau66 = document.getElementById("card-tableau-6-6");

    
    let cardImages = getCardImgArr(tableau6);
    
    
    cardtableau61.src = "../images/pixelart/emptyCard.png";
    cardtableau62.src="../images/pixelart/emptyCard.png";
    cardtableau63.src="../images/pixelart/emptyCard.png";
    cardtableau64.src="../images/pixelart/emptyCard.png";
    cardtableau65.src="../images/pixelart/emptyCard.png";
    cardtableau66.src=cardImages[0];

}
function addtableau7Cards(){
    let cardtableau71 = document.getElementById("card-tableau-7-1");
    let cardtableau72 = document.getElementById("card-tableau-7-2");
    let cardtableau73 = document.getElementById("card-tableau-7-3");
    let cardtableau74 = document.getElementById("card-tableau-7-4");
    let cardtableau75 = document.getElementById("card-tableau-7-5");
    let cardtableau76 = document.getElementById("card-tableau-7-6");
    let cardtableau77 = document.getElementById("card-tableau-7-7");

    
    let cardImages = getCardImgArr(tableau7);
    
    
    cardtableau71.src = "../images/pixelart/emptyCard.png";
    cardtableau72.src="../images/pixelart/emptyCard.png";
    cardtableau73.src="../images/pixelart/emptyCard.png";
    cardtableau74.src="../images/pixelart/emptyCard.png";
    cardtableau75.src="../images/pixelart/emptyCard.png";
    cardtableau76.src="../images/pixelart/emptyCard.png";
    cardtableau77.src=cardImages[0];

}

export {addtableau1Cards,addtableau2Cards,addtableau3Cards,addtableau4Cards,addtableau5Cards,addtableau6Cards,addtableau7Cards,addtableaucards,getCardImg,getCardImgArr};
