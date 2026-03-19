import { HeartCards, SpadeCards, ClubCards, DiamondCards,Allcard } from "./CardMaps.js";
import{ SelectRandomCard ,Select_i_RandomCards,visitedCards} from "./Random.js";

let stockCards=[];

function selectfoundationCards(){
     return [Select_i_RandomCards(Allcard,1),Select_i_RandomCards(Allcard,2),
         Select_i_RandomCards(Allcard,3),Select_i_RandomCards(Allcard,4),
         Select_i_RandomCards(Allcard,5),Select_i_RandomCards(Allcard,6),
         Select_i_RandomCards(Allcard,7)]
 }


function getAllCardKeys(){
    let allCardKeys =[] 
    for (let i=0;i<Allcard.length;i++){
        Allcard[i].keys().forEach(element => {
        allCardKeys.push(element);    

    });    
    }
    return allCardKeys;
}

function selectStockCards(){
    let allCardKeys=getAllCardKeys();

    for (let i=0;i<allCardKeys.length;i++){
        if (!(visitedCards.includes(allCardKeys[i]))){
             stockCards.push(allCardKeys[i]);
             visitedCards.push(allCardKeys[i]);
         }
     }
}

let selectedCards=selectfoundationCards();

let foundation1=selectedCards[0];
let foundation2=selectedCards[1];
let foundation3=selectedCards[2];
let foundation4=selectedCards[3];
let foundation5=selectedCards[4];
let foundation6=selectedCards[5];
let foundation7=selectedCards[6];

selectStockCards();
